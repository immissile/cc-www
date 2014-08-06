/*
Module dependencies.
App Interface
*/


(function() {
  var app, detail, express, http, joinUs, path, routes;

  express = require("express");

  http = require("http");

  path = require("path");

  app = express();

  app.set("port", process.env.PORT || 3000);

  app.set("views", path.join(__dirname, "views"));

  app.set("view engine", "jade");

  app.configure("development", function() {
    app.use(express.errorHandler());
    return app.locals.pretty = true;
  });

  app.use(express.favicon());

  app.use(express.logger("dev"));

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(express.methodOverride());

  app.use(app.router);

  app.use(require("less-middleware")({
    src: path.join(__dirname, "public/less"),
    dest: path.join(__dirname, "public/stylesheets"),
    prefix: '/stylesheets',
    compress: false
  }));

  app.use(express["static"](path.join(__dirname, "public")));

  if ("development" === app.get("env")) {
    app.use(express.errorHandler());
  }

  routes = require("./routes");

  detail = require("./routes/detail");

  joinUs = require("./routes/joinUs");

  app.get("/", routes.index);

  app.get(/^\/page-*?(?:\/(\d+)(?:\.\.(\d+))?)?/, routes.index);

  app.get("/joinUs.html", joinUs.index);

  http.createServer(app).listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });

}).call(this);
