<?php

namespace dokuwiki\plugin\bibleverse;

use SQLite3;


/**
 * Represents a single book of the bible
 * 
 * @package bibleverse
 * @author Thomas Gollenia
 * @version 2.0
 */
class Bible
{



	/**
	 * Find one book by its's numerical ID and create an instance of this class
	 *
	 * @param int $id
	 * @return Book
	 */
	public static function info($lang = 'en')
	{
		$db = new SQLite3(__DIR__ . "/data/" . $lang . ".SQLite3");
		$statement = $db->prepare("SELECT * from info WHERE 1=1");

		$query = $statement->execute();

		while ($row = $query->fetchArray()) {
			$result[$row["name"]] = $row["value"];
		}

		if (!$result) {
			return [];
		}
		return $result;
	}
}
