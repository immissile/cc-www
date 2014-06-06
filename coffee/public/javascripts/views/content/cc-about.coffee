define (require, exprots, module) ->
  
  $ = require 'jquery'
  Backbone = require 'backbone'
  _ = require 'underscore'

  Util = require '../../common/util'
  common = require '../common'
  RES = require '../../common/res'

  tpl = require '../../../tpl/cc-about.tpl'

  ThisView = Backbone.View.extend

    initialize: ->
      @common = common
      @render()
      @bindHover()

    render: ->
      self = @
      @$el.html _.template tpl
      @common.removeSubBody()
      @common.addAnimateText @$el
      @

    bindHover: ->
      timmer = null
      @$el.find('td.ava').hover ->
        self = $(@)
        w = self.width()
        h = self.height()

        self.removeClass 'animated flipInY flipInX'

        self.addClass 'animated ' + (if self.hasClass 'fli-x' then 'flipInX' else 'flipInY')

        $title = self.find('h3')
        $name  = self.find('p')
        _content = $title.height() + $name.height()
        _content = 70
        margin = (self.height() - _content) / 2
        $title.css marginTop: margin

        # set ava-in position
        #$(self).find('.ava-in').css
        #  width: w
        #  height: h

        self.find('.ava-in').show()
      , ->
        self = $(@)
        timmer = setTimeout ->
          self.removeClass 'animated flipInX flipInY'
              .find('.ava-in')
              .fadeOut()
        , 200

  module.exports = ThisView
