/*
GET users listing.
*/


(function() {
  exports.list = function(req, res) {
    return res.render('index', {
      title: '### users page'
    });
  };

}).call(this);
