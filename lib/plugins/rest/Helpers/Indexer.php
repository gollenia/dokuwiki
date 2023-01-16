<?php

namespace Contexis\Database;

define('CATLIST_DISPLAY_LIST', 1);
define('CATLIST_DISPLAY_LINE', 2);

define('CATLIST_NSLINK_AUTO', 0);
define('CATLIST_NSLINK_NONE', 1);
define('CATLIST_NSLINK_FORCE', 2);

define('CATLIST_INDEX_START', 0);
define('CATLIST_INDEX_OUTSIDE', 1);
define('CATLIST_INDEX_INSIDE', 2);

define('CATLIST_SORT_NONE', 0);
define('CATLIST_SORT_ASCENDING', 1);
define('CATLIST_SORT_DESCENDING', 2);


class Index
{

	public $startpages = ["start"];

	private $exclusions = '';

	public $current_id = '';

	public $newpage = [
		'ns' => false
	];

	public $newpage_added = false;

	private array $data = [];
	private array $flatTree = [];
	private bool $flat = false;

	public function cleanID($ajax)
	{
		$id = $ajax->str('id', 'none');
		return json_encode(cleanID($id));
	}

	function getMetaValues($key, $namespaces = NULL, $recursive = NULL)
	{
		// map with trim here in order to remove newlines from tags
		return array_map('trim', idx_getIndex('subject', '_w'));
	}

	function _tagCompare($tag1, $tag2)
	{
		return $tag1 === $tag2;
	}

	public function get()
	{
		global $conf;
		global $INPUT;
		$id = $INPUT->str('id', ':');

		$data = array();
		$id = str_replace(':', "/", $id);

		search($data, $conf['datadir'], array($this, '_search'), array(), $id, 1, 'natural');

		foreach ($data as $key => $value) {
			$data[$key]['meta'] = p_get_metadata($value['id']);
		}

		return $data;
	}

	/**
	 * Build tree for navigation purposes
	 *
	 * @param string $namespace Where to start from
	 * @param string $excludes Comma separated list of namespaces to exclude
	 * @param boolean $excludePages Exclude Pages and only show Dirs
	 * @return array NEsted array with Site Tree
	 */
	public function tree($namespace = "", $excludes = "", $flat = false)
	{
		$this->flat = $flat;
		$this->excludes = $excludes;
		$this->set_new_page();
		$r = $this->_walk($namespace);
		
		return $this->data;
	}

	public function set_new_page() {
		if($this->current_id == '' || page_exists($this->current_id)) return;
		$current = explode(':', str_replace('/', ':', $this->current_id));
		$this->newpage = [
			'set' => true,
			'name' => array_pop($current),
			'ns' => page_findnearest(join(':', $current))
		];
	}

	public function getByDate()
	{
		global $conf;
		$indexdir = $conf['indexdir'];
	}


	public function search_children() {

	}

	public static function _pages(&$data, $base, $file, $type, $lvl, $opts)
	{
		$return = true;

		$id = pathID($file);

		if ($type == 'd' || pathinfo($file, PATHINFO_EXTENSION) != 'txt') {
			return false;
		}

		if (isHiddenPage($id || auth_quickaclcheck($id) < AUTH_READ)) {
			return false;
		}

		array_push($data, $id);

		return $return;
	}


	function _search(&$data, $base, $file, $type, $lvl, $opts)
	{
		global $conf;
		$return = true;

		$id = pathID($file);
		if ($type == 'd' && !(preg_match('#^' . $id . '(:|$)#', $opts['ns']) ||
			preg_match('#^' . $id . '(:|$)#', getNS($opts['ns']))
		)) {
			//add but don't recurse
			$return = false;
		} elseif ($type == 'f' && (!empty($opts['nofiles']) || substr($file, -4) != '.txt')) {
			//don't add
			return false;
		}
		if ($type == 'd' && $conf['sneaky_index'] && auth_quickaclcheck($id . ':') < AUTH_READ) {
			return false;
		}
		if ($type == 'd') {
			// link directories to their start pages
			$exists = false;
			$id = "$id:";
			resolve_pageid('', $id, $exists);
		} elseif (noNS($id) == $conf['start']) {
			// skip the main start page
			return false;
		}
		//check hidden
		if (isHiddenPage($id)) {
			return false;
		}
		//check ACL
		if ($type == 'f' && auth_quickaclcheck($id) < AUTH_READ) {
			return false;
		}
		$meta = p_get_metadata($id);

		if ($meta['title'] == null) {
			$title = $meta['extras']['title'];
		} else {
			$title = $meta['title'];
		}
		array_push($data, array(
			'id'    => $id,
			'type'  => $type,
			'level' => $lvl,
			'extras' => $meta['extras'],
			'title' => $title,
			'open'  => $return
		));

		return $return;
	}

	function _isExcluded($item)
	{

		global $conf;
		if ((strlen($conf['hidepages']) != 0) && preg_match('/' . $conf['hidepages'] . '/i', $item['id'])) return true;

		if ($this->exclusions) {
			$exclusion_array = explode(",", $this->exclusions);
			foreach ($exclusion_array as $exclusion) {
				if ($exclusion == $item['id']) {

					return true;
				}
			}
		}

		if (substr($item['id'], 0, 6) == 'system') return true;

		return false;
	}

	function _getStartPage($index_priority, $parid, $parpath, $name, $force, &$exists)
	{
		$exists = false;
		if ($parid != '') $parid .= ':';
		global $conf;
		$index_path_map = array(
			CATLIST_INDEX_START => $parpath . '/' . $name . '/' . $conf['start'] . '.txt',
			CATLIST_INDEX_OUTSIDE => $parpath . '/' . $name . '.txt',
			CATLIST_INDEX_INSIDE => $parpath . '/' . $name . '/' . $name . '.txt'
		);
		$index_id_map = array(
			CATLIST_INDEX_START => $parid . $name . ':' . $conf['start'],
			CATLIST_INDEX_OUTSIDE => $parid . $name,
			CATLIST_INDEX_INSIDE => $parid . $name . ':' . $name
		);
		if (is_array($index_priority)) foreach ($index_priority as $index_type) {
			if (is_file($index_path_map[$index_type])) {
				$exists = true;
				return $index_id_map[$index_type];
			}
		}
		if ($force && isset($index_priority[0]))
			return $index_id_map[0];
		else
			return false;
	}

	function _walk($ns = '')
	{
		global $conf;

		$path = $conf['savedir'] . '/pages/' . str_replace(':', '/', $ns);
		$path = utf8_encodeFN($path);
		if (!is_dir($path)) {

			return false;
		}
		// Main page
		$main = array(
			'id' => $ns . ':',
			'exist' => false,
			'title' => NULL
		);

		$main['title'] = p_get_first_heading($main['id'], true);
		if (is_null($main['title']))
			$main['title'] = end(explode(':', $ns));


		// Recursion
		$this->data = $this->_walk_recurse($path, $ns, 1, 0);
		return true;
	}

	function _walk_recurse($path, $ns, $depth, $maxdepth)
	{
		$result = [];
		$scanDirs = @scandir($path, 0);
		if ($scanDirs === false) {
			msg("catlist: can't open directory of namespace " . $ns, -1);
			return;
		}
		foreach ($scanDirs as $file) {

			if ($file[0] == '.' || $file[0] == '_') continue;
			$name = utf8_decodeFN(str_replace('.txt', '', $file));

			

			$id = ($ns == '') ? $name : $ns . ':' . $name;

			
			$item = array('id' => $id, 'title' => NULL);

			if ($this->_isExcluded($item)) continue;

			$item['title'] = p_get_metadata($id, 'title', p_get_first_heading($id, true)) ?? $name;


			if (is_dir($path . '/' . $file)) {

				if (page_exists($id . ':start')) {
					$item['title'] = p_get_first_heading($id . ":start", true);
				}

				if (is_null($item['title']))
					$item['title'] = ucfirst(end(explode(":", $id)));

				$item['children'] = array();

				$okdepth = ($depth < $maxdepth) || ($maxdepth == 0);
				if (!$this->_isExcluded($item) && $okdepth) {
					$children = $this->_walk_recurse($path . '/' . $file, $id, $depth + 1, $maxdepth);
				}

				if($this->newpage['ns'] && $id == $this->newpage['ns']) {
					array_unshift($children, [
						'title' => $this->newpage['name'],
						'id' => $this->newpage['ns'] . ':' . $this->newpage['name'],
						'is_new' => true
					]);
				}
				// Tree
				$item['children'] = $children;
				$result[] = $item;
				continue;
			}

			if ($file == "start.txt" || substr($file, -4) != ".txt") continue;

			if ($result && strcmp(end($result)['id'], $item['id']) !== 0) {
				$result[] = $item;
			}
		}
		return $result;
	}
}
