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
		global $INFO;
		global $ID;
		parent::__construct($site);

		$this->site->add_data('data', ['text' => rawWiki($ID)]);
		$content = $this->get_content();
		$pageTree = Page::getTree($ID, false, "bibel,system");
		$namespaces = Breadcrumbs::get_namespace($ID);


		$this->site->add_data("content", $content);
		$this->site->add_data("namespaces", $namespaces);
		$this->site->add_data("tree", $pageTree);
	}



	private function get_content()
	{
		global $ACT;

		ob_start();
		tpl_content(false);
		//Event::createAndTrigger('TPL_ACT_RENDER', $ACT, 'tpl_content_core');
		//Event::createAndTrigger('TPL_CONTENT_DISPLAY', $html_output, 'ptln');
		$html_output = ob_get_clean();
		return $html_output;
	}
}
