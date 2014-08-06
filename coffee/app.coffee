
###
Module dependencies.
App Interface
###

express = require("express")
http = require("http")
path = require("path")
app = express()

# all environments
app.set "port", process.env.PORT or 3000
app.set "views", path.join(__dirname, "views")
app.set "view engine", "jade"

# compress html or not
app.configure "development", ->
  app.use express.errorHandler()
  app.locals.pretty = true

app.use express.favicon()
app.use express.logger("dev")
app.use express.json()
app.use express.urlencoded()
app.use express.methodOverride()
app.use app.router
app.use(
  require("less-middleware")(
    src: path.join(__dirname, "public/less")
    dest: path.join(__dirname, "public/stylesheets")
    prefix: '/stylesheets'
    compress: false
  )
)
app.use express.static(path.join(__dirname, "public"))

# development only
app.use express.errorHandler()  if "development" is app.get("env")


routes = require("./routes")
detail = require("./routes/detail")
joinUs = require("./routes/joinUs")

# 首页
app.get "/", routes.index
app.get /^\/page-*?(?:\/(\d+)(?:\.\.(\d+))?)?/, routes.index
#app.get "/user*?", routes.index

# detail 
#app.get "/detail*?", detail.list

#joinUs
app.get "/joinUs.html", joinUs.index

http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")

