<?php

use Contexis\Core\Controller;


class action_plugin_rest extends \dokuwiki\Extension\ActionPlugin
{
	public function register(Doku_Event_Handler $controller)
	{
		$controller->register_hook(
			"DOKUWIKI_INIT_DONE",
			"AFTER",
			$this,
			"loadModels",
		);
	}

	function loadModels($event)
	{
		require_once(__DIR__ . '/Helpers/Strings.php');
		require_once(__DIR__ . '/Helpers/Meta.php');
		require_once(__DIR__ . '/Helpers/Indexer.php');
		require_once(__DIR__ . '/Helpers/Tag.php');
		require_once(__DIR__ . '/Models/Page.php');
		require_once(__DIR__ . '/Models/File.php');
		require_once(__DIR__ . '/Models/Tag.php');
		require_once(__DIR__ . '/Models/Category.php');
		require_once(__DIR__ . '/Models/Audience.php');
	}
}
