<?php

namespace Contexis\Controllers;

use Contexis\Core\Controller;
use dokuwiki\plugins\rest\Models\Page;


class Test extends Controller
{

	public $template = "";
	public function __construct($site)
	{
		parent::__construct($site);
	}

	public function ajax_get()
	{
		return json_encode(Page::where("title", "Abraha", ['id', 'title', 'abstract', 'pageimage', 'category', 'tags'], true));
		//var_dump($result);
	}

	function getTags()
	{
		$tags = idx_getIndex('subject', '_w');
		return $this->cleanTagList($tags);
	}

	/**
	 * Clean a list (array) of tags using _cleanTag
	 */
	function cleanTagList($tags)
	{
		return array_unique(array_map(array($this, 'cleanTag'), $tags));
	}

	function cleanTag($tag)
	{
		$prefix = substr($tag, 0, 1);

		if ($prefix === '-' || $prefix === '+') {
			return $prefix . cleanID($tag);
		} else {
			return cleanID($tag);
		}
	}
}
