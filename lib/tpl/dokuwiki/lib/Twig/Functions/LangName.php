<?php
namespace Contexis\Twig\Functions;


use Contexis\Twig\CustomFunctions;
use dokuwiki\Extension\Event;
use dokuwiki\Language;
use dokuwiki\plugins\rest\Models\Page;

/**
 * Get list of files in a given namespace
 */
class LangName extends CustomFunctions
{

	public string $name = "lang_name";

	public function render($name)
	{
		return Language::get_translation_name($name);
	}
}
