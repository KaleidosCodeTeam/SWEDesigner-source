define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'models/items/swedesignerItems',
    'models/kaleidosDiagram',
    'models/toolbarModel'
], function ($, _, Backbone, joint, items, kaleidosDiagram, toolbar) {
	var mainModel = Backbone.Model.extend({
		kaleidosDiagram: {},
		toolbarModel: {},
		//urlRoot: '/path(forse)',
		initialize: function() {
			this.kaleidosDiagram=kaleidosDiagram;
			this.toolbarModel=toolbar;
		}

	});
	return mainModel;
});