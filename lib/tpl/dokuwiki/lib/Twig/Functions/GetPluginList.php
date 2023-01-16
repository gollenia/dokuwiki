<?php

namespace Contexis\Twig\Functions;

use Contexis\Twig\CustomFunctions;

/**
 * Get list of files in a given namespace
 */
class GetPluginList extends CustomFunctions
{

	public string $name = "admin_menu";

	protected $forAdmins = array('usermanager', 'acl', 'extension', 'config', 'styling');
	protected $forManagers = array('revert', 'popularity');

	public function render()
	{
		//var_dump(Page::where($key, $arg));
		return $this->getPluginList();
	}

	private function getPluginList()
	{
		global $conf;

		$pluginlist = plugin_list('admin');
		$menu = ['admin' => [], 'manager' => [], 'other' => []];

		foreach ($pluginlist as $p) {
			/** @var \dokuwiki\Extension\AdminPlugin $obj */
			if (($obj = plugin_load('admin', $p)) === null) continue;

			// check permissions
			if (!$obj->isAccessibleByCurrentUser()) continue;

			if (in_array($p, $this->forAdmins, true)) {
				$type = 'admin';
			} elseif (in_array($p, $this->forManagers, true)) {
				$type = 'manager';
			} else {
				$type = 'other';
			}

			$menu[$type][$p] = array(
				'plugin' => $p,
				'prompt' => $obj->getMenuText($conf['lang']),
				'icon' => $obj->menuIcon,
				'sort' => $obj->getMenuSort(),
			);
		}

		return $menu;
	}
}
