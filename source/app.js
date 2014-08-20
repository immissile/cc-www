/*
Module dependencies.
App Interface
*/


(function() {
  var Cooperation, access, admin, app, cooperation, detail, express, http, joinUs, mongoose, path, routes;

  express = require("express");

  http = require("http");

  path = require("path");

  mongoose = require("mongoose");

  Cooperation = require("./models/cooperation");

  app = express();

  mongoose.connect('mongodb://127.0.0.1:27017/imooc');

  access = require("./access");

  app.set("port", process.env.PORT || 3000);

  app.set("views", path.join(__dirname, "views"));

  app.set("view engine", "jade");

  app.use(express.bodyParser());

  app.use(express.cookieParser('Authentication Tutorial '));

  app.use(express.session());

  app.configure("development", function() {
    app.use(express.errorHandler());
    return app.locals.pretty = false;
  });

  app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));

  app.use(express.logger("dev"));

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(express.methodOverride());

  app.use(function(req, res, next) {
    var err, msg;
    err = req.session.error;
    msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.user = req.session.user;
    res.locals.error = err;
    return next();
  });

  app.use(app.router);

  app.use(require("less-middleware")({
    src: path.join(__dirname, "public/less"),
    dest: path.join(__dirname, "public/stylesheets"),
    prefix: '/stylesheets',
    compress: true
  }));

  app.use(express["static"](path.join(__dirname, "public")));

  if ("development" === app.get("env")) {
    app.use(express.errorHandler());
  }

  routes = require("./routes");

  detail = require("./routes/detail");

  joinUs = require("./routes/joinUs");

  cooperation = require("./routes/cooperation");

  admin = require("./routes/admin");

  app.get("/", routes.index);

  app.get(/^\/page-*?(?:\/(\d+)(?:\.\.(\d+))?)?/, routes.index);

  app.get("/cooperation", cooperation.index);

  app.post("/cooperation/new", cooperation["new"]);

  app.get("/cooperation/succ", cooperation.succ);

  app.get("/admin", access.requiredAuthentication, admin.index);

  app.get("/admin/login", admin.login);

  app.post("/admin/login", admin.postLogin);

  app.get("/admin/logout", admin.logout);

  app.get("/admin/setup", admin.setup);

  app.post("/admin/setup", access.userExist, admin.postSetup);

  app.get("/joinUs.html", joinUs.index);

  http.createServer(app).listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });

}).call(this);
