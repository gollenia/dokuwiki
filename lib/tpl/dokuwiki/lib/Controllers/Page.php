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

	public function ajax_get()
	{
		header('Content-Type: application/json');
		header("Access-Control-Allow-Origin: *");
		global $ID;
		$filter = key_exists('filter', $_REQUEST) ? array_flip(explode(",", $_REQUEST['filter'])) : [];
		$id = !key_exists("id", $_REQUEST) || $_REQUEST['id'] == '' ? 'start' : $_REQUEST['id'];
		$page = \Contexis\Models\Page::find($ID, $filter);
		if (!$page->exists()) {
			$page = \Contexis\Models\Page::find('system:de:notfound');
		}
		//if (array_key_exists('render', $_REQUEST)) $page->render();
		$tmp = array(); // No event data

		return json_encode($page);
	}
}
