define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/views/titlebarView',
	'js/views/toolbarView',
	'js/views/pathView',
	'js/views/editPanelView',
	'js/views/projectView'
	/** ecc. */
], function ($, _, Backbone, joint, TitlebarView, ToolbarView, PathView, EditPanelView, ProjectView) {
	var mainView = Backbone.View.extend({
		el: 'body',
		events: {},
		views: {
			projectView: {},
			titleBarView: {},
			toolbarView: {},
			pathView: {},
			editPanelView: {}
		},
		initialize: function() {
			console.log("MainView initialized");
			this.views.projectView = ProjectView;
			this.views.titlebarView = TitlebarView;
			this.views.toolbarView = ToolbarView;
			this.views.pathView = PathView;
			this.views.editPanelView = EditPanelView;
		},
		render: function() {
		}
	});
	return new mainView;
});
