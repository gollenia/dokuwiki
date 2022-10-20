<?php

namespace Contexis\Controllers;

use Contexis\Core\Breadcrumbs;
use Contexis\Core\Controller;
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



		$pageTree = Page::getTree($ID, false, "bibel,system");
		$namespaces = Breadcrumbs::get_namespace($ID);


		//$this->site->add_data("content", $content);
		$this->site->add_data("namespaces", $namespaces);
		$this->site->add_data('site', [
			"tags" => json_decode(rawWiki("system:tags")) ?? [],
			"categories" => json_decode(rawWiki('system:categories')) ?? [],
			"bible" => ["books" => \dokuwiki\plugin\bible\Book::findAll($conf['lang']), "info" => \dokuwiki\plugin\bible\Bible::info($conf['lang'])]
		]);
		$this->site->add_data("page", Page::find($ID));
		$this->site->add_data("tree", $pageTree);
	}
}
