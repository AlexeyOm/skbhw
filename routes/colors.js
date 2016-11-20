const _ = require('lodash');
require('isomorphic-fetch');

let toHex = num => Number(num) < 17 ? '0' + Number(num).toString(16) : Number(num).toString(16) ;

exports.index = function(req, res){
	console.log('==>' + req.query.color);
	let result = req.query.color ? req.query.color.trim() : 'Invalid color';


	if (result.match(/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/)) {
		console.log('entered rgb');
		result = result.replace(/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/, '$1 $2 $3')
			.split(' ')
			.map(toHex)
			.join('');
	}

	
	result = result.replace(/%20/g, ' ');
	console.log('res after rgb =' + result);

	if (result.match(/^hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/)) {
		console.log('entered hsl');
		result = result.replace(/^hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/, '$1 $2 $3').split(' ');
		if(Number(result[1])>100 || Number(result[2])>100) {result = 'Invalid color';}
		else {result = myHslToRgb(...result).map(Number).map(toHex).join('');}
	}



	console.log(result);
	result = result.replace(/^#(.*)/, '$1');
	//console.log(result);

	if(!result.match(/(^[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]$)|(^[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]$)/)) {
		result = 'Invalid color';
	}

	result = result.replace( /(^[0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F]$)/, '$1$1$2$2$3$3');

	result = result === 'Invalid color' ? result : '#' + result.toLowerCase();

	console.log('<==' + result);
	res.send(result.toString()); 
	  
};

/*
C = (1 - |2L - 1|) × S

X = C × (1 - |(H / 60°) mod 2 - 1|)

m = L - C/2

(R,G,B) = ((R'+m)×255, (G'+m)×255,(B'+m)×255)
*/


function myHslToRgb(h, s, l) {

	l = l/100;
	s = s/100;

	let rgb = [];

	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs((h/60)%2 - 1));
	const m = l - c/2;

console.log('c = '+c);
console.log('x = '+x);
	console.log('m = '+m);

	switch(true) {
		case h<60 : {rgb = [c,x,0];break;}
		case h<120 : {rgb = [x,c,0]; break;}
		case h<180 : {rgb = [0,c,x]; break;}
		case h<240 : {rgb = [0,x,c]; break;}
		case h<300 : {rgb = [x,0,c]; break;}
		case h<360 : {rgb = [c,0,x]; break;}


	}
	console.log(rgb);

	let arr = [];

	arr.push(Math.round((rgb[0]+m)*255));
	arr.push(Math.round((rgb[1]+m)*255));
	arr.push(Math.round((rgb[2]+m)*255));


	console.log('arr = ' + arr);

	return arr;
}



hslToRgb = (h, s, l) => {
    var r, g, b;
    
    console.log(h);

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    console.log('hsl worked ', [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]);
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
