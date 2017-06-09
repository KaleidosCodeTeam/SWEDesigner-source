/** Per Requirejs (da applicare a tutti i file che si creeranno) */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	/** ecc. */
], function ($, _, Backbone, joint) {
	var MainView = Backbone.View.extend({
		el: 'body',
		events: {},
		initialize: function() {
			titleBarView = new TitleBarView;
			toolbarView = new ToolbarView;
			addressView = new AddressView;
			editPanelView = new EditPanelView;
			paper = new joint.dia.Paper;
		},
		render: function() {
		}
	});

	var mainView = new MainView();
	// BISOGNERÀ FARE return MainView;
});