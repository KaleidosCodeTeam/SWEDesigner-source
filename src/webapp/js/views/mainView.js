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
	var MainView = Backbone.View.extend({
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
			this.views.projectView = new ProjectView({parent: this});
			this.views.titlebarView = new TitlebarView({parent: this, model: this.projectView.model});
			this.views.toolbarView = new ToolbarView({parent: this, model: this.prjectView.model});
			this.views.pathView = new PathView({parent: this, model: this.prjectView.model}});
			this.views.editPanelView = new EditPanelView({parent: this, model: this.prjectView.model});
		},
		render: function() {
		}
	});
	return MainView;
});
