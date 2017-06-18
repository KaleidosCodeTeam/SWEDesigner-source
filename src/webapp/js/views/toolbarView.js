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
			this.listenTo(this.parent.views.editPanelView,'switchgraph', this.renderTools);
			this.listenTo(this.parent.views.pathView,'switchgraph',this.renderTools);
			this.renderTools();
		},
		render: function() {},
		renderTools: function () {
			console.log("render tools here i am :)");
			var currentDiagram = this.model.currentDiagram();
			console.log(currentDiagram);
			_.each(this.$el.children(), function(diagram) {
				if($(diagram).attr('class') == currentDiagram)
					$(diagram).show();
				else
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
