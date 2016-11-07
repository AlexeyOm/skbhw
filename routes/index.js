
// exports.index = function(req, res){
	
// 		let a = 0;
// 		let b = 0;
// 		if (!isNaN(req.query.a)) {a = Number(req.query.a);}
// 		if (!isNaN(req.query.b)) {b = Number(req.query.b);}
// 		console.log(a.toString());
// 		console.log(b.toString());
// 		const sum = a + b;
// 		res.send(sum.toString());	

	  
// };

var S = require('string');

exports.index = function(req, res){
    S.extendPrototype();
    const fullname = req.query.fullname.collapseWhitespace();
	const badCharecters = /[0-9_/]/;
	if(badCharecters.test(fullname)) {res.send('Invalid fullname'); return;}
    if(fullname.length === 0) {res.send('Invalid fullname'); return;}
    let otchname = '', name = '', surname = '';
    let result = '';
	const chunks = fullname.split(" ");
	if (chunks.length > 3 || chunks.length === 0) {res.send('Invalid fullname'); return;};
	surname = chunks.pop();
	result = surname.capitalize();
	if (chunks.length > 0 ) {name = chunks.shift().substr(0,1) + '.'; result += ' ' + name.capitalize();}
	if (chunks.length > 0 ) {otchname = chunks.pop().substr(0,1) + '.'; result += ' ' + otchname.capitalize();}
	
	console.log('got #' + result + '# from #' + req.query.fullname);
	
	S.restorePrototype(); //be a good citizen and clean up
	
	res.send(result.toString());

};

