
###
GET home page.
###
exports.index = (req, res) ->
    res.render "index",
        title: "云信 - 最专业的互联网金融理财平台"

