<?php

namespace Contexis\Models;

use DateTime;

class File
{

	public string $id;
	public string $path;
	public string $thumbnail;
	public string $src;
	public string $full;
	public string $filename;
	public int $size;
	public DateTime $modified;
	public string $count;
	public string $extension;
	public string $info;
	public bool $writable;
	public bool $minor_change = false;

	public function __construct($id)
	{
		$filename = mediaFN($id);

		if (!media_ispublic($id) && !file_exists($filename)) return false;

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
		$filename = mediaFN($id);

		if (!media_ispublic($id) && !file_exists($filename)) {
			return false;
		}

		return new self($id);
	}

	public static function create($ns)
	{
		$auth = auth_quickaclcheck(getNS($ns) . ':*');

		$upload = media_upload($ns, $auth);
		if ($upload) {
			return new self($ns . ":" . $upload);
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
	public static function findAll($ns, $excludes = "")
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
}
