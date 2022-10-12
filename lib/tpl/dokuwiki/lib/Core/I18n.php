<?php

namespace Contexis\Core;

use dokuwiki\plugins\rest\Models\Page;

class I18n
{

	public array $available_langs = [];
	public string $locale;

	public function __construct()
	{
		$this->get_available_langs();
		$this->locale = $this->get_browser_locale();
	}

	public function get_available_langs()
	{
		foreach (Page::where('namespace', 'system:lang') as $key => $value) {
			$this->available_langs[] = $value['id'];
		}
	}

	public function get_browser_locale()
	{
		$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
		return in_array($lang, $this->available_langs) ? $lang : 'de';
	}
}
