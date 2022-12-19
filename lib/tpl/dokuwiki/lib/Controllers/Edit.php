<?php

namespace Contexis\Controllers;

use Contexis\Core\Controller;
use Contexis\Core\ControllerInterface;
use dokuwiki\plugins\rest\Models\Page;
use Contexis\Twig\Renderer;
use \dokuwiki\Input\Input;


class Edit extends Controller implements ControllerInterface
{

	public function __construct($site)
	{
		parent::__construct($site);
	}

	public function render()
	{
		global $ID;
		global $conf;
		$this->site->add_data('page', Page::find($ID));
		$this->site->add_data('site', [
			"tags" => rawWiki("system:tags"),

			"audience" => page_exists('system:audience') ? rawWiki('system:audience') : [],
			"bible" => ["books" => \dokuwiki\plugin\bible\Book::findAll($conf['lang']), "info" => \dokuwiki\plugin\bible\Bible::info($conf['lang'])]
		]);

		echo Renderer::compile("pages/edit.twig", $this->site->get());
	}

	public function ajax_get(Input $request)
	{
		$page = Page::findOrNew($request->str("id", ""));
		if (!$page) {
			return json_encode(["error" => "No ID given"]);
		}
		return json_encode($page->get());
	}

	public function ajax_save(Input $request)
	{

		$data = json_decode(file_get_contents('php://input'), true);
		if (!array_key_exists('id', $data)) return false;
		$page = Page::findOrNew($data['id']);
		$page->content = cleanText($data['content']);
		$page->abstract = cleanText($data['abstract']);
		$page->tags = is_array($data['tags']) ? $data['tags'] : [];
		$page->pageimage = cleanText($data['pageimage']);
		$page->category = cleanText($data['category']);
		$page->pagelink = cleanText($data['pagelink']);
		$page->icon = strtolower(str_replace(" ", "_", cleanText($data['icon'])));
		$page->exclude = cleanText($data['exclude']);
		$page->title = cleanText($data['title']);
		$page->audience = cleanText($data['audience']);
		$page->showSubpages = cleanText($data['showSubpages']);
		$result = $page->save();
		return json_encode(['request' => $_GET, 'page' => $result]);
	}

	public function ajax_list(Input $request)
	{
		$id = $request->str("id", ":");
		$page = Page::getFlatTree($id);
		return json_encode($page);
	}

	public function ajax_tree(Input $request)
	{
		$id = $request->str("id", "");
		$current_id = $request->str("current_id", "");
		
		$pageTree = Page::getTree($id, "bibel,bible,system", $current_id);
		return json_encode($pageTree);
	}

	public function ajax_delete(Input $request)
	{
		$id = $request->str("id", "");
		$page = Page::find($id);
		$page->delete();
	}

	public function ajax_site()
	{
		global $INFO;
		global $conf;
		header('Content-Type: application/json');
		header("Access-Control-Allow-Origin: *");

		return json_encode([
			"tags" => page_exists('system:tags') ? rawWiki("system:tags") : '[]',
			"categories" => page_exists('system:categories') ? rawWiki('system:categories') : '[]',
			"audience" => page_exists('system:audience') ? rawWiki('system:audience') : ['sdfdf'],
			"bible" => ["books" => \dokuwiki\plugin\bible\Book::findAll($conf['lang']), "info" => \dokuwiki\plugin\bible\Bible::info($conf['lang'])]
		]);
	}
}
