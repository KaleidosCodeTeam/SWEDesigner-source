/**
 *  @file Contiene la classe ToolbarModel.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/items/swedesignerItems',
    'js/models/projectModel'
], function ($, _, Backbone, joint, Swedesigner, projectModel) {
	/**
	 *  @classdesc Model della toolbar (associato a ToolbarView).
     *  @module client.models
     *  @class ToolbarModel
     *  @extends {Backbone.Model}
     */
	var ToolbarModel = Backbone.Model.extend({
		/**
         *  @var {Object} ToolbarModel#items - Contiene tutti gli elementi definibili nel diagramma corrente.
         */
		items: {},
		/**
         *  @function ToolbarModel#initialize
         *  @summary Inizializzazione del ToolbarModel: chiama il metodo ToolbarModel#createItems.
         */
		initialize: function() {
			this.createItems();
		},
		/**
         *  @function ToolbarModel#currentDiagram
         *	@return {string} Il tipo del diagramma corrente ("packageDiagram", "classDiagram" o "bubbleDiagram").
         *  @summary Ritorna il tipo del diagramma corrente.
         */
		getCurrentDiagram: function() {
			return projectModel.currentDiagramType;
		},
		/**
         *  @function ToolbarModel#createItems
         *  @summary Assegna al campo dati "items" il set di strumenti utilizzabili nel diagramma corrente.
         */
		createItems: function() {
			for(obj in Swedesigner.model.packageDiagram.items)
				this.items['packageDiagram-'+obj] = Swedesigner.model.packageDiagram.items[obj];
			for(obj in Swedesigner.model.classDiagram.items)
				this.items['classDiagram-'+obj] = Swedesigner.model.classDiagram.items[obj];
			for(obj in Swedesigner.model.bubbleDiagram.items)
				this.items['bubbleDiagram-'+obj] = Swedesigner.model.bubbleDiagram.items[obj];
		},
		/**
         *  @function ToolbarModel#addElement
         *	@param {string} id - Identificativo del tipo di strumento/elemento da inserire.
         *  @summary Salva lo strumento selezionato interagendo con il ProjectModel.
         */
		addElement: function(id) {
			//console.log(id);
			var el = '';
			if (id === "bubbleDiagram-nesting"){
				el = {
					type: 'nesting',
					isLink: function() {return false;},
					isElement: function() {return false;},
					source: null,
					target: null
				}
			} else {
                el = new this.items[id]
			}
			projectModel.addItem(el);
		}
	});
	return new ToolbarModel;
});
