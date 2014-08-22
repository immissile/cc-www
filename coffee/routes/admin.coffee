# 管理后台
moment = require("moment")
access = require("../access")
hash = require('../pass').hash

Cooperation = require("../models/cooperation")
User = require("../models/user")

exports.index = (req, res) ->
  if !req.session.user
    res.redirect "/admin/login"

  Cooperation.fetch (err, cooperations) ->
    if err
      console.log err
    
    res.render "admin/index",
      title: "管理后台 - 云信"
      active:
        cooperation: true
      cooperations: cooperations
      moment: moment

exports.setup = (req, res) ->
  if req.session.user
    res.redirect "/"
  else
    User.findOne {}, (err, user) ->
      if user
        req.session.error = "你没有setup权限"
        res.redirect "/admin/login"
      else
        res.render "admin/setup"

exports.postSetup = (req, res) ->
  name = req.body.name
  password = req.body.password

  hash password, (err, salt, hash) ->
    if err
      throw err
    _user = new User
      name: name
      admin: 1
      salt: salt
      hash: hash
    .save (err, newUser) ->
      if err
        throw err
      access.authenticate newUser.name, password, (err, user) ->
        if err
          res.render "admin/error",
            msg: err
        if user
          req.session.regenerate ->
            req.session.user = user
            req.session.success = "已登录 req.session.success=true"
            res.redirect "/admin"

exports.login = (req, res) ->
  res.render "admin/login",
    title: "登陆 - 云信"

exports.postLogin = (req, res) ->
  access.authenticate req.body.name, req.body.password, (err, user) ->
    if user
      req.session.regenerate ->
        req.session.user = user
        req.session.success = "Login succ"
        res.redirect "/admin"
    else
      req.session.error = "账号或密码错误"
      res.redirect "/admin/login"

exports.logout = (req, res) ->
  req.session.destroy ->
    res.redirect "/admin/login"

exports.signup = (req, res) ->
  res.render "admin/sign"

exports.deleteCooperation = (req, res) ->
  id = req.query.id
  if id
    Cooperation.remove
      _id: id
    , (err, user) ->
      if err
        console.log err
      else
        res.json
          success: 1
  

exports.hr = (req, res) ->
  res.render "admin/hr",
    title: "招聘相关"
    active:
      hr: true
    cooperations: []
