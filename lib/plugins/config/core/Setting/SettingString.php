<?php

namespace dokuwiki\plugin\config\core\Setting;

/**
 * Class setting_string
 */
class SettingString extends Setting
{
	/** @inheritdoc */
	public function html(\admin_plugin_config $plugin, $echo = false)
	{
		$disable = '';


		if ($this->isProtected()) {
			$value = $this->protected;
			$disable = 'disabled="disabled"';
		} else {
			if ($echo && $this->error) {
				$value = $this->input;
			} else {
				$value = is_null($this->local) ? $this->default : $this->local;
			}
		}

		$key = htmlspecialchars($this->key);
		$value = htmlspecialchars($value);

		$danger = $this->get_danger();


		$label = '<label for="config___' . $key . '">' . $this->prompt($plugin) . '</label>';
		$input = '<div class="input-group"><input id="config___' . $key . '" name="config[' . $key .
			']" type="' . $this->type . '" class="form-control ' . ($this->code ? 'font-monospace' : '') . '" value="' . $value . '" ' . $disable . ' placeholder="' . $this->placeholder . '"/>' . $danger . '</div>';
		return array($label, $input);
	}
}
