<?php
namespace Contexis\Twig\Functions;


use Contexis\Twig\CustomFunctions;
use dokuwiki\Extension\Event;
use dokuwiki\Language;
use dokuwiki\plugins\rest\Models\Page;

/**
 * Get list of files in a given namespace
 */
class GetLangs extends CustomFunctions
{

	public string $name = "get_langs";

	public function render()
	{
		$langs = Language::get_available();
		$result = [];

		foreach ($langs as $lang) {
			$result[$lang] =  Language::get_translation_name($lang);
		}

		return $result;
	}
}
