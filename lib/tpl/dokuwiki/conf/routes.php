<?php
global $ID;
global $INPUT;
global $ACT;
global $INFO;
return [
	"\\Contexis\\Controllers\\Page" => array_key_exists("controller", $_GET) && $_GET['controller'] === 'page',
	"\\Contexis\\Controllers\\Pages" => array_key_exists("controller", $_GET) && $_GET['controller'] === 'pages',
	"\\Contexis\\Controllers\\Search" => $ACT == "search",
	"\\Contexis\\Controllers\\MenuEdit" => $ID == "system:menu",
	"\\Contexis\\Controllers\\Dashboard" => $ID == "dashboard",
	"\\Contexis\\Controllers\\Tag" => explode(":", $ID)[0] == "tag" && $ACT == "show",
	"\\Contexis\\Controllers\\Show" => $ACT == "show",
];
