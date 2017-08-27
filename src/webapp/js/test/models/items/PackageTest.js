/*
 *  @file Contiene i test per l'oggetto Package.
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
	var PackageTest = Backbone.View.extend({
		el: '#PackageTest',
		initialize: function () {
			//Start executing Package's Tests
			var Package = new Swedesigner.model.packageDiagram.items.Package;
			Test.assert(Package != undefined, "Package è un oggetto esistente e rappresenta l'elemento package", this.el);
			Test.assert(Package instanceof Swedesigner.model.packageDiagram.items.Base, "L'oggetto Package estende l'oggetto Swedesigner.model.packageDiagram.items.Base", this.el);
			Test.assert(Package.defaults.type == 'packageDiagram.items.Package', "L'oggetto Package è di tipo 'packageDiagram.items.Package'", this.el);
			Test.assert(Package.getValues() != undefined, "L'oggetto Package contiene un attributo 'values'", this.el);
			Test.assertProperties(Package.getValues(), ['_package', '_importance'], "L'oggetto Package contiene gli attributi values._package e values._importance", this.el);
			Test.assert(Package.getPackageName() != undefined, "L'oggetto Package contiene una funzione che ritorna il nome del package", this.el);
			Test.assert(Package.defaults.values._package == 'NomePackage', "Il nome di default di un oggetto Package è 'NomePackage'", this.el);
		}
	});
	return new PackageTest;
});  
