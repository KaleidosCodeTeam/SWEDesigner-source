/**
 *  @file Contiene i test per l'oggetto Interface.
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
	var InterfaceTest = Backbone.View.extend({
		el: '#InterfaceTest',
		initialize: function () {
			//Start executing Interface's Tests
			var Interface = new Swedesigner.model.classDiagram.items.Interface;
			Test.assert(Interface != undefined, "Interface è un oggetto esistente e rappresenta l'elemento Interfacee", this.el);
			Test.assert(Interface instanceof Swedesigner.model.classDiagram.items.Base, "L'oggetto Interface estende l'oggetto Swedesigner.model.InterfaceDiagram.items.Base", this.el);
			Test.assert(Interface.defaults.type == 'classDiagram.items.Interface', "L'oggetto Interface è di tipo 'classDiagram.items.Interface'", this.el);
			Test.assert(Interface.getValues() != undefined, "L'oggetto Interface contiene un attributo 'values'", this.el);
			Test.assertProperties(Interface.getValues(), ['_name', '_visibility', '_importance', 'isInterface', 'operations'], "L'oggetto Interface contiene gli attributi '_name', '_visibility', '_importance', 'isInterface', 'operations'", this.el);
			Test.assert(typeof Interface.addOperation === 'function', "L'oggetto Interface contiene una funzione chiamata addOperation", this.el);
			Test.assert(typeof Interface.addParameter === 'function', "L'oggetto Interface contiene una funzione chiamata addParameter", this.el);
			Test.assert(typeof Interface.deleteOperation === 'function', "L'oggetto Interface contiene una funzione chiamata deleteOperation", this.el);
			Test.assert(typeof Interface.deleteParameter === 'function', "L'oggetto Interface contiene una funzione chiamata deleteParameter", this.el);
			Test.assert(typeof Interface.getOpDesc === 'function', "L'oggetto Interface contiene una funzione chiamata getOpDesc", this.el);
			Test.assert(typeof Interface.getItemDesc === 'function', "L'oggetto Interface contiene una funzione chiamata getItemDesc", this.el);
			Test.assert(typeof Interface.getWidth === 'function', "L'oggetto Interface contiene una funzione chiamata getWidth", this.el);
			Test.assert(Interface.defaults.values._name == 'NomeInterfaccia', "Il nome di default di un oggetto Interface è 'NomeInterfaccia'", this.el);
			Test.assert(Interface.defaults.values._visibility == 'public', "La visibilità di default di un oggetto Interface è 'public'", this.el);
			Test.assert(Interface.defaults.values.isInterface == 'true', "Il valore di default di isInterface di un oggetto Interface è 'true'", this.el);
		}
	});
	return new InterfaceTest;
});  
