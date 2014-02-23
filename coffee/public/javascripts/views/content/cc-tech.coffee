define (require, exprots, module) ->
  
  $ = require 'jquery'
  Backbone = require 'backbone'
  _ = require 'underscore'

  Util = require '../../common/util'
  common = require '../common'
  RES = require '../../common/res'

  tpl = require '../../../tpl/cc-tech.tpl'

  ThisView = Backbone.View.extend

    initialize: ->
      @common = common
      @render()

    events:
      'click button': 'button'

    render: ->
      @$el.html _.template tpl
      @common.removeSubBody()
      @

    button: ->
      alert 'tech'

  module.exports = ThisView
