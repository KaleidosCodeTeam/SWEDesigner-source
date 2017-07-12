/**
 *  @file Contiene i test per l'oggetto Implementation.
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
	var ImplementationTest = Backbone.View.extend({
		el: '#ImplementationTest',
		initialize: function () {
			//Start executing Implementation's Tests
			var Implementation = new Swedesigner.model.classDiagram.items.Implementation;
			Test.assert(Implementation != undefined, "Implementation è un oggetto esistente e rappresenta l'elemento implementazione del diagramma delle classi", this.el);
			Test.assert(Implementation instanceof Swedesigner.model.classDiagram.items.classDiagramLink, "L'oggetto Implementation estende l'oggetto Swedesigner.model.classDiagram.items.classDiagramLink", this.el);
			Test.assert(Implementation.defaults.type == 'classDiagram.items.Implementation', "L'oggetto Implementation è di tipo 'classDiagram.items.Implementation'", this.el);
			//Test.assert(Implementation.getValues() != undefined, "L'oggetto Implementation contiene un attributo 'values'", this.el);
		}
	});
	return new ImplementationTest;
});  
