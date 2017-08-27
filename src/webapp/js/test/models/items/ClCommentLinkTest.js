/*
 *  @file Contiene i test per l'oggetto ClCommentLink.
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
	var ClCommentLinkTest = Backbone.View.extend({
		el: '#ClCommentLinkTest',
		initialize: function () {
			//Start executing ClCommentLink's Tests
			var ClCommentLink = new Swedesigner.model.classDiagram.items.ClCommentLink;
			Test.assert(ClCommentLink != undefined, "ClCommentLink è un oggetto esistente e rappresenta l'elemento che collega un commento ad un elemento del diagramma delle classi", this.el);
			Test.assert(ClCommentLink instanceof Swedesigner.model.classDiagram.items.classDiagramLink, "L'oggetto ClCommentLink estende l'oggetto Swedesigner.model.classDiagram.items.classDiagramLink", this.el);
			Test.assert(ClCommentLink.defaults.type == 'classDiagram.items.ClCommentLink', "L'oggetto ClCommentLink è di tipo 'classDiagram.items.ClCommentLink'", this.el);
			//Test.assert(ClCommentLink.getValues() != undefined, "L'oggetto ClCommentLink contiene un attributo 'values'", this.el);
		}
	});
	return new ClCommentLinkTest;
});  
