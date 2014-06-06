(function() {
  define(function(require, exports, module) {
    var $, Backbone, ThisView, Util, tpl, tpl_about, tpl_contact, tpl_joinus, _;
    $ = require('jquery');
    Backbone = require('backbone');
    _ = require('underscore');
    Util = require('../../common/util');
    tpl = require('../../../tpl/more.tpl');
    tpl_about = require('../../../tpl/about.tpl');
    tpl_contact = require('../../../tpl/contact.tpl');
    tpl_joinus = require('../../../tpl/joinus.tpl');
    ThisView = Backbone.View.extend({
      initialize: function() {
        this.render();
        return this.bindActions();
      },
      events: {
        'click .more-close': 'close',
        'click .more-detail': 'detail'
      },
      render: function() {
        var $content, self;
        self = this;
        this.$el.html(_.template(tpl));
        $content = self.$el.find('.more-content');
        $content.css({
          marginTop: 0
        });
        $content.addClass('animated bounceInDown');
        this.$el.animate({
          opacity: 1
        }, 300);
        return this;
      },
      bindActions: function() {
        return this.$el.find('.more-close').hover(function() {
          return $(this).addClass('animated pulse');
        }, function() {
          return $(this).removeClass('animated pulse');
        });
      },
      close: function() {
        var $content, self;
        self = this;
        this.$el.animate({
          opacity: 0
        }, 1000);
        $content = this.$el.find('.more-content');
        $content.removeClass('bounceInDown');
        $content.addClass('bounceOutUp');
        return setTimeout(function() {
          return self.$el.remove();
        }, 1000);
      },
      detail: function(e) {
        var $this, view;
        $this = $(e.currentTarget);
        view = $this.data('view');
        return this.renderDetail(view);
      },
      renderDetail: function(view) {
        var _tpl;
        switch (view) {
          case 'about':
            _tpl = tpl_about;
            break;
          case 'contact':
            _tpl = tpl_contact;
            break;
          case 'joinus':
            _tpl = tpl_joinus;
        }
        this.$el.append(_tpl);
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
