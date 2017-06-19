define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/items/swedesignerItems'
], function ($, _, Backbone, joint, Swedesigner) {
	/**
     *  @module 
     *  @class ToolbarModel
     *  @classdesc Elemento che rappresenta il modello dei dati della Toolbar.
     *  @extends {Backbone.Model.extend}
     */
	var ToolbarModel = Backbone.Model.extend({
		/**
         *  @var {Object} ToolbarModel#mainModel Riferimento all'istanza del MainModel.
         */
		mainModel: {},
		/**
         *  @var {Object} ToolbarModel#items Contiene tutti gli elementi definibili nel diagramma corrente.
         */
		items: {},
		/**
         *  @function ToolbarModel#initialize
         *  @summary Metodo di inizializzazione: salva il riferimento al mainModel e chiama il metodo ToolbarModel#createItems.
         *  @param {Object} options - contiene il riferimento all'istanza del mainModel.
         */
		initialize: function(options) {
			this.mainModel = options.model;
			this.createItems();
		},
		/**
         *  @function ToolbarModel#currentDiagram
         *  @summary Metodo che ritorna il tipo del diagramma corrente.
         */
		currentDiagram: function() {
			return this.mainModel.project.currentGraph.getDiagramType();
		},
		/**
         *  @function ToolbarModel#createItems
         *  @summary assegna ad items il set di strumenti utilizzabili nel diagramma corrente.
         */
		createItems: function() {
			for(obj in Swedesigner.model.packageDiagram.items)
				this.items['packageDiagram-'+obj] = Swedesigner.model.packageDiagram.items[obj];
			for(obj in Swedesigner.model.classDiagram.items)
				this.items['classDiagram-'+obj] = Swedesigner.model.classDiagram.items[obj];
		},
		/**
         *  @function Package#updateRectangles
         *  @summary Salva lo strumento selezionato interagendo con il MainModel.
         */
		addElement: function (id) {
			console.log(id);
			var el = new this.items[id];
			this.mainModel.project.currentGraph.addItem(el);
		}
	});
	return ToolbarModel;
});
