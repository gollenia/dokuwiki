<?php

namespace Contexis\Core\Utilities;

use FFI\Exception;

class Strings
{
	static function to_array_field($string, $delimiter = "-", $max)
	{

		$start_stop = explode($delimiter, $string);

		$start = intval($start_stop[0]);
		$end = intval(end($start_stop));

		if ($start > $end) {
			throw new Exception("Error: Start must not be bigger than end");
		}

		$array_field = [];
		for ($i = $start; $i < $end + 1; $i++) {
			array_push($array_field, $i);
		}

		return $array_field;
	}

	static function clean_array($array)
	{
		$new_array = [];
		foreach ($array as $key => $value) {
		}
	}

	static function cleanString($string)
	{
		return cleanID($string);
	}

	static function cleanStrings(array $strings)
	{
		return array_unique(array_map("cleanID", $strings));
	}

	static function fuzzySearch(string $needle, array $haystack, int $threshold = 20): string
	{
		$needle = cleanID($needle);

		if (array_search($needle, $haystack)) {
			return $needle;
		}

		$hit = ['distance' => 99, 'key' => -1];
		$needle = str_replace("ph", "f", $needle);
		foreach ($haystack as $key => $value) {
			$value = str_replace("ph", "f", $value);
			$match = levenshtein($value, $needle);
			if ($match < $hit['distance']) {
				$hit = ['distance' => $match, 'key' => $key];
			}
		}

		if ($hit['distance'] / strlen($needle) * 100 <= $threshold) return $haystack[$hit['key']];

		return "";
	}
}
