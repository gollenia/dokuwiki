<?php

use dokuwiki\plugin\config\core\Configuration;

global $conf;

header("Access-Control-Allow-Origin: *");
require __DIR__ . '/vendor/autoload.php';

use Contexis\Core\{
	Site,
	Router,
	Config,
	Controller
};

global $INPUT;

$site = new Site();
$route = new Router(Config::load("routes"));
$controller = Controller::get($route->get(), $site);
