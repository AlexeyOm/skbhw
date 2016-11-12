
exports.index = function(req, res){
		let result = '';
		console.log('==>' + req.query.username);
		if (req.query.username == undefined ) {res.send ('invalid username');}
		let inp = '/' + req.query.username + '?' ;
		//lets parse special sites
		if (inp.match(/github.com\//)) {
			inp += '/';
			inp = inp.substring(inp.indexOf('github.com') + 11, inp.indexOf('/', inp.indexOf('github.com') + 12));
		}
		if (inp.match(/vk.com\//)) {
			inp += '/';
			inp = inp.substring(inp.indexOf('vk.com') + 7, inp.indexOf('/', inp.indexOf('vk.com') + 8));
			console.log('entered vk.com branch');
		}
		if (inp.match(/medium.com\//)) {
			inp += '/';
			inp = inp.substring(inp.indexOf('medium.com') + 11, inp.indexOf('/', inp.indexOf('medium.com') + 12));
		}
		



		inp = '/' + inp + '?' ;
		console.log(inp);
		let extract = inp.match(/(\/|@)([a-zA-Z-._]+?)\?/);
		if (!extract) {res.send ('invalid username');}
		console.log(extract);
		
		//let result = extract[0] !== '@' ? extract : '@' + extract[extract.length-1].toString()
		//if (extract[extract.length-1][0] === '@') {result = }

		result = '@' + extract[extract.length-1].toString();

		res.send(result);	

	  
};
