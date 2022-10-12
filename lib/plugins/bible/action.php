<?php

use dokuwiki\plugin\bible\Article;
use dokuwiki\plugin\bible\Bible;
use dokuwiki\plugin\bible\Book;
use dokuwiki\plugin\bible\Verse;
use dokuwiki\plugins\bible\ArticleController;

class action_plugin_bible extends \dokuwiki\Extension\ActionPlugin
{

	function register(Doku_Event_Handler $controller)
	{
		$controller->register_hook(
			"DOKUWIKI_INIT_DONE",
			"AFTER",
			$this,
			"loadModels",
		);

		$controller->register_hook('AJAX_CALL_UNKNOWN', 'BEFORE', $this, '_get_bible');
		$controller->register_hook('AJAX_CALL_UNKNOWN', 'BEFORE', $this, '_get_articles');
		$controller->register_hook('AJAX_CALL_UNKNOWN', 'BEFORE', $this, '_set_article');
		$controller->register_hook('AJAX_CALL_UNKNOWN', 'BEFORE', $this, '_delete_article');
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

	function _get_articles(Doku_Event $event, $param)
	{
		if ($event->data !== 'biblepages') return;
		$event->stopPropagation();
		$event->preventDefault();
		global $INPUT;

		global $_SERVER;
		switch ($_SERVER['REQUEST_METHOD']) {
			case 'GET':
				BiblePages::get($INPUT);
			case 'POST':
				BiblePages::post($INPUT);
			case 'DELETE':
				BiblePages::delete($INPUT);
		}
	}

	function _set_article(Doku_Event $event, $param)
	{
		if ($event->data !== 'biblepage') return;
		$event->stopPropagation();
		$event->preventDefault();

		$error = [];

		global $INPUT;
		$book = $INPUT->int('book', 0);
		$chapter = $INPUT->str('chapter', 0);
		$id = $INPUT->str('id', 0);
		$lang = $INPUT->str('lang', '');

		if (empty($lang)) $error[] = 'language missing';
		if ($book == 0) $error[] = 'book missing';
		if (empty($id)) $error[] = 'id missing';

		if (!empty($error)) {
			http_response_code(400);
			echo json_encode(['error' => join(', ', $error)]);
			return;
		}

		if (!auth_quickaclcheck($id) >= AUTH_EDIT) {
			http_response_code(403);
			echo json_encode(['error' => 'forbidden']);
			return;
		}

		$book = Book::find($book, $lang);

		$result = Article::add($book, $id, $chapter);
		echo json_encode($result);
	}

	function _delete_article(Doku_Event $event, $param)
	{
		if ($event->data !== 'plugin_bible_delete_article') return;
		$event->stopPropagation();
		$event->preventDefault();

		$error = [];

		global $INPUT;
		$book = $INPUT->int('book', 0);
		$lang = $INPUT->str('lang', '');
		$id = $INPUT->int('id', 0);

		if (empty($lang)) $error[] = 'language missing';
		if ($book == 0) $error[] = 'book missing';
		if (empty($id)) $error[] = 'id missing';

		if (!empty($error)) {
			http_response_code(400);
			echo json_encode(['error' => join(', ', $error)]);
			return;
		}

		if (!auth_quickaclcheck($id) >= AUTH_EDIT) {
			http_response_code(403);
			echo json_encode(['error' => 'forbidden']);
			return;
		}

		$book = Book::find($book, $lang);

		$result = Article::remove($book, $id);
		if (!$result) http_response_code(500);
		echo json_encode($result);
	}
}
