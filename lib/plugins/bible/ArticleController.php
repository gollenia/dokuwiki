<?php

namespace dokuwiki\plugins\bible;



class ArticleController
{

	public static function get()
	{
		global $INPUT;
		$book = $INPUT->str('book', '10');
		$chapter = $INPUT->str('chapter', 1);
		$verse = $INPUT->str('verse', 0);
		$lang = $INPUT->str('lang', 'de');

		$book = Book::find($book, $lang);

		$pages = Article::where($book, $chapter);
		header("Access-Control-Allow-Origin: *");
		header('Content-Type: application/json');
		echo json_encode($pages);
	}

	public static function post()
	{
	}

	public static function delete()
	{
	}
}
