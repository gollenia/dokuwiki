<?php

namespace Contexis\Controllers;

use Contexis\Core\Breadcrumbs;
use Contexis\Core\Controller;
use Contexis\Models\Audience;
use Contexis\Models\Category;
use Contexis\Models\Tag;
use dokuwiki\plugins\rest\Models\Page;
use Contexis\Models\Template;
use \Contexis\Twig\Renderer;
use dokuwiki\Extension\Event;

class Show extends Controller
{
	public $template = "show";

	public function __construct($site)
	{
		global $conf;
		global $ID;
		parent::__construct($site);
		global $INFO;


		$pageTree = Page::getTree($ID, false, "bibel,system");
		$namespaces = Breadcrumbs::get_namespace($ID);


		//$this->site->add_data("content", $content);
		$this->site->add_data("namespaces", $namespaces);
		$this->site->add_data('site', [
			"tags" => Tag::findAll(),
			"categories" => Category::findAll(),
			"audience" => Audience::findAll(),
			"bible" => ["books" => \dokuwiki\plugin\bible\Book::findAll($conf['lang']), "info" => \dokuwiki\plugin\bible\Bible::info($conf['lang'])]
		]);
		$this->site->add_data("user", [
			'hash' => md5($INFO['userinfo']['mail']),
			'name' => $INFO['user'],
			'fullname' => $INFO['userinfo']['name'],
			'email' => $INFO['userinfo']['mail'],
			'acl' => auth_quickaclcheck($ID)
		]);
		$this->site->add_data("page", Page::find($ID));
		$this->site->add_data("tree", $pageTree);
	}
}
