<?php

namespace dokuwiki\plugins\rest\Models;

use DateTime;

class File
{

	public string $id;
	public string $path;
	public string $thumbnail;
	public string $src;
	public string $filename;
	public int $size;
	public DateTime $modified;
	public string $count;
	public string $extension;
	public bool $exists = false;
	public bool $private = false;
	public string $info;
	public bool $writable;
	public bool $minor_change = false;

	public function __construct($id)
	{
		$filename = mediaFN($id);

		$this->private = media_ispublic($id);

		if (!file_exists($filename)) {
			return;
		}

		$this->exists = true;
		$this->id = $id;
		$this->path = $filename;
		$this->filename = pathinfo($filename, PATHINFO_BASENAME);
		$this->modified = DateTime::createFromFormat('U', filemtime($filename));
		$this->writable = is_writable($filename);
		$this->size = filesize($filename);
		$this->extension = pathinfo($filename, PATHINFO_EXTENSION);
		$this->src = ml($id);
		$this->count = p_get_metadata($id, 'downloads') ?: 0;
		$this->thumbnail = in_array(strtolower($this->extension), ['jpg', 'jpeg', 'png']) ? ml($id, ['w' => 600, 'h' => 0]) : "";
		return $this;
	}

	/**
	 * Find a single file by its id
	 *
	 * @param string $id ID of the media file
	 * @return Contexis\Models\Media Media Object
	 */
	public static function find(string $id): File
	{
		return new self($id);
	}

	public static function create($ns)
	{
		$auth = auth_quickaclcheck(getNS($ns) . ':*');

		$upload = media_upload($ns, $auth);
		if ($upload) {
			return $upload;
		}

		return $upload;
	}

	/**
	 * Get full page Object including all meta data
	 *
	 * @return array Page Data
	 */
	public function get()
	{
		return get_object_vars($this);
	}

	public function delete()
	{
		global $INFO;
		$id = $this->id;
		$delete = media_delete($id, $INFO['perm']);
		if ($delete === 1) {
			return "deleted";
		}
		return $this->file . " not deleted " . $delete;
	}

	/**
	 * Get list of files in a namespace and filter them by a wildcard pattern
	 *
	 * @param string $ns
	 * @param string $excludes 
	 * @return array List of files
	 */
	public static function findAll($ns, $excludes = "", $sort = 'natural')
	{
		global $conf;

		if (auth_quickaclcheck("$ns:*") < AUTH_READ) {
			return false;
		}

		$dir = utf8_encodeFN(str_replace(':', '/', $ns));
		$data = [];
		search($data, $conf['mediadir'], 'search_media', ['showmsg' => false, 'depth' => 1], $dir, 1, $sort);

		$result = [];

		foreach ($data as $item) {
			$file = self::find($item['id']);

			if (fnmatch($excludes, $item['file'])) {
				continue;
			}
			array_push($result, $file->get());
			unset($file);
		}

		return $result;
	}


	/**
	 * @param mixed $ns 
	 * @param string $filter 
	 * @return false|array 
	 */
	public static function findAllByWildcard($ns, $filter = "*.*")
	{
		global $conf;

		if (auth_quickaclcheck("$ns:*") < AUTH_READ) {
			return false;
		}

		$dir = utf8_encodeFN(str_replace(':', '/', $ns));
		$data = [];
		search($data, $conf['mediadir'], 'search_media', ['showmsg' => false, 'depth' => 1], $dir);

		$result = [];

		foreach ($data as $item) {
			$file = self::find($item['id']);

			if (fnmatch($filter, $item['file'])) {
				array_push($result, $file->get());
			}
			unset($file);
		}

		return $result;
	}

	public function statistics()
	{
	}

	/**
	 * Move file to new place
	 *
	 * @param [type] $ns
	 * @return void
	 */
	public function move($ns)
	{
	}

	public function rename($name)
	{

		$old = $this->path;
		$new = pathinfo($this->path, PATHINFO_DIRNAME) . '/' . $name;
		if (!rename($old, $new)) return;

		$oldmeta = $this->getMetaFile();
		$newmeta = pathinfo($oldmeta, PATHINFO_DIRNAME) . '/' . $name . '.' . pathinfo($oldmeta, PATHINFO_EXTENSION);
		if (!file_exists($oldmeta)) return "no old meta found";
		rename($oldmeta, $newmeta);
		return true;
	}

	function getMetaFile()
	{
		global $conf;
		$id = cleanID($this->id);
		$id = str_replace(':', '/', $id);
		return $conf['metadir'] . '/' . utf8_encodeFN($id) . '.meta';
	}
}
