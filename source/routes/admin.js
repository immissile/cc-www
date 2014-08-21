(function() {
  var Cooperation, User, access, hash, moment;

  moment = require("moment");

  access = require("../access");

  hash = require('../pass').hash;

  Cooperation = require("../models/cooperation");

  User = require("../models/user");

  exports.index = function(req, res) {
    if (!req.session.user) {
      res.redirect("/admin/login");
    }
    return Cooperation.fetch(function(err, cooperations) {
      if (err) {
        console.log(err);
      }
      return res.render("admin/index", {
        title: "管理后台 - 云中信",
        active: {
          cooperation: true
        },
        cooperations: cooperations,
        moment: moment
      });
    });
  };

  exports.setup = function(req, res) {
    if (req.session.user) {
      return res.redirect("/");
    } else {
      return User.findOne({}, function(err, user) {
        if (user) {
          req.session.error = "你没有setup权限";
          return res.redirect("/admin/login");
        } else {
          return res.render("admin/setup");
        }
      });
    }
  };

  exports.postSetup = function(req, res) {
    var name, password;
    name = req.body.name;
    password = req.body.password;
    return hash(password, function(err, salt, hash) {
      var _user;
      if (err) {
        throw err;
      }
      return _user = new User({
        name: name,
        admin: 1,
        salt: salt,
        hash: hash
      }).save(function(err, newUser) {
        if (err) {
          throw err;
        }
        return access.authenticate(newUser.name, password, function(err, user) {
          if (err) {
            res.render("admin/error", {
              msg: err
            });
          }
          if (user) {
            return req.session.regenerate(function() {
              req.session.user = user;
              req.session.success = "已登录 req.session.success=true";
              return res.redirect("/admin");
            });
          }
        });
      });
    });
  };

  exports.login = function(req, res) {
    return res.render("admin/login", {
      title: "登陆 - 云中信"
    });
  };

  exports.postLogin = function(req, res) {
    return access.authenticate(req.body.name, req.body.password, function(err, user) {
      if (user) {
        return req.session.regenerate(function() {
          req.session.user = user;
          req.session.success = "Login succ";
          return res.redirect("/admin");
        });
      } else {
        req.session.error = "账号或密码错误";
        return res.redirect("/admin/login");
      }
    });
  };

  exports.logout = function(req, res) {
    return req.session.destroy(function() {
      return res.redirect("/admin/login");
    });
  };

  exports.signup = function(req, res) {
    return res.render("admin/sign");
  };

  exports.deleteCooperation = function(req, res) {
    var id;
    id = req.query.id;
    if (id) {
      return Cooperation.remove({
        _id: id
      }, function(err, user) {
        if (err) {
          return console.log(err);
        } else {
          return res.json({
            success: 1
          });
        }
      });
    }
  };

  exports.hr = function(req, res) {
    return res.render("admin/hr", {
      title: "招聘相关",
      active: {
        hr: true
      },
      cooperations: []
    });
  };

}).call(this);
