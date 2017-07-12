/**
 *  @file Contiene i test per l'oggetto Association.
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
	var AssociationTest = Backbone.View.extend({
		el: '#AssociationTest',
		initialize: function () {
			//Start executing Association's Tests
			var Association = new Swedesigner.model.classDiagram.items.Association;
			Test.assert(Association != undefined, "Association è un oggetto esistente e rappresenta l'elemento associazione del diagramma delle classi", this.el);
			Test.assert(Association instanceof Swedesigner.model.classDiagram.items.classDiagramLink, "L'oggetto Association estende l'oggetto Swedesigner.model.classDiagram.items.classDiagramLink", this.el);
			Test.assert(Association.defaults.type == 'classDiagram.items.Association', "L'oggetto Association è di tipo 'classDiagram.items.Association'", this.el);
			Test.assert(Association.getValues() != undefined, "L'oggetto Association contiene un attributo 'values'", this.el);
		}
	});
	return new AssociationTest;
});  
