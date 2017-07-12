/**
 *  @file Contiene i test per l'oggetto bubbleDiagramLink.
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
	var bubbleDiagramLinkTest = Backbone.View.extend({
		el: '#bubbleDiagramLinkTest',
		initialize: function () {
			//Start executing bubbleDiagramLink's Tests
			var bubbleDiagramLink = new Swedesigner.model.bubbleDiagram.items.bubbleDiagramLink;
			Test.assert(bubbleDiagramLink != undefined, "bubbleDiagramLink è un oggetto esistente e rappresenta l'elemento generico che collega due elementi del diagramma delle bubble", this.el);
			Test.assert(bubbleDiagramLink instanceof joint.dia.Link, "L'oggetto bubbleDiagramLink estende l'oggetto joint.dia.Link", this.el);
			Test.assert(bubbleDiagramLink.defaults.type == 'bubbleDiagram.items.bubbleDiagramLink', "L'oggetto bubbleDiagramLink è di tipo 'bubbleDiagram.items.bubbleDiagramLink'", this.el);
		}
	});
	return new bubbleDiagramLinkTest;
});  
