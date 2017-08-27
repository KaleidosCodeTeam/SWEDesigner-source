/*
 *  @file Contiene i test per l'oggetto classDiagramLink.
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
	var classDiagramLinkTest = Backbone.View.extend({
		el: '#classDiagramLinkTest',
		initialize: function () {
			//Start executing classDiagramLink's Tests
			var classDiagramLink = new Swedesigner.model.classDiagram.items.classDiagramLink;
			Test.assert(classDiagramLink != undefined, "classDiagramLink è un oggetto esistente e rappresenta l'elemento generico che collega due elementi del diagramma delle classi", this.el);
			Test.assert(classDiagramLink instanceof joint.dia.Link, "L'oggetto classDiagramLink estende l'oggetto joint.dia.Link", this.el);
			Test.assert(classDiagramLink.defaults.type == 'classDiagram.items.classDiagramLink', "L'oggetto classDiagramLink è di tipo 'classDiagram.items.classDiagramLink'", this.el);
			//Test.assert(classDiagramLink.getValues() != undefined, "L'oggetto classDiagramLink contiene un attributo 'values'", this.el);
		}
	});
	return new classDiagramLinkTest;
});  
