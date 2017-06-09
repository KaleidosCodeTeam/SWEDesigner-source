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
