define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/items/swedesignerItems'
], function($, _, Backbone, joint, Swedesigner) {
	var ToolbarView = Backbone.View.extend({
		el: $('.toolbar'),
		events: {
			'click .toolbarbutton': 'addElement'
		},
		graph: new joint.dia.Graph,
		initialize: function() {
			var paper = new joint.dia.Paper({
				el: $('#canvas'),
				width: $('#canvas').width(),
				height:$('#canvas').height(),
				model: this.graph,
				gridSize: 10,
				drawGrid: true,
				background:{
				    color: '#EDF6F6'
				}
			});
			console.log("initialized");
			this.addElement();
		},
		render: function() {
		},
		addElement: function() {
			var p = new Swedesigner.model.packageDiagram.items.Package({
				position: { x:100  , y: 100 },
				size: { width: 180, height: 50 },
				_package: 'Prova'
			});
			console.log(p);
			this.graph.addCell(p);
		}
	});
	
	return ToolbarView;
});
