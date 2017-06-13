define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'models/items/swedesignerItems',
    'models/packageDiagram',
    'models/toolbarModel'
], function ($, _, Backbone, joint, items, packageDiagram, toolbar) {
	var mainModel = Backbone.Model.extend({
		packageDiagram: {},
		toolbarModel: {},
		//urlRoot: '/path(forse)',
		initialize: function() {
			this.packageDiagram=packageDiagram;
			this.toolbarModel=toolbar;
		}

	});
	return mainModel;
});