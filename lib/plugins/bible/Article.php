<?php

namespace dokuwiki\plugin\bible;

use SQLite3;
use PDO;

/**
 * Bible Verse class
 * 
 * represents a single verse of a bible book in a chapter
 * 
 * @package bible
 * @author Thomas Gollenia
 * @access 
 * @version 2.0
 */
class Article
{

	public array $articles = [];

	/**
	 * @param int $book 
	 * @param int $chapter 
	 * @param int $verse 
	 * @return void 
	 */
	public function __construct($result)
	{
	}

	static function where(Book $book, int $chapter = 0, int $verse = 0)
	{
		$lang = $book->lang;
		$db = new SQLite3(__DIR__ . "/data/" . $lang . ".SQLite3");

		$statement = $db->prepare("SELECT id, doku_id, book_id, chapter FROM pages WHERE (book_id = :book AND chapter IN (0, :chapter))");

		$statement->bindValue(':book', $book->id, SQLITE3_INTEGER);
		$statement->bindParam(':chapter', $chapter, SQLITE3_INTEGER);
		$query = $statement->execute();


		$result = [];

		while ($row = $query->fetchArray(SQLITE3_ASSOC)) {
			array_push($result, \Contexis\Models\Page::find($row['doku_id']));
		}
		return $result;
	}

	static function add(Book $book, $id, $chapter = 0)
	{
		$db = new SQLite3(__DIR__ . "/data/" . $book->lang . ".SQLite3");
		$statement = $db->prepare("DELETE FROM pages WHERE id = :id");
		$statement->bindValue(':id', $id, SQLITE3_INTEGER);
		$query = $statement->execute();
		return $query;
	}

	static function hasBiblerefs($id)
	{
		global $conf;
		$db = new SQLite3(__DIR__ . "/data/" . $conf['lang'] . ".SQLite3");
		$statement = $db->prepare("SELECT id, book_id, chapter FROM pages WHERE doku_id = :doku_id");
		$statement->bindValue(':doku_id', $id, SQLITE3_TEXT);
		$query = $statement->execute();
		$result = [];
		while ($row = $query->fetchArray(SQLITE3_ASSOC)) {
			array_push($result, $row);
		}
		return $result;
	}

	static function remove(Book $book, $id)
	{
	}
}
