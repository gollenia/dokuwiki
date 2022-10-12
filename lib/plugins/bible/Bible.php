<?php

namespace dokuwiki\plugin\bible;

use SQLite3;


/**
 * Represents a single book of the bible
 * 
 * @package bible
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
		global $conf;
		$db = new SQLite3($conf['savedir'] . "/bible.SQLite3");
		$statement = $db->prepare("SELECT * from info WHERE 1=1");

		$query = $statement->execute();

		if (!$query) return [];

		while ($row = $query->fetchArray()) {
			$result[$row["name"]] = $row["value"];
		}

		if (!$result) {
			return [];
		}
		return $result;
	}

	public static function get_db()
	{
		global $conf;
		return new SQLite3($conf['savedir'] . "/bible.SQLite3");
	}
}
