define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	//'js/views/', riferimento alla view principale del progetto 
	'js/models/editPanelModel'
	/** ecc. */
], function ($, _, Backbone, joint, EditPanelModel) {
	var EditPanelView = Backbone.View.extend({
		el: 'editpanel',
		events: {},
		initialize: function() {
			this.model = new EditPanelModel();
		},
		render: function() {
		}
	)};
	return EditPanelView;
});