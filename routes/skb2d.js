//require('es6-promise').polyfill();
require('isomorphic-fetch');

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

async function getPC(url) {
	const response = await fetch(url);
	if (response.status >= 400 ) throw Error('can not get PC');
	return response.json();
}

exports.index = async function(req, res){

	const pc = await getPC(pcUrl);
	let result = pc;
	let i = 0;
	
	const params = req.path.substring(4).split("/");
	
	if(params.length === 0 && params[0].length === 0) {
		res.send(pc)
	}

	try {
		for(i = 0; i < params.length; i++) {
			result = result[params[i]];
		}
	}
	catch(err) {
		console.log('something is wrong' + err);

	}

	console.log(result);

	res.send(result);	

	  
};
