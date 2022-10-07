<?php

namespace Contexis\Twig\Functions;

use Contexis\Twig\CustomFunctions;
use dokuwiki\Extension\Event;
use Contexis\Models\Page;

/**
 * Get list of files in a given namespace
 */
class GetConf extends CustomFunctions
{

	public string $name = "config";

	public function render($id)
	{
		global $conf;
		$result = tpl_getConf($id);
		if ($result) return $result;
		if (array_key_exists($id, $conf)) return $conf[$id];
		return "";
	}
}
