<?php

namespace Contexis\Twig;

use Contexis\Twig\CustomFunctions;
use Contexis\Twig\CustomFilters;

use Twig\Extra\String\StringExtension;

use Twig\{
	Loader\FilesystemLoader,
	Environment
};


class Renderer
{



	static function compile($filenames, $data, $options = [])
	{
		global $conf;
		$loader = new FilesystemLoader(tpl_incdir() . './templates');
		$twig = new Environment($loader, $options);
		$twig->addExtension(new StringExtension());
		CustomFunctions::register($twig);
		CustomFilters::register($twig);


		return $twig->render($filenames, $data);
	}

	static function compile_string(string $template, array $data)
	{
		$loader = new \Twig\Loader\ArrayLoader([
			'index.html' => $template,
		]);

		$twig = new Environment($loader);
		$twig->addExtension(new StringExtension());
		CustomFunctions::register($twig);
		CustomFilters::register($twig);

		return $twig->render('index.html', $data);
	}
}
