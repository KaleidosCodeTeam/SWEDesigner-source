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
			this.views.titlebarView = new TitlebarView({parent: this});
			this.views.toolbarView = new ToolbarView({parent: this});
			this.views.pathView = new PathView({parent: this});
			this.views.editPanelView = new EditPanelView({parent: this, model: this.model});
		},
		render: function() {
		}
	});
	return MainView;
});
