
###
GET home page.
###
exports.index = (req, res) ->
    res.render "index",
        title: "init index page..."
        user:
          id: 112233
          name: 'Missile'
          age: 25
          phone: 18611542131
          nickname: '一地鸡毛'

