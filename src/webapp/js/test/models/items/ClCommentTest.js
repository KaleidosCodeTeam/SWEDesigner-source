/*
 *  @file Contiene i test per l'oggetto ClComment.
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
	var ClCommentTest = Backbone.View.extend({
		el: '#ClCommentTest',
		initialize: function () {
			//Start executing ClComment's Tests
			var ClComment = new Swedesigner.model.classDiagram.items.ClComment;
			Test.assert(ClComment != undefined, "ClComment è un oggetto esistente e rappresenta l'elemento commento", this.el);
			Test.assert(ClComment instanceof joint.shapes.basic.TextBlock, "L'oggetto ClComment estende l'oggetto joint.shapes.basic.TextBlock", this.el);
			Test.assert(ClComment.defaults.type == 'classDiagram.items.ClComment', "L'oggetto ClComment è di tipo 'classDiagram.items.ClComment'", this.el);
			Test.assert(ClComment.getValues() != undefined, "L'oggetto ClComment contiene un attributo 'values'", this.el);
			Test.assertProperties(ClComment.getValues(), ['comment'], "L'oggetto ClComment contiene l'attributo values.comment", this.el);
		}
	});
	return new ClCommentTest;
});  
