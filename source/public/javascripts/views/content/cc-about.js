(function() {
  define(function(require, exprots, module) {
    var $, Backbone, RES, ThisView, Util, common, tpl, _;
    $ = require('jquery');
    Backbone = require('backbone');
    _ = require('underscore');
    Util = require('../../common/util');
    common = require('../common');
    RES = require('../../common/res');
    tpl = require('../../../tpl/cc-about.tpl');
    ThisView = Backbone.View.extend({
      initialize: function() {
        this.common = common;
        this.render();
        return this.bindHover();
      },
      render: function() {
        var self;
        self = this;
        this.$el.html(_.template(tpl));
        this.common.removeSubBody();
        this.common.addAnimateText(this.$el);
        return this;
      },
      bindHover: function() {
        var timmer;
        timmer = null;
        return this.$el.find('td.ava').hover(function() {
          var $name, $title, h, margin, self, w, _content;
          self = $(this);
          w = self.width();
          h = self.height();
          self.removeClass('animated flipInY flipInX');
          self.addClass('animated ' + (self.hasClass('fli-x') ? 'flipInX' : 'flipInY'));
          $title = self.find('h3');
          $name = self.find('p');
          _content = $title.height() + $name.height();
          _content = 70;
          margin = (self.height() - _content) / 2;
          $title.css({
            marginTop: margin
          });
          return self.find('.ava-in').show();
        }, function() {
          var self;
          self = $(this);
          return timmer = setTimeout(function() {
            return self.removeClass('animated flipInX flipInY'.find('.ava-in').fadeOut());
          }, 200);
        });
      }
    });
    return module.exports = ThisView;
  });

}).call(this);
