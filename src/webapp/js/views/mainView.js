/** Per Requirejs (da applicare a tutti i file che si creeranno) */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/views/toolbarView'
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
	return MainView;
});
