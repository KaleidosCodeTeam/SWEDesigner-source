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
			currentGraph: {},
			projectPkgDiagram: {}
		},
		initialize: function() {
			//this.project = new Project();
		}
	});
	return mainModel;
});
