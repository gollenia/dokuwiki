<?php

namespace dokuwiki\plugin\bible;

use SQLite3;
use PDO;

/**
 * Bible Article
 * 
 * Get Doku Pages linked with a Bible reference or get the Bible References linked to an article
 * 
 * @package bible
 * @author Thomas Gollenia
 * @access 
 * @version 2.0
 */
class Article
{

	/**
	 * Return a list of Articles linked to a given bible ref
	 *
	 * @param Book $book
	 * @param integer $chapter
	 * @param integer $verse
	 * @return array<Page>
	 */
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
			array_push($result, \dokuwiki\plugins\rest\Models\Page::find($row['doku_id']));
		}
		return $result;
	}

	/**
	 * Add a bible reference to an article if the reference does not already exist
	 *
	 * @param Book $book
	 * @param [type] $id
	 * @param integer $chapter
	 * @return int ID of inserted Row
	 */
	static function add(Book $book, $id, $chapter = 0, $verse = 0)
	{
		$db = new SQLite3(__DIR__ . "/data/" . $book->lang . ".SQLite3");
		$statement = $db->prepare("SELECT FROM pages WHERE (doku_id = :doku_id AND book_id = :book_id, AND chapter = :chapter");
		$query = $statement->execute();
		if ($query && $query->numColumns() > 0) return 0;
		$query->finalize();
		$statement = $db->prepare("INSERT INTO pages (doku_id, book_id, chapter, verse) VALUES (:doku_id, :book_id, :chapter, :verse)");
		$statement->bindValue(':doku_id', $id, SQLITE3_TEXT);
		$statement->bindValue(':book_id', $book->id, SQLITE3_INTEGER);
		$statement->bindValue(':chapter', $chapter, SQLITE3_INTEGER);
		$statement->bindValue(':verse', $verse, SQLITE3_INTEGER);
		$query = $statement->execute();
		return $db->lastInsertRowID();
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
		$db = new SQLite3(__DIR__ . "/data/" . $book->lang . ".SQLite3");
		$statement = $db->prepare("DELETE FROM pages WHERE id = :id");
		$statement->bindValue(':id', $id, SQLITE3_INTEGER);
		$query = $statement->execute();
		return $query;
	}
}
