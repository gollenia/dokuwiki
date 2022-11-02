<?php

namespace Contexis\Controllers;

use Contexis\Core\Controller;
use Contexis\Core\Utilities\Strings;
use Contexis\Database\Tag;
use dokuwiki\plugins\rest\Models\Page;

class Search extends Controller
{

	public $template = "search";
	private array $result = [];
	private array $ids = [];
	private $query;
	private array $categories = [];
	private array $tags = [];
	private array $audience = [];
	private array $search_template = ['id', 'title', 'abstract', 'pageimage', 'category', 'audience', 'tags', 'icon'];
	private string $didyoumean = "";

	public function __construct($site)
	{
		parent::__construct($site);
	}

	public function ajax_get($request)
	{
		header('Content-Type: application/json');
		header("Access-Control-Allow-Origin: *");

		global $INPUT;

		if (!key_exists('q', $_GET)) return json_encode(["items" => $this->result, "categories" => [], "didyoumean" => $this->didyoumean]);
		$this->query = $_GET['q'];

		$tags = Tag::getAllTags();

		if ($request->bool('fuzzy', true)) {
			$strings = explode(" ", $this->query);
			$results = [];
			foreach ($strings as $string) {
				$results[] = Strings::fuzzySearch($string, $tags);
			}
			$this->didyoumean = join(' ', $results);
		}

		//$this->getByTitle();
		$this->fillTags();
		$this->getPageLookups();
		$this->getPageSearch();

		return json_encode([
			"items" => $this->result,
			"categories" => $this->categories,
			"tags" => $this->tags,
			"audience" => $this->audience,
			"didyoumean" => strtolower($this->didyoumean) !== strtolower($this->query) ? ucfirst($this->didyoumean) : "",
			"query" => $this->query
		]);
	}

	public function ajax_fast()
	{
		header('Content-Type: application/json');
		header("Access-Control-Allow-Origin: *");

		global $INPUT;
		$query = $_GET['q'];
		$after = $INPUT->str('min');
		$before = $INPUT->str('max');
		$pageLookupResults = ft_pageLookup($query, true, useHeading('navigation'), $after, $before);
		$fullTextResults = ft_pageSearch($query . "*", $highlight, $INPUT->str('srt'), $after, $before);

		$result = [];
		$ids = [];

		// first the tags
		foreach (array_slice($pageLookupResults, 0, 4) as $key => $value) {
			if (substr($key, 0, 6) == 'system') continue;
			$result[] = ['id' => $key, 'title' => $value, 'abstract' => p_get_metadata($key, 'abstract') ?: '', 'type' => 'plr'];
			$ids[] = $key;
		}
		foreach (array_slice($fullTextResults, 0, 4) as $item => $res) {
			if (in_array($item, $ids)) continue;
			if (substr($item, 0, 6) == 'system') continue;
			$result[] = ['id' => $item, 'title' => p_get_metadata($item, 'title') ?: '', 'abstract' => p_get_metadata($key, 'abstract') ?: ''];
		}

		return json_encode(['result' => $result, 'more' => (count($pageLookupResults) > 4 || count($fullTextResults) > 4)]);
	}


	function fillTags()
	{

		$result = Page::where("tag", $this->get_query(), $this->search_template, true);
		foreach ($result as $key => $value) {
			if (!in_array($value['id'], $this->ids)) $this->ids[] = $value['id'];
			$this->add_taxonomy($value['id']);
		}

		$this->result = array_merge($this->result, $result);
	}

	function getByTitle()
	{
		$result = Page::where("title", $this->get_query(), $this->search_template, true);
		foreach ($result as $key => $value) {
			if (!in_array($value['id'], $this->ids)) $this->ids[] = $value['id'];
			$this->add_taxonomy($value['id']);
		}

		array_merge($this->result, $result);
	}


	function getPageLookups($max = 0)
	{
		$query = $this->get_query();
		$pageLookupResults = ft_pageLookup($query, true, useHeading('navigation'));

		foreach ($pageLookupResults as $id => $value) {
			if (in_array($id, $this->ids)) {
				continue;
			}
			$this->ids[] = $id;
			if (substr($id, 0, 6) == 'system') continue;
			$page = Page::find($id);
			array_push($this->result, $page->to_array($this->search_template));
			$this->add_taxonomy($id);
		}
	}

	function getPageSearch($withAsterisk = false)
	{
		$query = $this->get_query();
		$fullTextResults = ft_pageSearch($query . "*", $highlight);

		foreach ($fullTextResults as $id => $index) {
			if (in_array($id, $this->ids)) continue;
			if (substr($id, 0, 6) == 'system') continue;
			$this->ids[] = $id;
			$page = Page::find($id);
			$page = $page->to_array($this->search_template);
			$page['abstract'] = ft_snippet($id, $highlight);
			array_push($this->result, $page);
			$this->add_taxonomy($id);
		}
	}

	private function  get_query()
	{
		if (empty($this->didyoumean)) return $this->query;
		if (strtolower($this->query) == strtolower($this->didyoumean)) return $this->query;
		return $this->didyoumean;
	}

	private function add_taxonomy($id)
	{
		$this->add_category($id);
		$this->add_audience($id);
		$this->add_tags($id);
	}

	private function add_category($id)
	{
		$category = p_get_metadata($id, 'category') ?: '';
		if (empty($category) || in_array($category, $this->categories)) return;
		$this->categories[] = $category;
	}

	private function add_tags($id)
	{
		$tags = p_get_metadata($id, 'subject') ?: [];
		if (empty($tags)) return;
		foreach ($tags as $tag) {
			if (in_array($tag, $this->tags)) continue;
			$this->tags[] = $tag;
		}
	}

	private function add_audience($id)
	{
		$audience = p_get_metadata($id, 'audience') ?: '';
		if (empty($audience) || in_array($audience, $this->audience)) return;
		$this->audience[] = $audience;
	}
}
