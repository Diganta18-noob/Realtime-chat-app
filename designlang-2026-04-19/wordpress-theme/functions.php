<?php
if (!function_exists('designlang_theme_support')) {
  function designlang_theme_support() {
    add_theme_support('wp-block-styles');
    add_theme_support('editor-styles');
    add_theme_support('responsive-embeds');
  }
  add_action('after_setup_theme', 'designlang_theme_support');
}
