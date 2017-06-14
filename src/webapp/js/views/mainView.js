/** Per Requirejs (da applicare a tutti i file che si creeranno) */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'toolbarView'
	/** ecc. */
], function ($, _, Backbone, joint, ToolbarView) {
	var MainView = Backbone.View.extend({
		el: 'body',
		events: {},
		initialize: function() {
			//titleBarView = new TitleBarView;
			var toolbarView = new ToolbarView();
			//addressView = new AddressView;
			//editPanelView = new EditPanelView;
		},
		render: function() {
		}
	});

	//var mainView = new MainView();
	// BISOGNERÀ FARE 
	return MainView;
});
