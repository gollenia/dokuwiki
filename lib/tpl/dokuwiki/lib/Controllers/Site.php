<?php

namespace Contexis\Controllers;

use Contexis\Core\Controller;
use Contexis\Models\Audience;
use Contexis\Models\Category;
use Contexis\Models\Tag;
use dokuwiki\Language;

class Site extends Controller
{

	public $template = "";
	public function __construct($site)
	{
		parent::__construct($site);
	}

	public function ajax_get()
	{
		global $conf;
		header('Content-Type: application/json');
		header("Access-Control-Allow-Origin: *");

		return json_encode([
			'menu' => array_merge(
				\Contexis\Core\Menu::get("system:menu"),
				['available_langs' => Language::get_available()]
			),
			'taxonomies' => [
				'tags' => Tag::findAll(true),
				'categories' => Category::findAll(true),
				'audience' => Audience::findAll(true),
			],
			"footer" => rawWiki("system:footer"),
			"organizations" => json_decode(rawWiki("system:organizations")),
			"bible" => ["books" => \dokuwiki\plugin\bible\Book::findAll($conf['lang']), "info" => \dokuwiki\plugin\bible\Bible::info($conf['lang'])]
		]);
	}
}
