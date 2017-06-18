define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/items/swedesignerItems'

    //'js/models/project'
], function ($, _, Backbone, joint, Swedesigner/*, Project*/) {
	var MainModel = Backbone.Model.extend({
		//urlRoot: '/path(forse)',
		project: {
			projectPkgDiagram: {},
            currentGraph: {},
		},
		initialize: function() {
			console.log("MainModel initialized");
			this.project.projectPkgDiagram = new Swedesigner.model.Diagram('packageDiagram');
			console.log('Project.projectPkgDiagram ' + this.project.projectPkgDiagram);
			this.project.currentGraph = this.project.projectPkgDiagram;
			console.log('Project.currentGraph ' + this.project.currentGraph);
			this.graph = new joint.dia.Graph();
		},
		deleteCell: function (cell) {
            /*if (cell.getValues().hasOwnProperty("operations")) {
                for (var op in cell.getValues().operations) {
                    this.deleteBubbleDiagram(cell.getValues().operations[op].id);
                }
            }*/
            console.log(cell);
            this.currentGraph.graph.removeCells([cell]);
            console.log((this.currentGraph.graph));

            //this.trigger('addcell');
		}
		/*saveProject: function() {
			Swedesigner.model.DAO.saveProject(this.project);
		},
		openProject: function() {
			this.project = Swedesigner.model.DAO.openProject();
		}*/
	});
	return MainModel;
});
