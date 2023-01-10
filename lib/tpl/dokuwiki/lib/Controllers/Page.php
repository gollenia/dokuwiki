<?php

namespace Contexis\Controllers;

use Contexis\Core\Controller;
use dokuwiki\Extension\Event;


class Page extends Controller
{

	public $template = "";
	public function __construct($site)
	{
		parent::__construct($site);
	}

	public function ajax_get($request)
	{
		global $ID;
		header("Access-Control-Allow-Origin: *");
		$filter = key_exists('filter', $_GET) ? array_flip(explode(",", $_GET['filter'])) : [];
		$id = !key_exists("id", $_GET) || $_GET['id'] == '' ? 'start' : $_GET['id'];
		$page = \dokuwiki\plugins\rest\Models\Page::find($ID, $filter);
		if (!$page->exists() && !$request->has('edit')) {
			$page = \dokuwiki\plugins\rest\Models\Page::find('system:notfound');
		}
		//if (array_key_exists('render', $_GET)) $page->render();
		$tmp = array(); // No event data

		return json_encode($page);
	}

	public function ajax_meta($request) {
		global $ID;
		header("Access-Control-Allow-Origin: *");
		$filter = ['abstract', 'title', 'pageimage', 'tags'];
		$id = $request->str('id', $ID);
		$page = \dokuwiki\plugins\rest\Models\Page::find($id, $filter);
		if (!$page->exists() && !$request->has('edit')) {
			$page = \dokuwiki\plugins\rest\Models\Page::find('system:notfound');
		}
		$result = [
			'title' => $page->title,
			'abstract' => $page->abstract,
			'pageimage' => $page->pageimage,
			'tags' => $page->tags
		];
		return json_encode($result);
	}
}
