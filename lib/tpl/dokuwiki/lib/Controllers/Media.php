<?php

namespace Contexis\Controllers;

use \dokuwiki\Input\Input;
use dokuwiki\plugins\rest\Models\Page;
use dokuwiki\plugins\rest\Models\File;


class Media
{

	function ajax_upload($response)
	{
		$file = File::create($response->str('id', ':'));
		return json_encode($file);
	}

	function ajax_sectok($response)
	{
		return json_encode(getSecurityToken());
	}

	function ajax_list($request)
	{
		global $conf;

		$ns = cleanID($request->str('ns', 'none'));
		$sort = $request->str('sort', 'natural');


		return json_encode(File::findAll($ns, '', $sort));
	}

	function ajax_get($request)
	{
		$file = File::find($request->str('id', ''));
		return json_encode($file->get());
	}

	function ajax_first()
	{
		global $conf;
		global $INPUT;

		$id = $INPUT->str('id', 'none');
		$references = p_get_metadata($id, 'relation');
		$image = $references['firstimage'];
		return json_encode($references);
	}

	public function ajax_tree(Input $request)
	{
		$id = $request->str('id', "");
		$pageTree = Page::getTree($id, false, "bibel,system");
		return json_encode($pageTree);
	}

	public function ajax_delete(Input $request)
	{
		$id = $request->str('id', "");
		$file = File::find($id);
		return json_encode($file->delete());
	}

	public function ajax_rename(Input $request)
	{
		$id = $request->str('id', "");
		$name = $request->str('name', "");
		$file = File::find($id);
		return json_encode($file->rename($name));
	}
}
