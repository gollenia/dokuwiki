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
		header('Content-Type: application/json');
		header("Access-Control-Allow-Origin: *");

		return json_encode(json_decode(rawWiki("system:translation")));
	}
}
