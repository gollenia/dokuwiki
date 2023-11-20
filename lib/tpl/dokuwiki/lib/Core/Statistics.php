<?php

namespace Contexis\Core;

use Contexis\Core\Dokuwiki;
use Contexis\Core\Utilities;


class Statistics
{

	private $year = [];
	private $year_months = [];
	private $users;
	private $plugin_exists;
	private $last_year;
	public $data = [];


	public function __construct()
	{
		$this->plugin_exists = $this->check_quickstat_plugin();
		$this->script_file = metaFN('quickstats:cache', '.ser');
	}

	/**
	 * We're using the Quickstats plugin to collect data, so make sure the plugin is installed
	 *
	 * @return boolean
	 */
	private function check_quickstat_plugin(): bool
	{
		return class_exists('action_plugin_quickstats');
	}

	/**
	 * Collect this month's data return as an array
	 *
	 * @return void
	 */
	public function get_data(bool $sort_platforms = true): array
	{
		if (!$this->plugin_exists) return [];
		$today = getdate();
		$ns =  "quickstats:" . $today['mon'] . '_'  . $today['year'] . ':';
		date("d_Y", strtotime("-1 month"));
		$ns_last_month = "quickstats:" . date("n_Y", strtotime("-1 month")) . ':';

		$usersfile = metaFN($ns . 'misc_data', '.ser');
		$pagesfile = metaFN($ns . 'pages', '.ser');
		$usersfile_last = metaFN($ns_last_month . 'misc_data', '.ser');
		$pagesfile_last = metaFN($ns_last_month . 'pages', '.ser');
		$users = unserialize(io_readFile($usersfile, false));
		$pages = unserialize(io_readFile($pagesfile, false));
		$users_last = unserialize(io_readFile($usersfile_last, false));
		$pages_last = unserialize(io_readFile($pagesfile_last, false));
		if (!$users || !$pages) return [];
		$users['platform'] = $sort_platforms ? $this->sort_platforms($users['platform']) : $users['platform'];
		$users_last['platform'] = $sort_platforms ? $this->sort_platforms($users_last['platform']) : $users_last['platform'];
		$statistics = [
			"page" => $pages_last['page'] ? array_merge($pages['page'], $pages_last['page']) : [],
			"country" => $users_last['country'],
			"platform" => array_merge($users_last['platform'], $users_last['platform']),
			"site_total" => $pages['site_total']
		];
		return $statistics;
	}


	/**
	 * Collect visitors over 12 months
	 *
	 * @return array
	 */
	public function get_year(): array
	{
		if (!$this->plugin_exists) return [];

		$year = $this->get_year_array();

		foreach ($year['year'] as $month) {
			$ns =  "quickstats:" . $month . ':';
			$pfile = metaFN($ns . 'pages', '.ser');

			$pdata = unserialize(io_readFile($pfile, false));
			$this->year[] = is_array($pdata) ? $pdata['site_total'] : 0;
		}
		return ['data' => $this->year, 'months' => $year['months']];
	}

	/**
	 * Return an array of the last 12 months
	 *
	 * @param boolean $include_current_month
	 * @return array
	 */
	private function get_year_array(bool $include_current_month = false): array
	{
		$months = $include_current_month ? [0 => date("n_Y")] : [];
		$month_num = $include_current_month ? [0 => date("n")] : [];
		$max = $include_current_month ? 11 : 12;
		for ($i = 1; $i <= $max; $i++) {
			array_unshift($months, date("n_Y", strtotime(date('Y-m-01') . " -$i months")));
			array_unshift($month_num, (int) date("n", strtotime(date('Y-m-01') . " -$i months")));
		}
		return ['year' => $months, 'months' => $month_num];
	}

	/**
	 * Get all hits since the start of the recording
	 *
	 * @return integer
	 */
	public function get_total(): int
	{
		$meta_path = $this->meta_file_path(true);
		$page_totals = unserialize(io_readFile($meta_path .  'page_totals.ser'));
		$page_accessesTotal = 0;
		if (!$page_totals) $page_totals = array();
		if (!empty($page_totals)) {
			foreach ($page_totals as $ttl) {
				$page_accessesTotal += $ttl;
			}
		}
		return $page_accessesTotal;
	}

	/**
	 * Helper function to return the file path of the meta directory
	 *
	 * @param boolean $directory
	 * @return string
	 */
	private function meta_file_path($directory = false): string
	{
		if ($directory) {
			return preg_replace('/quickstats.*$/', 'quickstats/', $this->script_file);
		}
		return $this->script_file;
	}

	/**
	 * Join Win98, WinXP, Win8.1, Win10 etc together into one "Windows" group
	 *
	 * @param array $platforms
	 * @return array
	 */
	private function sort_platforms(array | null $platforms): array
	{
		if (!$platforms) return [];
		$sorted = [];
		foreach ($platforms as $key => $value) {
			if (substr($key, 0, 3) == 'Win') {
				$sorted["Windows"] += $value;
				continue;
			}
			$sorted[$key] = $value;
		}
		return $sorted;
	}

	public function get_downloads()
	{
		global $conf;
		$opt = array('depth' => 0);
		$res = array(); // search result
		search($res, $conf['mediadir'], 'search_media', $opt);

		$extensions = ['zip', 'pdf', 'ppt', 'doc'];

		// prepare return array
		$result = [];
		foreach ($res as $item) {
			$file = [];
			if (!in_array(pathinfo($item['file'], PATHINFO_EXTENSION), $extensions)) {

				continue;
			}
			$file['extension'] = pathinfo($item['file'], PATHINFO_EXTENSION);
			$ns = explode(":", $item['id']);
			array_pop($ns);
			$file['ns'] = implode(":", $ns);
			$file['file'] = $item['file'];
			$file['id'] = $item['id'];
			$file['size'] = $item['size'];

			$downloads = p_get_metadata($item['id'], 'downloads');
			if (!$downloads) {
				$downloads = 0;
			}
			$file['downloads'] = $downloads;

			$file['last_download'] = p_get_metadata($item['id'], 'last_download');
			array_push($result, $file);
		}

		return $result;
	}

	public function download_counter()
	{
		global $conf;
		$opt = array('depth' => 0);
		$res = array(); // search result
		search($res, $conf['mediadir'], 'search_media', $opt);

		$extensions = ['zip', 'pdf', 'ppt', 'doc'];

		// prepare return array
		$result = 0;
		foreach ($res as $item) {

			$downloads = p_get_metadata($item['id'], 'downloads');
			if (!$downloads) {
				$downloads = 0;
			}
			$result += $downloads;
		}

		return $result;
	}
}
