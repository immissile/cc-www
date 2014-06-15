define (require, exports, module) ->
  
  $ = require 'jquery'
  Backbone = require 'backbone'
  _ = require 'underscore'

  Util = require '../common/util'
  RES = require '../common/res'

  tpl = require '../../tpl/container.tpl'

  ThisView = Backbone.View.extend
    
    id: 'home-container'

    initialize: ->
      self = @
      @resize()
      @render()

      $(window).resize ->
        self.resize()

    resize: ->
      w = $('.header').height() + $('.footer').height()
      this.$el.height $(window).height() - w

    render: ->
      #@$el.css "background-image", "url(#{RES.home})"
      container = _.template tpl
      this.$el.html container

  module.exports = ThisView
