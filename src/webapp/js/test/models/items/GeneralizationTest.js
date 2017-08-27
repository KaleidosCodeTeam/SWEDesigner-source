/*
 *  @file Contiene i test per l'oggetto Generalization.
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
	var GeneralizationTest = Backbone.View.extend({
		el: '#GeneralizationTest',
		initialize: function () {
			//Start executing Generalization's Tests
			var Generalization = new Swedesigner.model.classDiagram.items.Generalization;
			Test.assert(Generalization != undefined, "Generalization è un oggetto esistente e rappresenta l'elemento generalizzazione del diagramma delle classi", this.el);
			Test.assert(Generalization instanceof Swedesigner.model.classDiagram.items.classDiagramLink, "L'oggetto Generalization estende l'oggetto Swedesigner.model.classDiagram.items.classDiagramLink", this.el);
			Test.assert(Generalization.defaults.type == 'classDiagram.items.Generalization', "L'oggetto Generalization è di tipo 'classDiagram.items.Generalization'", this.el);
			//Test.assert(Generalization.getValues() != undefined, "L'oggetto Generalization contiene un attributo 'values'", this.el);
		}
	});
	return new GeneralizationTest;
});  
