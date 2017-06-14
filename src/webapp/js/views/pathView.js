define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	//'js/views/', riferimento alla view principale del progetto 
	'js/models/pathModel'
	/** ecc. */
], function ($, _, Backbone, joint, PathModel) {
	var PathView = Backbone.View.extend({
		initialize: function() {
			this.model = new PathModel();
		}
	});
	return PathView;
});