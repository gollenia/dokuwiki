<?php

namespace Contexis\Controllers;

use Contexis\Core\Controller;
use dokuwiki\plugins\rest\Models\Page;
use \dokuwiki\Input\Input;


class Pages extends Controller
{

	public $template = "";
	public function __construct($site)
	{
		parent::__construct($site);
	}

	/**
	 * Returns an array of pages
	 *
	 * @return void
	 */
	public function ajax_get(Input $request)
	{


		$query = $request->str("query", "id");
		$value = $request->str("value", "start");

		$filter = key_exists('filter', $_GET) ? array_flip(explode(",", $_GET['filter'])) : [];
		$pages = Page::where($query, $value, $filter);
		if (empty($filter)) {
			return json_encode($pages);
		}

		$result = [];

		foreach ($pages as $page) {
			$result[] = $page->to_array($filter);
		}

		return json_encode($result);
	}

	public function ajax_get_tag(Input $request)
	{


		$tag = $request->str("tag", "start");

		$filter = key_exists('filter', $_GET) ? array_flip(explode(",", $_GET['filter'])) : [];
		$pages = Page::where('tag', $tag, $filter);
		if (empty($filter)) {
			return json_encode(['articles' => $pages, 'root' => Page::find('tag:' . $tag)]);
		}

		$result = [];

		foreach ($pages as $page) {
			$result[] = $page->to_array();
		}
		return json_encode(['articles' => $result, 'tag_page' => Page::find('tag:' . $tag)]);
	}

	public function ajax_newest(Input $request)
	{
		$pages = Page::newest($request->int('count', 10));
		return json_encode($pages);
	}

	public function ajax_popular(Input $request)
	{
		$pages = Page::popular($request->int('count', 10));
		return json_encode($pages);
	}
}
