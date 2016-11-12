//require('es6-promise').polyfill();
const _ = require('lodash');
require('isomorphic-fetch');

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

async function getPC(url) {
	const response = await fetch(url);
	if (response.status >= 400 ) throw Error('can not get PC');
	return response.json();
}

function getProperty(obj, property) {
	if (obj.hasOwnProperty(property)) {
		console.log('returning property')
		return obj[property];
	}
	else {
		return undefined;
	}
}

exports.index = async function(req, res){

	const pc = await getPC(pcUrl);
	let result = pc;
	let i = 0;
	
	let params = req.path.substring(4);
	
	if(params[params.length - 1] === '/') {params = params.substring(0,params.length-1);}
	params = params.split('/');
	
	if(params.length === 1 && params[0].length === 0) {
		console.log('here')
		res.send(result);
		return 0;
	}

	if(params.length === 1 && params[0] === 'volumes') {
		const disks = _.groupBy(pc.hdd, 'volume');
		let diskSum = 0;
		let resDisks = {};
		for(let diskName in disks) {
			//console.log(diskName);
			//console.log(disks[diskName]);
			//sum = disks[diskName].reduce((total, n) => (total + disks[diskName].size), 0);
			let sum = 0;
			_.forEach(disks[diskName], function (elem) {
				sum += elem.size;//console.log(elem);
			});
			resDisks[diskName] = sum + 'B';
			console.log(sum);
		}
		//console.log(Object.keys(disks));
		res.json(resDisks);
		return 0;
	}


	try {
		for(i = 0; i < params.length; i++) {
			if(result[params[i]] === undefined) throw Error('wrong properties');
			result = result[params[i]];
		}
	}
	catch(err) {
		console.log('something is wrong ' + err);
		res.status(404).send('Not found')
		return -1;

	}

	

	res.json(result); 



	  
};
