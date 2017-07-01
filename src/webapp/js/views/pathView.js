/**
 *  @file Contiene la classe PathView e ne ritorna una istanza.
 *  @author Bonolo Marco, Pezzuto Francesco - KaleidosCode
 */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/views/projectView',
	'js/models/projectModel'
], function ($, _, Backbone, joint, projectView, projectModel) {
	/**
     *  @classdesc Path rappresentante il percorso della profondità del diagramma attuale.
     *	Ogni tipo di diagramma antistante a quello corrente nel path è cliccabile per tornarci.
     *  @module
     *  @class PathView
     *  @extends {Backbone.View}
     */
	var PathView = Backbone.View.extend({
		/**
         *  @var {jQuery Object} PathView#el - L'elemento del DOM corrispondente a PathView.
         */
		el: $('.breadcrumb'),
		/**
         *  @var {Object} PathView#events - Gli eventi verificabili nella path.
         */
		events: {
			'click .switchDiagram': 'switchDiagram'
		},
		/**
         *  @function PathView#initialize
         *  @summary Inizializzazione della PathView.
         */
		initialize: function() {
			this.listenTo(projectModel,'switchgraph',this.render);
			this.render();
		},
		/**
         *  @function PathView#render
         *  @summary Render del path in base al diagramma correntemente visualizzato.
         */
		render: function() {
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
		/**
         *  @function EditPanelView#switchDiagram
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Metodo chiamato da evento generato. Switch verso un tipo antistante di diagramma.
         */
		switchDiagram: function(event) {
			projectView.switchOut(event.currentTarget.id);
		}
	});
	return new PathView;
});
