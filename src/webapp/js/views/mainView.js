define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/views/titlebarView',
	'js/views/toolbarView',
	'js/views/pathView',
	'js/views/editPanelView',
	'js/models/mainModel'
	/** ecc. */
], function ($, _, Backbone, joint, TitlebarView, ToolbarView, PathView, EditPanelView, MainModel) {
	var MainView = Backbone.View.extend({
		el: 'body',
		events: {},
		views: {
			titleBarView: {},
			toolbarView: {},
			pathView: {},
			editPanelView: {}
		},
		initialize: function() {
			this.model = new MainModel();
			this.titlebarView = new TitlebarView();
			this.toolbarView = new ToolbarView();
			this.pathView = new PathView();
			this.editPanelView = new EditPanelView();
		},
		render: function() {
		}
	});
	return MainView;
});
