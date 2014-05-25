
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.resume = function(req, res){
  res.render('resume');
};
exports.headshots = function(req, res){
  res.render('headshots');
};

exports.videos = function(req, res){
  res.render('videos');
};

exports.photos = function(req, res){
  res.render('photos');
};

