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


		global $ID;
		$filter = key_exists('filter', $_GET) ? array_flip(explode(",", $_GET['filter'])) : [];
		$id = !key_exists("id", $_GET) || $_GET['id'] == '' ? 'start' : $_GET['id'];
		$page = \dokuwiki\plugins\rest\Models\Page::find($ID, $filter);
		if (!$page->exists()) {
			$page = \dokuwiki\plugins\rest\Models\Page::find('system:de:notfound');
		}
		//if (array_key_exists('render', $_GET)) $page->render();
		$tmp = array(); // No event data

		return json_encode($page);
	}
}
