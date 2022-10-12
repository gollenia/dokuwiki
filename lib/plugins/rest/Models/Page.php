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
	public string $id = "";
	public array $tags = [];
	public string $pageimage = "";
	public string $title = "";
	public string $content = "";
	public string $summary = "";
	public string $link = "";
	public string $exclude = "";
	public string $category = "";
	public string $icon = "";
	public string $template = "";
	public string $pagelink = "";
	public DateTime $date;
	public string $language = "";
	public string $abstract = "";
	public bool $showSubpages = false;
	public string $namespace;
	public array $files = [];
	public array $filter = [];
	public $user;
	public bool $minor_change = false;
	public array $bibleref;


	public function __construct($id = "", $filter = [])
	{
		if ($id === "") return;
		if (class_exists("dokuwiki\\plugin\\bible\\Article")) {
			$this->bibleref = \dokuwiki\plugin\bible\Article::hasBiblerefs($id);
		}
		$this->filter = $filter;
		$this->id = cleanID($id);
		$this->namespace = $this->getNamespace();
		$this->title = $this->getTitle();
		$this->link = wl($id);
		$this->content = rawWiki($id);
		$this->tags = Meta::get($id, 'subject', []);
		$this->pageimage = Meta::get($id, 'pageimage', '');
		$this->icon = Meta::get($id, 'icon', '');
		$this->category = Meta::get($id, 'category', '');
		$this->pagelink = Meta::get($id, 'pagelink', '');
		$this->user = Meta::get($id, 'user', '');
		$this->date = DateTime::createFromFormat('U', Meta::get($id, 'date modified', 0));
		$this->showSubpages = Meta::get($id, 'showSubpages', false);
		$this->exclude = Meta::get($id, 'exclude', '');
		$this->abstract =  Meta::get($id, 'abstract', '');
		$this->files = File::findAll($id);
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

	public function to_array($filter = [])
	{
		$ret = (array) $this;
		if (!empty($filter)) {
			return array_intersect_key($ret, array_flip($filter));
		}
		return $ret;
	}

	public function exists()
	{
		return page_exists($this->id);
	}

	/**
	 * get raw wiki test either without or with template
	 *
	 * @param string $id
	 * @return string raw wiki text
	 */
	public function get_raw(string $id)
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
	public static function findOrNew(string $id, array $data = [])
	{
		if (!($instance = self::find($id))) {
			$instance = new self($id);
			$instance->id = $id;
			foreach ($data as $key => $value) {
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
	public static function where(string $key, string $value, array $filter = [], bool $as_array = false): array
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


	/**
	 * Save page including it's metadata
	 *
	 * @return bool True for success, false for failure
	 */
	public function save()
	{

		if (auth_quickaclcheck($this->id) < AUTH_EDIT) {
			return false;
		}

		if (checklock($this->id)) {
			return false;
		}

		p_set_metadata($this->id, ['subject' => Strings::cleanStrings($this->tags)]);
		p_set_metadata($this->id, ['pageimage' => $this->pageimage]);

		$content = $this->content;

		lock($this->id);
		saveWikiText($this->id, $content, $this->summary, $this->minor_change);
		p_set_metadata($this->id, ['abstract' => $this->abstract]);
		p_set_metadata($this->id, ['showSubpages' => $this->showSubpages]);
		p_set_metadata($this->id, ['title' => $this->title]);
		p_set_metadata($this->id, ['pagelink' => $this->pagelink]);
		p_set_metadata($this->id, ['category' => $this->category]);
		p_set_metadata($this->id, ['icon' => $this->icon]);
		p_set_metadata($this->id, ['template' => $this->template]);
		p_set_metadata($this->id, ['exclude' => $this->exclude]);
		idx_addPage($this->id, false, true);
		unlock($this->id);

		return true;
	}

	/**
	 * Get Tree. This function does not fit into the page model as it does not return a Page Opbject.
	 *
	 * @param [type] $namespace
	 * @return void
	 */
	public static function findAll($namespace = "", $excludePages = false, $excludes = "")
	{
		$index = new Index();
		$result = $index->tree($namespace, $excludes, $excludePages);
	}

	/**
	 * Get Tree. This function does not fit into the page model as it does not return a Page Opbject.
	 *
	 * @param [type] $namespace
	 * @return void
	 */
	public static function getTree($namespace = "", $excludePages = false, $excludes = "")
	{
		$index = new Index();
		return $index->tree($namespace, $excludes, $excludePages);
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

	public static function findAndRender()
	{
		$page = self::find($_GET['id']);
		if ($page) {
			$page->render();
		}
	}

	public function render()
	{
		ob_start();
		$this->content = tpl_content();
		$this->content = ob_get_clean();
	}

	/**
	 * Move page to new location
	 *
	 * @return void
	 */
	public function move($id, $move_files = true)
	{
	}
}
