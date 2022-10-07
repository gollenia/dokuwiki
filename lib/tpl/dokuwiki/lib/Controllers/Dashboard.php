<?php

namespace Contexis\Controllers;

use Contexis\Core\Controller;
use Contexis\Core\Breadcrumbs;
use Contexis\Core\Statistics;
use Contexis\Models\Page;

class Dashboard extends Controller
{

	public $template = "dashboard";
	public $script_file;

	public function __construct($site)
	{
		global $INFO;
		global $ID;
		parent::__construct($site);

		$statistic = new Statistics();

		$this->site->add_data('stats', array_merge($statistic->get_data(), ['total' => $statistic->get_total(), 'year' => $statistic->get_year(), 'downloads' => $statistic->download_counter()]));

		$pageTree = Page::getTree($ID, false, "bibel,system");
		$namespaces = Breadcrumbs::get_namespace($ID);
		$this->site->add_data("namespaces", $namespaces);
		$this->site->add_data("tree", $pageTree);
	}
}
