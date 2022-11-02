<?php

namespace Contexis\Models;

use Contexis\Core\Utilities\Strings;

class Category
{
	static function findAll($assoc = false)
	{
		if (!page_exists("system:categories")) return [];
		$tags = Strings::json_to_array(rawWiki("system:categories"));
		if (!$assoc) return $tags;
		$result = [];
		foreach ($tags as $tag) {
			if (!array_key_exists('value', $tag)) continue;
			$result[$tag['value']] = $tag;
		}
		return $result;
	}
}
