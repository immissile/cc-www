/*
GET joinUs page.
*/


(function() {
  exports.index = function(req, res) {
    return res.render("joinUs", {
      title: "加入我们"
    });
  };

}).call(this);
