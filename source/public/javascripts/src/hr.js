(function() {
  define(function(require) {
    var $;
    $ = require('jquery');
    window.$ = $;
    require('bootstrap');
    require('wysiwyg');
    window.CC = {};
    return $(function() {
      return $("#editor").wysiwyg();
    });
  });

}).call(this);
