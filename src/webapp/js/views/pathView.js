define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/views/projectView',
	'js/models/projectModel'
	/** ecc. */
], function ($, _, Backbone, joint, projectView, projectModel) {
	var PathView = Backbone.View.extend({
		el: $('.breadcrumb'),
		parent: {},
		events: {
			'click .switchDiagram': 'switchDiagram'
		},
		initialize: function() {
			this.listenTo(projectModel,'switchgraph',this.render);
			this.render();
		},
		render: function() {
			this.renderPath();
		},
		renderPath: function() {
			var currentDiagram = projectModel.currentDiagramType;
			var diagrams = {'packageDiagram': 1, 'classDiagram': 2, 'bubbleDiagram': 3};
			this.$el.empty();
			if(diagrams[currentDiagram] > diagrams['packageDiagram'])
				this.$el.append('<li id="packageDiagram" class="switchDiagram"><a href="#">Package</a></li>');
			else
				if(diagrams[currentDiagram] == diagrams['packageDiagram'])
					this.$el.append('<li id="packageDiagram" class="active">Package</li>');
			if(diagrams[currentDiagram] > diagrams['classDiagram'])
				this.$el.append('<li id="classDiagram" class="switchDiagram"><a href="#">Class</a></li>');
			else
				if(diagrams[currentDiagram] == diagrams['classDiagram'])
					this.$el.append('<li id="classDiagram" class="active">Class</li>');
			if(diagrams[currentDiagram] > diagrams['bubbleDiagram'])
				this.$el.append('<li id="bubbleDiagram" class="switchDiagram"><a href="#">Bubble</a></li>');
			else
				if(diagrams[currentDiagram] == diagrams['bubbleDiagram'])
					this.$el.append('<li id="bubbleDiagram" class="active">Bubble</li>');
		},
		switchDiagram: function(event) {
			projectView.switchOut(event.currentTarget.id);
		}
	});
	return new PathView;
});
