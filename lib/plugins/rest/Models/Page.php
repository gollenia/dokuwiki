<?php

namespace dokuwiki\plugins\rest\Models;

use Contexis\Core\Utilities\Strings;
use Contexis\Database\Index;
use Contexis\Database\Meta;
use DateTime;
use dokuwiki\plugin\bible\Article;
use dokuwiki\plugin\bible\Book;

class Page
{
	// Basic data
	public string $id = "";
	public string $title = "";
	public string $content = "";
	public string $abstract = "";
	public string $namespace;
	public string $label = "";

	// Dates and user (author) info
	public string $user;
	public DateTime $date;
	public DateTime $created;

	// Taxonomy
	public string $category = "";
	public string $audience = "";
	public $tags = [];
	public array $bibleref;
	
	// Attachments
	public string $icon = "";
	public array $files = [];
	public string $pagelink = "";
	public string $pageimage = "";
	public string $copyright = "";

	// Page Settings
	public bool $showSubpages = false;
	public bool $exclude = false;
	public bool $locked = false;

	// API Settings
	public array $filter = [];
	
	public function __construct($id = "", $filter = [])
	{
		global $INFO;
		if ($id === "") return;
		$this->id = cleanID($id);
		$this->namespace = $this->getNamespace();

		if (!$this->exists()) return;
		$this->title = $this->getTitle();
		$this->content = rawWiki($id);
		$this->date = DateTime::createFromFormat('U', Meta::get($id, 'date modified', 0));
		$this->created = DateTime::createFromFormat('U', Meta::get($id, 'date created', 0));
		$this->user = $INFO['editor'] ?? Meta::get($id, 'user', '');
		$meta = ['abstract', 'category', 'icon', 'pagelink', 'copyright', 'audience', 'label'];

		foreach ($meta as $value) {
			$this->$value = Meta::get($id, $value, '');
		}

		$this->tags = Meta::get($id, 'subject', []);
		$this->pageimage = $this->getPageImage();
		$this->exclude = Meta::get($id, 'excludeFromIndex', false);
		$this->locked = Meta::get($id, 'locked', false);

		if (class_exists("dokuwiki\\plugin\\bible\\Article")) {
			$this->bibleref = \dokuwiki\plugin\bible\Article::hasBiblerefs($id);
		}

		$this->files = File::findAll($id);

		$this->showSubpages = Meta::get($id, 'showSubpages', false);
		$this->filter = $filter;
	}

	/**
	 * Get the document title
	 *
	 * @return string
	 */
	private function getTitle()
	{
		$title = "";
		if (useHeading('navigation')) {
			$title = p_get_first_heading($this->id) ?? $title;
		}

		return Meta::get($this->id, 'title', $title);
	}

	/**
	 * Get the namespace of a document
	 *
	 * @return string
	 */
	private function getNamespace()
	{
		$nsArray = explode(":", $this->id);
		if (end($nsArray) !== "start") array_pop($nsArray);
		return implode(":", $nsArray);
	}

	private function getPageImage()
	{
		$imageid = Meta::get($this->id, 'pageimage', '');
		if (!$imageid) return '';
		$file = File::find($imageid);
		if (!$file->exists) return 'error';
		return $imageid;
	}

	/**
	 * Find a single page by it's id and retrieve all additional data
	 *
	 * @param string $id
	 * @return \Contexis\Models\Page $instance or bool false
	 */
	public static function find($id)
	{
		if (!$id) {
			return new self();
		}
		if (!page_exists($id) || auth_quickaclcheck($id) < AUTH_READ) {
			//var_dump("not found");
			return new self($id);
		}

		return new self($id);
	}

	/**
	 * Convert Page to an array, with filtering options
	 *
	 * @param array<string> $filter Which filter
	 * @return array
	 */
	public function to_array(array $filter = []): array
	{
		$ret = (array) $this;
		if (!empty($filter)) {
			return array_intersect_key($ret, array_flip($filter));
		}
		return $ret;
	}

	/**
	 * Check if the current page exists
	 *
	 * @return bool
	 */
	public function exists(): bool
	{
		return page_exists($this->id);
	}

	/**
	 * get raw wiki text
	 *
	 * @deprecated 2.0
	 * @param string $id
	 * @return string raw wiki text
	 */
	public function get_raw(string $id): string
	{
		if (p_get_metadata($id, 'raw')) {
			return (p_get_metadata($id, 'raw'));
		}
		return ($id);
	}

	/**
	 * Used to create a new page OR get a page, if it already exists
	 *
	 * @param string $id
	 * @param array $data
	 * @return \Contexis\Models\Page $instance 
	 * 
	 */
	public static function findOrNew(string $id, array $data = []): Page
	{
		if (!($instance = self::find($id))) {
			$instance = new self($id);
			$instance->id = $id;
			foreach ($data as $key => $value) {
				if(!property_exists($instance, $key) || $key == "id") continue;
				$instance->$key = $value;
			}
		}
		return $instance;
	}

	/**
	 * General search function, whicht retrieves a list of pages by it's id or metadata
	 *
	 * @param string $key
	 * @param mixed $value String or Integer containing the value
	 * @param bool $as_array Return pages as arrays, not objects
	 * @return array of Pages
	 */
	public static function where(string $key, string $value, array $filter = [], bool $as_array = false)
	{

		$pages = [];
		$data = [];

		switch ($key) {
			case "id":
				$data = is_array($value) ? $value : [$value];
				break;
			case "namespace";
				global $conf;
				$id = str_replace(':', "/", $value);
				search($data, $conf['datadir'], array('\\Contexis\\Database\\Index', '_pages'), array(), $id, 1, 'natural');
				break;
			case "tag":
				$data = \Contexis\Database\Tag::getPagesByTag($value);
				break;
			case "bible":
				list($book_id, $chapter) = explode(':', $value);
				$book = Book::find($book_id);
				$data = Article::where($book, $chapter);
				$data = array_values(array_map(function ($item) {
					return $item['doku_id'];
				}, $data));
				break;
			default:
				$data = idx_get_indexer()->lookupKey($key, $value);
		}

		foreach ($data as $value) {
			$page = Page::find($value);

			if ($as_array) {
				$page = $page->to_array($filter);
			}
			array_push($pages, $page);
		}
		return $pages;
	}

	public static function newest($count)
	{
		global $conf;
		$index_links_file = $conf['indexdir'] . '/page.idx';

		$index_links = file($index_links_file);

		$pages = array_reverse($index_links);
		$result = [];
		$i = 0;
		foreach ($pages as $line => $id) {
			if (preg_match('/(system|start|wiki|test|tag|category|audience|bibel|bible)/', $id)) continue;
			
			
			if ($i > $count) break;
			if(Meta::get($id, 'excludeFromIndex', false)) continue;
			$page = new Page($id);
			if(!$page->exists()) continue;
			$result[] = $page;
			$i++;
			
		}
		return $result;
	}

	public static function popular($count = 10)
	{
		$today = getdate();
		$ns =  "quickstats:" . $today['mon'] . '_'  . $today['year'] . ':';
		date("d_Y", strtotime("-1 month"));
		$ns_last_month = "quickstats:" . date("n_Y", strtotime("-1 month")) . ':';
		$pagesfile = metaFN($ns . 'pages', '.ser');
		$pagesfile_last = metaFN($ns_last_month . 'pages', '.ser');
		$pages = unserialize(io_readFile($pagesfile, false));
		$pages_last = unserialize(io_readFile($pagesfile_last, false));
		if (!$pages) return [];
		$pages = array_merge($pages['page'], $pages_last['page']);
		arsort($pages);
		$i = 0;
		$result = [];
		foreach ($pages as $id => $value) {
			if (preg_match('/(system|start|wiki|test|tag|category|audience|bibel|bible)/', $id)) continue;
			if(Meta::get($id, 'excludeFromIndex', false)) continue;
			$page = new Page($id);
			if(!$page->exists()) continue;
			$result[] = $page;
			$i++;
			if ($i == $count) break;
		}
		return $result;
	}

	/**
	 * Save page including it's metadata
	 *
	 * @return bool True for success, false for failure
	 */
	public function save()
	{

		global $INFO;
		
		if (auth_quickaclcheck($this->id) < AUTH_EDIT) {
			return false;
		}

		if (checklock($this->id)) {
			return false;
		}

		p_set_metadata($this->id, ['subject' => Strings::cleanStrings($this->tags)]);
		p_set_metadata($this->id, ['pageimage' => $this->pageimage]);

		lock($this->id);
		saveWikiText($this->id, $this->content, $this->abstract, false);
		p_set_metadata($this->id, ['abstract' => $this->abstract]);
		p_set_metadata($this->id, ['showSubpages' => $this->showSubpages]);
		p_set_metadata($this->id, ['title' => $this->title]);
		p_set_metadata($this->id, ['pagelink' => $this->pagelink]);
		p_set_metadata($this->id, ['category' => $this->category]);
		p_set_metadata($this->id, ['label' => $this->label]);
		p_set_metadata($this->id, ['icon' => $this->icon]);
		p_set_metadata($this->id, ['excludeFromIndex' => $this->exclude]);
		p_set_metadata($this->id, ['locked' => $this->locked]);
		p_set_metadata($this->id, ['copyright' => $this->copyright]);
		p_set_metadata($this->id, ['audience' => $this->audience]);
		p_set_metadata($this->id, ['user' => $INFO['client']]);

		unlock($this->id);
		$result = idx_addPage($this->id, false, true);

		return $result;
	}

	/**
	 * Get Tree. This function does not fit into the page model as it does not return a Page Opbject.
	 *
	 * @param [type] $namespace
	 * @return void
	 */
	public static function getFlatTree($namespace = "", $excludes = "")
	{
		$index = new Index();
		return $index->tree($namespace, $excludes, true);
	}

	/**
	 * Get Tree. This function does not fit into the page model as it does not return a Page Opbject.
	 *
	 * @param [type] $namespace
	 * @return void
	 */
	public static function getTree($namespace = "", $excludes = "", $current_id = '')
	{
		$index = new Index();
		$index->current_id = $current_id;
		
		return $index->tree($namespace, $excludes);
	}

	/**
	 * Get full page Object including all meta data
	 *
	 * @return array Page Data
	 */
	public function get()
	{
		return get_object_vars($this);
	}

	/**
	 * Delete page
	 *
	 * @return bool True for sucess, fals for failure
	 */
	public function delete()
	{
		if (auth_quickaclcheck($this->id) < AUTH_EDIT || checklock($this->id)) {
			return false;
		}
		saveWikiText($this->id, "", "");
		return true;
	}

	/**
	 * Move page to new location.
	 *
	 * @return void
	 */
	public function move($id, $move_files = true)
	{
		
		if (auth_quickaclcheck($this->id) < AUTH_EDIT || checklock($this->id)) {
			return false;
		}
		$old_id = $this->id;
		$this->id = $id;
		$success = $this->save();

		if(!$success) return ["success" => false, "message" => "Could not save page"];

		if ($move_files && !empty($this->files)) {
			$old_files_dir = Strings::id_to_path($old_id);
			$new_files_dir = Strings::id_to_path($id);
			if(!file_exists($new_files_dir)) {
				$success = mkdir($new_files_dir, 0777, true);
				if(!$success) return ["success" => false, "message" => "Could not create directory $new_files_dir"];
			}
			$files = scandir($old_files_dir);
			foreach ($files as $file) {
				if ($file == '.' || $file == '..') continue;
				$success = rename($old_files_dir . $file, $new_files_dir . $file);
				if(!$success) return ["success" => false, "message" => "Could not move file $file"];
			}

			rmdir($old_files_dir);

			$old_mediameta_dir = Strings::id_to_path($old_id, 'mediametadir');
			$new_mediameta_dir = Strings::id_to_path($id, 'mediametadir');
			if(!file_exists($new_mediameta_dir)) {
				$success = mkdir($new_mediameta_dir, 0777, true);
				if(!$success) return ["success" => false, "message" => "Could not create directory $new_mediameta_dir"];
			}
			$files = scandir($old_mediameta_dir);
			foreach ($files as $file) {
				if ($file == '.' || $file == '..') continue;
				$success = rename($old_mediameta_dir . $file, $new_mediameta_dir . $file);
				if(!$success) return ["success" => false, "message" => "Could not move file $file"];
			}

			rmdir($old_mediameta_dir);
			
		}
		$old_page = new Page($old_id);
		$old_page->delete();
		return ["success" => true];
	}
}
