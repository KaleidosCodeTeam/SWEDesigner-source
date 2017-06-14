define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'models/items/swedesignerItems'
], function($, _, Backbone, joint, Swedesigner) {
	var ToolbarView = Backbone.View.extend({
		el: $('#toolbar'),
		events: {
			'click .toolbarbutton': addCell()
		},
		initialize: function() {
		},
		render: function() {
		},
		getItems: function() {
		}
		addCell: function(event) {
			type = event.currentTarget.id;
				var p = new Swedesigner.model.packageDiagram.items.Package{{
					position: { x:100  , y: 100 },
					size: { width: 180, height: 50 },
					_package: 'Prova'
				})};
				graph.addCell(p);
				
		}
	)};
});