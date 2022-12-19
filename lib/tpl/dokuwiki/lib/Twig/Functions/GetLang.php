<?php

namespace Contexis\Twig\Functions;

use Contexis\Twig\CustomFunctions;
use dokuwiki\Extension\Event;
use dokuwiki\plugins\rest\Models\Page;

/**
 * Get list of files in a given namespace
 */
class GetLang extends CustomFunctions
{

	public string $name = "__";

	public function render($id)
	{
		global $lang;
		$result = tpl_getLang($id);
		if ($result) return $result;
		if (array_key_exists($id, $lang)) return $lang[$id];
		return $id;
	}
}
