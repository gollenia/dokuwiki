<?php

namespace Contexis\Database;

class Meta
{

	public static function get($id, $key, $default = NULL)
	{
		return p_get_metadata($id, $key) ?? $default;
	}
}
