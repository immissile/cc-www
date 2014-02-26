(function() {
  define(function(require, exprots, module) {
    var $, Backbone, RES, ThisView, Util, common, tpl, tpl_a, tpl_b, tpl_c, _;
    $ = require('jquery');
    Backbone = require('backbone');
    _ = require('underscore');
    Util = require('../../common/util');
    common = require('../common');
    RES = require('../../common/res');
    tpl = require('../../../tpl/products-operations.tpl');
    tpl_a = require('../../../tpl/detail-products-oper-1.tpl');
    tpl_b = require('../../../tpl/detail-products-oper-2.tpl');
    tpl_c = require('../../../tpl/detail-products-oper-3.tpl');
    ThisView = Backbone.View.extend({
      initialize: function() {
        this.common = common;
        return this.render();
      },
      events: {
        'click li': 'detail'
      },
      render: function() {
        var self;
        self = this;
        this.$el.html(_.template(tpl));
        this.$el.addClass('oper-bg-1');
        this.common.removeSubBody();
        setTimeout(function() {
          var $text;
          $text = self.$el.find('.animate-text');
          $text.css({
            left: '10%'
          });
          return $text.addClass('animated');
        }, 1000);
        return this;
      },
      detail: function(e) {
        var $this, self, view;
        $this = $(e.currentTarget);
        self = this;
        view = $this.data('view');
        return this.renderDetail(view);
      },
      renderDetail: function(view) {
        var $detail, $section, _tpl;
        $section = $('.sub-section');
        $detail = $section.find('.detail-page');
        switch (view) {
          case 'tech-a':
            _tpl = tpl_a;
            break;
          case 'tech-b':
            _tpl = tpl_b;
            break;
          case 'tech-c':
            _tpl = tpl_c;
        }
        $section.append(_tpl);
        $('.detail-page').addClass('animated moveInRight');
        $('button.hide-detail').hover(function() {
          return $(this).addClass('animated pulse');
        }, function() {
          return $(this).removeClass('animated pulse');
        });
        return $('button.hide-detail').bind('click', function() {
          $('.detail-page').removeClass('moveInRight').addClass('moveOutRight');
          return setTimeout(function() {
            return $('.detail-page').remove();
          }, 1000);
        });
      }
    });
    return module.exports = ThisView;
  });

}).call(this);
