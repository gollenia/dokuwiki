<?php

namespace dokuwiki;

class Language
{
	/**
	 * Retrieve language either from the domain, the current user session of from the request lang attribute
	 *
	 * @param string $default
	 * @return string
	 */
	static function get(string $default = "en"): string
	{
		$available = self::get_available();

		if (array_key_exists('lang', $_GET) && in_array($_GET['lang'], $available)) {
			setcookie("lang", $_GET['lang']);
			return $_GET['lang'];
		}

		if (isset($_COOKIE["lang"]) && in_array($_COOKIE['lang'], $available)) {
			return $_COOKIE["lang"];
		}

		return $default;
	}

	/**
	 * Look for folders in the data/ directory and exclude the _template folder
	 *
	 * @return array
	 */
	static function get_available(): array
	{
		$available = array_map('basename', glob($_SERVER['DOCUMENT_ROOT'] . '/data/*', GLOB_ONLYDIR));
		return array_values(array_diff($available, array("_template")));
	}

	


	static function get_translation_name(string $country): string {
		$langs = [
			"de" => "German",
			"fr" => "French",
			"en" => "English",
			"it" => "Italian",
			"es" => "Spanish",
			"tr" => "Turkish",
			"el" => "Greek"
		];

		return key_exists($country, $langs) ? $langs[$country] : '';

	}
}

$default = array_key_exists('default_lang', $conf) ? $conf['default_lang'] : "en";
$lang = \dokuwiki\Language::get($default);

$conf['lang'] = $lang;

$conf['savedir'] = $_SERVER['DOCUMENT_ROOT'] . "/data/" . $lang;
