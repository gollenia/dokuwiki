<?php

namespace dokuwiki\plugin\bible;


class ArticleController
{

	public static function get()
	{
		global $INPUT;
		global $conf;
		$book = $INPUT->int('book', '10');

		$chapter = $INPUT->int('chapter', 1);
		$verse = $INPUT->int('verse', 0);

		$book = Book::find($book);

		$pages = Article::where($book, $chapter, $verse);
		header("Access-Control-Allow-Origin: *");
		header('Content-Type: application/json');
		echo json_encode($pages);
	}

	public static function post()
	{
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

	public static function delete()
	{
		$error = [];

		global $INPUT;
		$lang = $INPUT->str('lang', '');
		$id = $INPUT->int('id', 0);

		if (empty($lang)) $error[] = 'language missing';

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

		$result = Article::remove($id);
		if (!$result) http_response_code(500);
		echo json_encode($result);
	}
}
