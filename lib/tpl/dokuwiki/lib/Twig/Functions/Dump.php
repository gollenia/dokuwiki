<?php

namespace Contexis\Twig\Functions;

use Contexis\Twig\CustomFunctions;
use dokuwiki\Extension\Event;
use Contexis\Models\File;

/**
 * Get list of files in a given namespace
 */
class Dump extends CustomFunctions
{

	public string $name = "dump";

	public function render($data)
	{
		var_dump($data);
	}
}
