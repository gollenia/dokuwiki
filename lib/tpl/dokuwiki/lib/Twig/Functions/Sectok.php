<?php

namespace Contexis\Twig\Functions;

use Contexis\Twig\CustomFunctions;
use dokuwiki\Extension\Event;

class Sectok extends CustomFunctions {

    public string $name = "tpl_sectok";

    public function render($id = null) {
       return getSecurityToken();
    }

}