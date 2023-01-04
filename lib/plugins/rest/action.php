<?php

use Contexis\Core\Controller;
use Contexis\Database\Tag;
use dokuwiki\Extension\Event;
use dokuwiki\plugins\rest\Models\Page;

class action_plugin_rest extends \dokuwiki\Extension\ActionPlugin
{
	
	public function register($controller)
	{
		$controller->register_hook(
			"DOKUWIKI_INIT_DONE",
			"AFTER",
			$this,
			"loadModels",
		);

		$controller->register_hook('INDEXER_PAGE_ADD', 'BEFORE', $this, 'addTagsToIndex', array());
		$controller->register_hook('AJAX_CALL_UNKNOWN', 'BEFORE', $this, '_get_opengraph');
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

	public function _get_opengraph($event, $param)
	{
		global $INPUT;
		global $conf;
		
		if ($event->data !== "opengraph") return;
		
		$url = $_SERVER['REQUEST_URI'];
		$parts = explode("/", $url);
		$last = end($parts);
		
		$id = base64_decode($last);
		$lang = $INPUT->str('lang', $conf['lang']);
		$page = Page::find($id);
		$ref = $INPUT->str('ref', 'at');
		http_response_code(301);
		header('Location: https://downloads.kids-team." . $ref . "/" . $id . "');
		echo "<html><head>";
		echo "<meta name='author' content='kids-team' />";
		echo "<meta name='keywords' content='' />";
		echo "<meta name='description' content='" . $page->abstract . "' />";
		echo "<meta itemprop='name' content='test' />";
		echo "<meta itemprop='description' content='" . $page->abstract . "' />";
		echo "<meta itemprop='image' content='https://dlapi.kids-team.com/_media/" . $page->pageimage . "' />";
		echo "<meta property='og:title' content='" . $page->title . "' />";
		echo "<meta property='og:description' content='" . $page->abstract . "' />";
		echo "<meta property='og:image' content='https://dlapi.kids-team.com/_media/" . $page->pageimage . "' />";
		echo "<meta property='og:image:width' content='780' />";
		echo "<meta property='og:image:height' content='439' />";
		echo "<meta property='og:site_name' content='test' />";
		echo "<meta property='og:url' content='https://downloads.kids-team." . $ref . "/" . $id . "' />";
		echo "<meta property='og:type' content='article' />";
		echo "<meta property='og:locale' content='" . $lang . "' />";
		echo "<meta name='twitter:card' content='summary' />";
		echo "<meta name='twitter:site' content='downloads.kids-team." . $ref . "/" . $id . "' />";
		echo "<meta name='twitter:title' content='test' />";
		echo "<meta name='twitter:description' content='" . $page->abstract . "' />";
		echo "<meta name='twitter:image' content='https://example.com/img.jpg' />";
		echo "<base href='downloads.kids-team." . $ref . "' />";
		echo "<link rel='canonical' href='downloads.kids-team." . $ref . "/" . $id . "' />";
		echo "</head><body></body></html>";
		die();
	}
}
