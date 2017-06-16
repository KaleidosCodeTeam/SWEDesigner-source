define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/items/swedesignerItems',
	'js/models/toolbarModel'
	//'js/views/', riferimento alla view principale del progetto 
], function($, _, Backbone, joint, Swedesigner, ToolbarModel) {
	var ToolbarView = Backbone.View.extend({
		el: $('.toolbar'),
		events: {
			'click .toolbarbutton': 'addElement'
		},
		parent: {},
		initialize: function(options) {
			this.model = new ToolbarModel({model: options.model});
			this.parent = options.parent;
			this.renderTools();
		},
		render: function() {},
		renderTools: function () {
			var currentDiagram = this.model.currentDiagram();
			_.each(this.$el.children(), function(diagram) {
				if(!($(diagram).attr('class') == currentDiagram))
					$(diagram).hide();
			});
		},
		addElement: function(event) {
			console.log(event.currentTarget);
			this.model.addElement(event.currentTarget.id);
		}
	});
	return ToolbarView;
});
