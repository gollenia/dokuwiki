<?php
global $ID;
global $INPUT;
global $ACT;
global $INFO;
return [
	"\\Contexis\\Controllers\\Page" => array_key_exists("controller", $_REQUEST) && $_REQUEST['controller'] === 'page',
	"\\Contexis\\Controllers\\Pages" => array_key_exists("controller", $_REQUEST) && $_REQUEST['controller'] === 'pages',
	"\\Contexis\\Controllers\\Search" => $ACT == "search",
	"\\Contexis\\Controllers\\MenuEdit" => $ID == "system:menu",
	"\\Contexis\\Controllers\\Dashboard" => $ID == "dashboard",
	"\\Contexis\\Controllers\\BibleView" => explode(":", $ID)[0] == "bibel" && $ACT == "show",
	"\\Contexis\\Controllers\\Tag" => explode(":", $ID)[0] == "tag" && $ACT == "show",
	"\\Contexis\\Controllers\\Show" => $ACT == "show",
];
