<?php

/**
 * This class heavily depends on the wiki's structure. It only works, if a base namespace for the bible-directory is given.
 */

namespace Contexis\Controllers;

use Contexis\Core\Controller;
use Contexis\Core\ControllerInterface;
use Contexis\Core\Site;
use Contexis\Models\Template;
use Contexis\Twig\Renderer;

use dokuwiki\Extension\Event;


class Bible extends Controller implements ControllerInterface
{

	public $book;
	public $verse;

	public function __construct($site)
	{
		parent::__construct($site);
	}

	public function ajax_books($request)
	{
		$lang = $request->str("lang", "en");
		$bible = \dokuwiki\plugin\bible\Book::findAll($lang);
		return json_encode($bible);
	}


	public function ajax_get_book($request)
	{
		$query = $request->str("query", "");
		$value = $request->str("value", "");
		$bible = \dokuwiki\plugin\bible\Book::where($query, $value);
		return json_encode($bible);
	}


	public function ajax_count_verses($request)
	{
		$book = $request->int("book", 10);
		$chapter = $request->int("chapter", 1);

		$bible = \dokuwiki\plugin\bible\Book::find($book);
		if ($bible) {
			return json_encode(count($bible->verses($chapter)));
		}
		return json_encode(0);
	}

	public function ajax_search($request)
	{
		header("Access-Control-Allow-Origin: *");
		$search = self::parse_reference($request->str("query", "genesis:1,1"));
		if (!$search) {
			http_response_code(400);
			return json_encode(false);
		}
		$bible = \dokuwiki\plugin\bible\Book::findByName($search["book"]);
		if ($bible) {
			http_response_code(200);
			return json_encode([
				'verses' => $bible->verses($search["chapter"], $search["verse"]),
				'book' => ['title' => $bible->long_name, 'translation' => $bible->translation],
				'query' => ['chapter' => $search["chapter"], 'verse' => $search["verse"]]
			]);
		}
		http_response_code(400);
		return json_encode(false);
	}


	public function ajax_get_verses($request)
	{
		header("Access-Control-Allow-Origin: *");
		$book = $request->str("book", "genesis");
		$chapter = $request->int("chapter", 1);
		$verses =  $request->str("verses", "");
		$lang = $request->str("lang", "");
		$bible = \dokuwiki\plugin\bible\Book::findByName($book, $lang);
		if ($bible) {
			http_response_code(200);
			return json_encode([
				'verses' => $bible->verses($chapter, $verses),
				'info' => ['long_name' => $bible->long_name, 'translation' => $bible->translation]
			]);
		}
		http_response_code(400);
		return json_encode(false);
	}

	public function ajax_get($request)
	{
		header("Access-Control-Allow-Origin: *");
		$book_id = $request->int("book", 10);
		$chapter = $request->int("chapter", 1);
		$lang = $request->str("lang", "en");
		$verses =  $request->str("verses", "");

		$book = \dokuwiki\plugin\bible\Book::find($book_id, $lang);

		if ($book->id) {
			http_response_code(200);
			return json_encode($book->verses($chapter, $verses));
		}
		http_response_code(400);
		return json_encode(false);
	}

	static function parse_reference(string $reference)
	{
		$reference = str_replace(' ', '', $reference);
		preg_match('/([0-9]*[A-Za-z]+)([0-9]+):([0-9\-\,]+)/', $reference, $matches, PREG_UNMATCHED_AS_NULL);
		if (count($matches) != 4) return false;

		return [
			'book' => $matches[1],
			'chapter' => $matches[2],
			'verse' => $matches[3],
		];
	}
}
