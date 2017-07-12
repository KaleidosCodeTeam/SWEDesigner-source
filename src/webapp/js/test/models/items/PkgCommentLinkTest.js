/**
 *  @file Contiene i test per l'oggetto PkgCommentLink.
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
	var PkgCommentLinkTest = Backbone.View.extend({
		el: '#PkgCommentLinkTest',
		initialize: function () {
			//Start executing PkgCommentLink's Tests
			var PkgCommentLink = new Swedesigner.model.packageDiagram.items.PkgCommentLink;
			Test.assert(PkgCommentLink != undefined, "PkgCommentLink è un oggetto esistente e rappresenta l'elemento che collega un commento ad un package", this.el);
			Test.assert(PkgCommentLink instanceof Swedesigner.model.packageDiagram.items.packageDiagramLink, "L'oggetto PkgCommentLink estende l'oggetto Swedesigner.model.packageDiagram.items.packageDiagramLink", this.el);
			Test.assert(PkgCommentLink.defaults.type == 'packageDiagram.items.PkgCommentLink', "L'oggetto PkgCommentLink è di tipo 'packageDiagram.items.PkgCommentLink'", this.el);
			//Test.assert(PkgCommentLink.getValues() != undefined, "L'oggetto PkgCommentLink contiene un attributo 'values'", this.el);
		}
	});
	return new PkgCommentLinkTest;
});  
