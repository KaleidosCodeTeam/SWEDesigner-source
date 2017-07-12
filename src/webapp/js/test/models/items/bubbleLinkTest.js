/**
 *  @file Contiene i test per l'oggetto bubbleLink.
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
	var bubbleLinkTest = Backbone.View.extend({
		el: '#bubbleLinkTest',
		initialize: function () {
			//Start executing bubbleLink's Tests
			var bubbleLink = new Swedesigner.model.bubbleDiagram.items.bubbleLink;
			Test.assert(bubbleLink != undefined, "bubbleLink è un oggetto esistente e rappresenta l'elemento generico che collega due elementi del diagramma delle bubble", this.el);
			Test.assert(bubbleLink instanceof Swedesigner.model.bubbleDiagram.items.bubbleDiagramLink, "L'oggetto bubbleLink estende l'oggetto Swedesigner.model.bubbleDiagram.items.bubbleDiagramLink", this.el);
			Test.assert(bubbleLink.defaults.type == 'bubbleDiagram.items.bubbleLink', "L'oggetto bubbleLink è di tipo 'bubbleDiagram.items.bubbleLink'", this.el);
		}
	});
	return new bubbleLinkTest;
});  
