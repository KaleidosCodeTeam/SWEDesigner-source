define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
], function ($, _, Backbone, joint) {
	var toolbarModel = Backbone.Model.extend({
		initialize: function() {
		}
	});
	return toolbarModel;
});
