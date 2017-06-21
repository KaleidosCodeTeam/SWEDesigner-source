require.config({
	baseUrl: './',
	paths: {
		jquery: 'lib/js/jquery.min',
		lodash: 'lib/js/lodash.min',
		backbone: 'lib/js/backbone-min',
		joint: 'lib/js/joint.min',
		text: 'lib/js/text',
		jsonfn: 'lib/js/jsonfn.min'
		// SE CI SONO ALTRE LIBRERIE, AGGIUNGERLE
	},
	map: {
		'*': {
			'underscore': 'lodash'
		}
	}
});

//console.log('Hey! I am main.js');
require(['js/views/mainView'], function(mainView) {
});
