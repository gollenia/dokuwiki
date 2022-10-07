let mix = require('laravel-mix');

mix.js('resources/js/main.js', 'public/js')

mix.sass('resources/scss/main.scss', 'public/admin.css');

mix.js('resources/js/editor.js', 'public/js').vue();
mix.js('resources/js/map.js', 'public/js');


