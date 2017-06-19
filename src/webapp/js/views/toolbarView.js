define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/items/swedesignerItems',
	'js/models/toolbarModel'
	//'js/views/', riferimento alla view principale del progetto 
], function($, _, Backbone, joint, Swedesigner, ToolbarModel) {
	/**
     *  @module 
     *  @class ToolbarView
     *  @classdesc Elemento che rappresenta la view dei dati della Toolbar.
     *  @extends {Backbone.View.extend}
     */
	var ToolbarView = Backbone.View.extend({
		/**
         *  @var {Object} ToolbarView#el Elemento HTML del DOM utilizzato per renderizzare l'interfaccia grafica.
         */
		el: $('.toolbar'),
		/**
         *  @var {Object} ToolbarView#events Set degli eventi gestiti dalla ToolbarView.
         */
		events: {
			'click .toolbarbutton': 'addElement'
		},
		/**
         *  @var {Object} ToolbarView#parent Riferimento alla MainView.
         */
		parent: {},
		/**
         *  @function ToolbarView#initialize
         *  @summary Metodo di inizializzazione: istanzia il ToolbarModel, salva i riferimenti passati come parametro e definisce gli eventi su cui mettersi in ascolto.
         *  @param {Object} options - contiene il riferimento all'istanza della MainView.
         */
		initialize: function(options) {
			this.model = new ToolbarModel({model: options.model});
			this.parent = options.parent;
			this.listenTo(this.parent.views.editPanelView,'switchgraph', this.render);
			this.listenTo(this.parent.views.pathView,'switchgraph',this.render);
			this.render();
		},
		/**
         *  @function ToolbarView#render
         *  @summary Metodo utilizzato per fare il rendering dell'interfaccia grafica.
         */
		render: function() {
			this.renderTools();
		},
		/**
         *  @function ToolbarView#renderTools
         *  @summary Metodo utilizzato per fare il rendering grafico degli strumenti utilizzabili nel diagramma corrente.
         */
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
		/**
         *  @function ToolbarView#addElement
         *  @summary Metodo che viene invocato quando viene selezionato uno strumento e che invoca il rispettivo metodo del ToolbarModel.
         */
		addElement: function(event) {
			console.log(event.currentTarget);
			this.model.addElement(event.currentTarget.id);
		}
	});
	return ToolbarView;
});
