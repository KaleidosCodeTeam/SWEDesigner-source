require.config({
	baseUrl: 'js/',
	paths: {
		jquery: 'libs/jquery/jquery.min',
		lodash: 'libs/lodash/lodash.min',
		backbone: 'libs/backbone/backbone-min',
		joint: 'libs/jointjs/joint.min'
		// SE CI SONO ALTRE LIBRERIE, AGGIUNGERLE
	},
	map: {
		'*': {
			'underscore': 'lodash'
		}
	}
});

/*require(['views/AppView'], function(AppView) {
	var app_view=new AppView;
});*/