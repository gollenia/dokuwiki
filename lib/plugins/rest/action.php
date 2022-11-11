<?php

use Contexis\Core\Controller;
use Contexis\Database\Tag;
use dokuwiki\Extension\Event;

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

		$controller->register_hook('INDEXER_PAGE_ADD', 'BEFORE', $this, 'addTagsToIndex', array());
		$controller->register_hook('INDEXER_PAGE_ADD', 'BEFORE', $this, 'addCategoriesToIndex', array());
		$controller->register_hook('INDEXER_PAGE_ADD', 'BEFORE', $this, 'addAudienceToIndex', array());
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

	public function addTagsToIndex(Event $event, $param)
	{
		// make sure the tags are cleaned and no duplicate tags are added to the index
		$tags = p_get_metadata($event->data['page'], 'subject');
		if (!is_array($tags)) {
			$event->data['metadata']['subject'] = array();
			return;
		}

		$event->data['metadata']['subject'] = Tag::cleanTagList($tags);
	}

	public function addCategoriesToIndex(Event $event, $param)
	{
		$category = p_get_metadata($event->data['page'], 'category');
		$event->data['metadata']['category'] = $category;
	}

	public function addAudienceToIndex(Event $event, $param)
	{
		$audience = p_get_metadata($event->data['page'], 'audience');
		$event->data['metadata']['audience'] = $audience;
	}
}
