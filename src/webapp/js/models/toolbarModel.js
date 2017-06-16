define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/items/swedesignerItems'
], function ($, _, Backbone, joint, Swedesigner) {
	var ToolbarModel = Backbone.Model.extend({
		mainModel: {},
		items: {},
		initialize: function(options) {
			this.mainModel = options.model;
			this.createItems();
		},
		currentDiagram: function() {
			return this.mainModel.project.currentGraph.getDiagramType();
		},
		createItems: function() {
			for(obj in Swedesigner.model.packageDiagram.items)
				this.items['packageDiagram-'+obj] = Swedesigner.model.packageDiagram.items[obj];
			for(obj in Swedesigner.model.classDiagram.items)
				this.items['classDiagram-'+obj] = Swedesigner.model.classDiagram.items[obj];
		},
		addElement: function (id) {
			console.log(id);
			var el = new this.items[id];
			this.mainModel.project.currentGraph.graph.addCell(el);
		}
	});
	return ToolbarModel;
});
