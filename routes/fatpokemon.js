require('es6-promise').polyfill();
require('isomorphic-fetch');
var _ = require('lodash');

const baseUrl = 'http://pokeapi.co/api/v2/pokemon/';

async function getPokemonCount(url) {
	const response = await fetch(url + '?limit=1');
	if (response.status >= 400 ) throw Error('can not get pokemon count');
	let count = await response.json();
	count = count.count;
	return count;
}

async function getAllPokemonLink(url, number) {
	const response = await fetch(url + '?limit=' + number);
	if (response.status >= 400 ) throw Error('can not get all pokemos link');
	let result = await response.json();
	result = result.results;
	return result;
}

async function getPokemonInfo(url) {
	const response = await fetch(url);
	if (response.status >= 400 ) throw Error('can not fetch pokemon data at ' + url);
	return response.json();
}

 

exports.index = async function(req, res){
	try {
		const numOfPokemons = await getPokemonCount(baseUrl);

		const allPokemonLink = await getAllPokemonLink(baseUrl, numOfPokemons);
		
		allPokemonLink.forEach(elem => {
			console.log(elem.url);
		});
		//console.log(allPokemonLink);

		const pokemonPromises = allPokemonLink.map(info => {
			return getPokemonInfo(info.url);
		});

		const pokemonsFull = await Promise.all(pokemonPromises);
		const pokemons = pokemonsFull.map(pokemon => {
			return _.pick(pokemon, ['name', 'weight']);
		});

		const sortedPokemons = _.sortBy(pokemons, pokemon => -pokemon.weight);

		//console.log(pokemons);

/*
		const allPokemons = allPokemonLink.results.slice(0,2).map(async function(pokemon) {
			const response = await getPokemonInfo(pokemon.url, ['name', 'weight']);
			return response;
		});
		const pokemonNamesWeights = await Promise.all(allPokemons);
*/
		console.log('ok');
		res.send(sortedPokemons[0]);	

	}
	catch (err) {
		console.log('not ok');
		console.log(err);
		res.send(err);
	};
  




  // fetch(baseUrl + '?limit=1')
  //   .then(function(response) {
  //       if (response.status >= 400) {
  //           throw new Error("Bad response from server");
  //       }
  //       return response.json();
  //   })
  //   .then(function(pokemons) {
  //   	console.log(pokemons.count);
  //   })
  //   .catch(function(err) {
  //   	console.log(err);
  //   });



  //res.render('index', { title: 'Express' });
};