define (require, exports, module) ->
  
  $ = require 'jquery'
  Backbone = require 'backbone'
  _ = require 'underscore'

  Util = require '../../common/util'
  common = require '../common'

  tpl = require '../../../tpl/page.tpl'

  ThisView = Backbone.View.extend

    sHeader: null
    
    initialize: (e)->
      @currentView = e.currentView
      if $('.s-header').length <= 0
        @$el.addClass 'animated slow'
      else
        @sHeader = true
      @common = common
      @render()

    render: ->
      self = @
      $wrapper = $('.wrapper')
      @$el.html tpl
      if @sHeader
        @$el.find('.sub-page').addClass 'animated slow'
      
      HeaderView = require '../header/s-header'
      headerView = new HeaderView el: $("header.s-header")

      SubHeaderView = require '../header/sub-header'
      subHeaderView = new SubHeaderView el: $('.sub-header')
      @$el.find("li[data-view=#{@currentView}]").addClass 'active'

      switch @currentView
        when 'cc'
        then self.renderCreditcloud()

        when 'products'
        then self.renderProducts()
        
        when 'customers'
        then self.renderCustomers()


      #ANIMATION = 'slideInUp'
      ANIMATION = 'fadeInUpBig'

      if @sHeader
        @$el.find('.sub-page').css({top:0}).addClass ANIMATION
      else
        @$el.css({top:0}).addClass ANIMATION

      @common.removeWrapper()

      # set container
      h_h = $('.s-header').height()
      h_s = $('.sub-header').height()
      $('.sub-page').height $(window).height() - h_h - h_s

      #set container-in
      console.log '~~~~', $('.sub-footer').height()
      $('.container-in').height($('.sub-page').height() - 70)

    renderCreditcloud: ->
      self = @

      ContainerView = require '../content/cc-about'
      containerView = new ContainerView el: $('.sub-body:last')

      setTimeout ->
        CcFooterView = require '../footer/cc-footer'
        ccFooterView = new CcFooterView el: $('.sub-footer')
      , 300

    renderProducts: ->
      self = @

      ContainerView = require '../content/products-site'
      containerView = new ContainerView el: $('.sub-body:last')

      setTimeout ->
        FooterView = require '../footer/products-footer'
        footerView = new FooterView el: $('.sub-footer')
      , 300

    renderCustomers: ->
      self = @

      ContainerView = require '../content/customers-evaluate'
      containerView = new ContainerView el: $('.sub-body:last')

      setTimeout ->
        FooterView = require '../footer/customers-footer'
        footerView = new FooterView el: $('footer.sub-footer')
      , 300

  module.exports = ThisView
