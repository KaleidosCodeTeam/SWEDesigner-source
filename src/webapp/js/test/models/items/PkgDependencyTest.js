/**
 *  @file Contiene i test per l'oggetto PkgDependency.
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
	var PkgDependencyTest = Backbone.View.extend({
		el: '#PkgDependencyTest',
		initialize: function () {
			//Start executing PkgDependency's Tests
			var PkgDependency = new Swedesigner.model.packageDiagram.items.PkgDependency;
			Test.assert(PkgDependency != undefined, "PkgDependency è un oggetto esistente e rappresenta l'elemento che collega un commento ad un package", this.el);
			Test.assert(PkgDependency instanceof Swedesigner.model.packageDiagram.items.packageDiagramLink, "L'oggetto PkgDependency estende l'oggetto Swedesigner.model.packageDiagram.items.packageDiagramLink", this.el);
			Test.assert(PkgDependency.defaults.type == 'packageDiagram.items.PkgDependency', "L'oggetto PkgDependency è di tipo 'packageDiagram.items.PkgDependency'", this.el);
			//Test.assert(PkgDependency.getValues() != undefined, "L'oggetto PkgDependency contiene un attributo 'values'", this.el);
		}
	});
	return new PkgDependencyTest;
});  
