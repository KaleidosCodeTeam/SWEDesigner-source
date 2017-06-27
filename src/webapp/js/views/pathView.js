define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/views/projectView',
	'js/models/projectModel',
	'js/models/pathModel'
	/** ecc. */
], function ($, _, Backbone, joint, projectView, projectModel, pathModel) {
	var PathView = Backbone.View.extend({
		el: $('.breadcrumb'),
		parent: {},
		events: {
			'click .switchDiagram': 'switchDiagram'
		},
		initialize: function() {
			this.model = pathModel;
			this.listenTo(projectModel,'switchgraph',this.render);
			this.render();
		},
		render: function() {
			this.renderPath();
		},
		renderPath: function() {
			var currentDiagram = this.model.currentDiagram();
			var diagrams = {'packageDiagram': 1, 'classDiagram': 2, 'bubbleFlowchart': 3};
			this.$el.empty();
			if(diagrams[currentDiagram] > diagrams['packageDiagram'])
				this.$el.append('<li id="packageDiagram" class="switchDiagram"><a href=#">Package</a></li>');
			else
				if(diagrams[currentDiagram] == diagrams['packageDiagram'])
					this.$el.append('<li id="packageDiagram" class="active">Package</li>');
			if(diagrams[currentDiagram] > diagrams['classDiagram'])
				this.$el.append('<li id="classDiagram" class="switchDiagram"><a href=#">Class</a></li>');
			else
				if(diagrams[currentDiagram] == diagrams['classDiagram'])
					this.$el.append('<li id="classDiagram" class="active">Class</li>');
			if(diagrams[currentDiagram] > diagrams['bubbleFlowchart'])
				this.$el.append('<li id="bubbleFlowchart" class="switchDiagram"><a href=#">Bubble</a></li>');
			else
				if(diagrams[currentDiagram] == diagrams['bubbleFlowchart'])
					this.$el.append('<li id="bubbleFlowchart" class="active">Bubble</li>');
		},
		switchDiagram: function(event) {
			projectView.switchOut(event.currentTarget.id);
			//this.model.switchDiagram(event.currentTarget.id);
		}
	});
	return new PathView;
});
