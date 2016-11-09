
exports.index = function(req, res){
	
	var mongoose = require('mongoose');
	mongoose.Promise = global.Promise; //родные промисы
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	db.on('error', function () {
		res.send('not OK');
	});
	db.once('open', function() { 

		var Cat = mongoose.model('Cat', { name: String });

		var kitty = new Cat({ name: 'Zildjian' });
		kitty.save(function (err) {
		  if (err) {
		    console.log(err);
		  } else {
		    console.log('meow');
		  }
		});

		res.send('connection OK');
    });
};

