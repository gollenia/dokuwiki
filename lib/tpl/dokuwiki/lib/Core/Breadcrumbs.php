<?php

namespace Contexis\Core;

use Contexis\Core\Dokuwiki;

class Breadcrumbs
{

	public static function get($id = '')
	{

		global $conf;
		global $ID;
		global $lang;


		$parts = explode(':', empty($id) ? $ID : $id);


		$breadcrumbs = [];

		$part = "";


		for ($i = 0; $i < count($parts); $i++) {
			$part .= $parts[$i] . ':';
			$title = Dokuwiki::get_title($part);
			array_push($breadcrumbs, ["link" => wl($part, '', true), "title" => $title]);
		}

		return $breadcrumbs;
	}

	public static function get_namespace($id = '')
	{
		global $ID;
		global $lang;


		$parts = explode(':', empty($id) ? $ID : $id);


		$breadcrumbs = [];

		$part = "";


		for ($i = 0; $i < count($parts); $i++) {
			$part .= ($i == 0 ? '' : ':') . $parts[$i];
			array_push($breadcrumbs, $part);
		}

		return $breadcrumbs;
	}
}
