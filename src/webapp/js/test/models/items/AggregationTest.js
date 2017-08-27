/*
 *  @file Contiene i test per l'oggetto Aggregation.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/items/swedesignerItems',
    'js/test/test'
], function ($, _, Backbone, joint, Swedesigner, Test) {
	var AggregationTest = Backbone.View.extend({
		el: '#AggregationTest',
		initialize: function () {
			//Start executing Aggregation's Tests
			var Aggregation = new Swedesigner.model.classDiagram.items.Aggregation;
			Test.assert(Aggregation != undefined, "Aggregation è un oggetto esistente e rappresenta l'elemento aggregazione del diagramma delle classi", this.el);
			Test.assert(Aggregation instanceof Swedesigner.model.classDiagram.items.classDiagramLink, "L'oggetto Aggregation estende l'oggetto Swedesigner.model.classDiagram.items.classDiagramLink", this.el);
			Test.assert(Aggregation.defaults.type == 'classDiagram.items.Aggregation', "L'oggetto Aggregation è di tipo 'classDiagram.items.Aggregation'", this.el);
			//Test.assert(Aggregation.getValues() != undefined, "L'oggetto Aggregation contiene un attributo 'values'", this.el);
		}
	});
	return new AggregationTest;
});  
