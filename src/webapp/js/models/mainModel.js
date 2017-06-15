define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    //'js/models/project'
], function ($, _, Backbone, joint/*, Project*/) {
	var MainModel = Backbone.Model.extend({
		graph: {},
		//urlRoot: '/path(forse)',
		project: {
			projectPkgDiagram: {},
            currentGraph: {},
		},
		initialize: function() {
			this.project.projectPkgDiagram = new Swedesigner.model.Diagram('packageDiagram');
			this.currentGraph = this.project.projectPkgDiagram;
		},
		/*saveProject: function() {
			Swedesigner.model.DAO.saveProject(this.project);
		},
		openProject: function() {
			this.project = Swedesigner.model.DAO.openProject();
		}*/
			this.graph = new joint.dia.Graph();
		}
	});
	return MainModel;
});
