/*
GET home page.
*/


(function() {
  exports.index = function(req, res) {
    return res.render("index", {
      title: "云信 - 最专业的互联网金融理财平台"
    });
  };

}).call(this);
