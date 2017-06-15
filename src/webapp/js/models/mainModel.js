define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    //'js/models/project'
], function ($, _, Backbone, joint/*, Project*/) {
	var mainModel = Backbone.Model.extend({
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
	});
	return mainModel;
});
