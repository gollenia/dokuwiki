<?php

namespace Contexis\Models;

use Contexis\Core\Utilities\Strings;

class Category
{
	public string $value;
	public string $label;
	public string $icon;
	public string $color;
	public array $synonyms;

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

	static function getAllSynonyms() {
		if (!page_exists("system:categories")) return [];
		$categories = Strings::json_to_array(rawWiki("system:categories"));
		$result = [];
		foreach($categories as $category) {
			if(!array_key_exists('synonyms', $category)) continue;
			array_merge($result, $categories['synonyms']);
		}
	}

	static function getCategoryBySynonym($synonym) {
		if (!page_exists("system:categories")) return [];
		$categories = Strings::json_to_array(rawWiki("system:categories"));
		$result = null;
		foreach($categories as $category ) {
			if(!array_key_exists('synonyms', $category)) continue;
			if(array_search($synonym, $category['synonyms'])) {
				$result = $category;
				break;
			}
		}

		return $result;

	}
}
