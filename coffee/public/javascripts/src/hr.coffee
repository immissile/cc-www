define (require) ->

  $ = require 'jquery'
  window.$ = $
  require 'bootstrap'

  require('wysiwyg')

  window.CC = {}

  $ ->
    $("#editor").wysiwyg()
