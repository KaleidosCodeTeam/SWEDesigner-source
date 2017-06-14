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
		/*el: 'body',
		events: {},
		initialize: function() {
			var graph = new joint.dia.graph();
			//titleBarView = new TitleBarView;
			var toolbarView = new ToolbarView();
			//addressView = new AddressView;
			//editPanelView = new EditPanelView;
			var paper = new joint.dia.Paper({
				el: $('#canvas'),
				width: $('#canvas').width(),
				height:$('#canvas').height(),
				model: graph,
				gridSize: 10,
				drawGrid: true,
				background:{
				    color: '#EDF6F6'
				}
			});
		},
		render: function() {
		}*/
	});

	//var mainView = new MainView();
	// BISOGNERÀ FARE 
	return MainView;
});
