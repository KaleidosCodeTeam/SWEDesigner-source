/*
 *  @file Contiene i test per l'oggetto Composition.
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
	var CompositionTest = Backbone.View.extend({
		el: '#CompositionTest',
		initialize: function () {
			//Start executing Composition's Tests
			var Composition = new Swedesigner.model.classDiagram.items.Composition;
			Test.assert(Composition != undefined, "Composition è un oggetto esistente e rappresenta l'elemento composizione del diagramma delle classi", this.el);
			Test.assert(Composition instanceof Swedesigner.model.classDiagram.items.classDiagramLink, "L'oggetto Composition estende l'oggetto Swedesigner.model.classDiagram.items.classDiagramLink", this.el);
			Test.assert(Composition.defaults.type == 'classDiagram.items.Composition', "L'oggetto Composition è di tipo 'classDiagram.items.Composition'", this.el);
			//Test.assert(Composition.getValues() != undefined, "L'oggetto Composition contiene un attributo 'values'", this.el);
		}
	});
	return new CompositionTest;
});  
