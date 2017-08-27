/*
 *  @file Contiene i test per l'oggetto PkgComment.
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
	var PkgCommentTest = Backbone.View.extend({
		el: '#PkgCommentTest',
		initialize: function () {
			//Start executing PkgComment's Tests
			var PkgComment = new Swedesigner.model.packageDiagram.items.PkgComment;
			Test.assert(PkgComment != undefined, "PkgComment è un oggetto esistente e rappresenta l'elemento commento", this.el);
			Test.assert(PkgComment instanceof joint.shapes.basic.TextBlock, "L'oggetto PkgComment estende l'oggetto joint.shapes.basic.TextBlock", this.el);
			Test.assert(PkgComment.defaults.type == 'packageDiagram.items.PkgComment', "L'oggetto PkgComment è di tipo 'packageDiagram.items.PkgComment'", this.el);
			Test.assert(PkgComment.getValues() != undefined, "L'oggetto PkgComment contiene un attributo 'values'", this.el);
			Test.assertProperties(PkgComment.getValues(), ['comment'], "L'oggetto PkgComment contiene l'attributo values.comment", this.el);
		}
	});
	return new PkgCommentTest;
});  
