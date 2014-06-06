/*
GET home page.
*/


(function() {
  exports.index = function(req, res) {
    return res.render("index", {
      title: "init index page...",
      user: {
        id: 112233,
        name: 'Missile',
        age: 25,
        phone: 18611542131,
        nickname: '一地鸡毛'
      }
    });
  };

}).call(this);
