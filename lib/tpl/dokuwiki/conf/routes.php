<?php

global $ID;
global $INPUT;
global $ACT;


return [
	//"\\Contexis\\Controllers\\OpenGraph" => substr($ID, 0,2) == "og",
	"\\Contexis\\Controllers\\Logout" => $ACT == "logout",
	"\\Contexis\\Controllers\\Page" => array_key_exists("controller", $_GET) && $_GET['controller'] === 'page',
	"\\Contexis\\Controllers\\Pages" => array_key_exists("controller", $_GET) && $_GET['controller'] === 'pages',
	"\\Contexis\\Controllers\\Dashboard" => $ID == "dashboard",
	"\\Contexis\\Controllers\\Show" => $ACT == "show",
];
