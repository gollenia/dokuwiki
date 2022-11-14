<?php

use dokuwiki\plugin\bible\Article;
use dokuwiki\plugin\bible\Bible;
use dokuwiki\plugin\bible\Book;
use dokuwiki\plugin\bible\Verse;
use dokuwiki\plugin\bible\ArticleController;

class action_plugin_bible extends \dokuwiki\Extension\ActionPlugin
{

	function register(Doku_Event_Handler $controller)
	{
		$controller->register_hook('AJAX_CALL_UNKNOWN', 'BEFORE', $this, '_get_bible');
		$controller->register_hook('AJAX_CALL_UNKNOWN', 'BEFORE', $this, '_biblepages');
		$controller->register_hook('AJAX_CALL_UNKNOWN', 'BEFORE', $this, '_verse_count');
		//$controller->register_hook('AJAX_CALL_UNKNOWN', 'BEFORE', $this, '_delete_article');
		//$controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this, 'load_js');
	}


	function _get_bible(Doku_Event $event, $param)
	{
		if ($event->data !== 'bible') return;
		$event->stopPropagation();
		$event->preventDefault();

		global $INPUT;
		$book = $INPUT->str('book', '10');
		$chapter = $INPUT->str('chapter', 1);
		$verse = $INPUT->str('verse', 0);
		$lang = $INPUT->str('lang', 'de');
		$book = Book::find($book, $lang);
		$verses = $verse ? Verse::where($book, $chapter, $verse) : Verse::findAll($book, $chapter);
		$pages = Article::where($book, $chapter);
		header('Content-Type: application/json');
		header("Access-Control-Allow-Origin: *");
		echo json_encode($verses);
	}

	function _verse_count(Doku_Event $event, $param)
	{
		if ($event->data !== 'versecount') return;
		$event->stopPropagation();
		$event->preventDefault();

		global $INPUT;
		global $conf;
		$book = $INPUT->str('book', '10');
		$chapter = $INPUT->str('chapter', 1);
		$lang = $INPUT->str('lang', $conf['lang']);
		$book = Book::find($book, $lang);

		header('Content-Type: application/json');
		header("Access-Control-Allow-Origin: *");
		echo json_encode(Verse::count($book, $chapter));
		return;
	}

	function _biblepages(Doku_Event $event, $param)
	{
		if ($event->data !== 'biblepages') return;
		$event->stopPropagation();
		$event->preventDefault();
		global $INPUT;

		global $_SERVER;
		switch ($_SERVER['REQUEST_METHOD']) {
			case 'GET':
				ArticleController::get($INPUT);
				break;
			case 'POST':
				ArticleController::post($INPUT);
				break;
			case 'DELETE':
				ArticleController::delete($INPUT);
				break;
		}

		return;
	}
}
