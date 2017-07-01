/**
 *  @file Contiene la classe ToolbarView e ne ritorna una istanza.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/items/swedesignerItems',
    'js/models/toolbarModel',
    'js/models/projectModel'
], function($, _, Backbone, joint, Swedesigner, toolbarModel, projectModel) {
	/**
     *  @classdesc Toolbar degli elementi realizzabili nel diagramma correntemente visualizzato.
     *  @module
     *  @class ToolbarView
     *  @extends {Backbone.View}
     */
	var ToolbarView = Backbone.View.extend({
		/**
         *  @var {jQuery Object} ToolbarView#el - L'elemento del DOM corrispondente a ToolbarView.
         */
		el: $('.toolbar'),
		/**
         *  @var {Object} ToolbarView#events - Gli eventi verificabili nella toolbar.
         */
		events: {
			'click .toolbarbutton': 'addElement'
		},
		/**
         *  @function ToolbarView#initialize
         *  @summary Inizializzazione della ToolbarView.
         */
		initialize: function() {
			this.model = toolbarModel;
			this.listenTo(projectModel, 'switchgraph',this.render);
			this.render();
		},
		/**
         *  @function ToolbarView#render
         *  @summary Render della toolbar in base al diagramma correntemente visualizzato.
         */
		render: function() {
			var currentDiagram = toolbarModel.getCurrentDiagram();
			//console.log(currentDiagram);
			_.each(this.$el.children(), function(diagram) {
				if($(diagram).attr('class') === currentDiagram)
					$(diagram).show();
				else
					$(diagram).hide();
			});
		},
		/**
         *  @function ToolbarView#addElement
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Aggiunge un elemento al diagramma alla selezione di uno strumento invocando il rispettivo metodo di ToolbarModel.
         */
		addElement: function(event) {
			//console.log(event.currentTarget);
			toolbarModel.addElement(event.currentTarget.id);
		}
	});
	return new ToolbarView;
});
