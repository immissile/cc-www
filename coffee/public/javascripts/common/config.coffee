seajs.config
  #base: 'sea-modules/'
  charset: 'utf-8'
  alias:
    'jquery': 'jquery/jquery/1.10.1/jquery'
    '$': 'jquery/jquery/1.10.1/jquery'
    'backbone': 'gallery/backbone/1.1.0/backbone'
    'underscore': 'gallery/underscore/1.5.2/underscore'
    'mustache': 'marketing/mustache/0.7.2/mustache'
    'easing': 'jquery/easing/1.3.0/easing'
  map: [
    [".js", ".js?" + new Date().getTime()]
  ]

if !window.console
  window.console =
    log: (x)->
      x
