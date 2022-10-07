<?php

namespace Contexis\Controllers;

use Contexis\Core\Controller;


class Site extends Controller
{

	public $template = "";
	public function __construct($site)
	{
		parent::__construct($site);
	}

	public function ajax_get()
	{
		global $INFO;
		global $conf;
		header('Content-Type: application/json');
		header("Access-Control-Allow-Origin: *");

		return json_encode([
			'menu' => array_merge(
				\Contexis\Core\Menu::get("system:menu"),
				['available_langs' => array_map('basename', glob($_SERVER['DOCUMENT_ROOT'] . '/data/*', GLOB_ONLYDIR)),]
			),
			"footer" => rawWiki("system:footer"),
			"bible" => ["books" => \dokuwiki\plugin\bibleverse\Book::findAll($conf['lang']), "info" => \dokuwiki\plugin\bibleverse\Bible::info($conf['lang'])]
		]);
	}
}
