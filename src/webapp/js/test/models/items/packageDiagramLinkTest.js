/*
 *  @file Contiene i test per l'oggetto packageDiagramLink.
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
	var packageDiagramLinkTest = Backbone.View.extend({
		el: '#packageDiagramLinkTest',
		initialize: function () {
			//Start executing packageDiagramLink's Tests
			var packageDiagramLink = new Swedesigner.model.packageDiagram.items.packageDiagramLink;
			Test.assert(packageDiagramLink != undefined, "packageDiagramLink è un oggetto esistente e rappresenta l'elemento generico che collega due elementi del diagramma dei package", this.el);
			Test.assert(packageDiagramLink instanceof joint.dia.Link, "L'oggetto packageDiagramLink estende l'oggetto joint.dia.Link", this.el);
			Test.assert(packageDiagramLink.defaults.type == 'packageDiagram.items.packageDiagramLink', "L'oggetto packageDiagramLink è di tipo 'packageDiagram.items.packageDiagramLink'", this.el);
			//Test.assert(packageDiagramLink.getValues() != undefined, "L'oggetto packageDiagramLink contiene un attributo 'values'", this.el);
		}
	});
	return new packageDiagramLinkTest;
});  
