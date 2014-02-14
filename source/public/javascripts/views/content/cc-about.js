(function() {
  define(function(require, exprots, module) {
    var $, Backbone, RES, ThisView, Util, tpl, _;
    $ = require('jquery');
    Backbone = require('backbone');
    _ = require('underscore');
    Util = require('../../common/util');
    RES = require('../../common/res');
    tpl = require('../../../tpl/cc-about.tpl');
    ThisView = Backbone.View.extend({
      initialize: function() {
        return this.render();
      },
      render: function() {
        this.$el.html(_.template(tpl));
        return this;
      }
    });
    return module.exports = ThisView;
  });

}).call(this);