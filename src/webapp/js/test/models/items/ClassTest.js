/*
 *  @file Contiene i test per l'oggetto Class.
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
	var ClassTest = Backbone.View.extend({
		el: '#ClassTest',
		initialize: function () {
			//Start executing Class's Tests
			var Class = new Swedesigner.model.classDiagram.items.Class;
			Test.assert(Class != undefined, "Class è un oggetto esistente e rappresenta l'elemento classe", this.el);
			Test.assert(Class instanceof Swedesigner.model.classDiagram.items.Base, "L'oggetto Class estende l'oggetto Swedesigner.model.classDiagram.items.Base", this.el);
			Test.assert(Class.defaults.type == 'classDiagram.items.Class', "L'oggetto Class è di tipo 'classDiagram.items.Class'", this.el);
			Test.assert(Class.getValues() != undefined, "L'oggetto Class contiene un attributo 'values'", this.el);
			Test.assertProperties(Class.getValues(), ['_name', '_visibility', '_importance', 'isAbstract', 'isInterface', 'constructorList', 'attributes', 'operations', 'isStatic', 'isFinal', 'isFrozen', 'isReadOnly', 'isEnum', 'isGeneric'], "L'oggetto Class contiene gli attributi '_name', '_visibility', '_importance', 'isAbstract', 'isInterface', 'constructorList', 'attributes', 'operations', 'isStatic', 'isFinal', 'isFrozen', 'isReadOnly', 'isEnum', 'isGeneric'", this.el);
			Test.assert(typeof Class.addOperation === 'function', "L'oggetto Class contiene una funzione chiamata addOperation", this.el);
			Test.assert(typeof Class.addAttribute === 'function', "L'oggetto Class contiene una funzione chiamata addAttribute", this.el);
			Test.assert(typeof Class.addParameter === 'function', "L'oggetto Class contiene una funzione chiamata addParameter", this.el);
			Test.assert(typeof Class.deleteOperation === 'function', "L'oggetto Class contiene una funzione chiamata deleteOperation", this.el);
			Test.assert(typeof Class.deleteAttribute === 'function', "L'oggetto Class contiene una funzione chiamata deleteAttribute", this.el);
			Test.assert(typeof Class.deleteParameter === 'function', "L'oggetto Class contiene una funzione chiamata deleteParameter", this.el);
			Test.assert(typeof Class.getAttrsDesc === 'function', "L'oggetto Class contiene una funzione chiamata getAttrsDesc", this.el);
			Test.assert(typeof Class.getOpDesc === 'function', "L'oggetto Class contiene una funzione chiamata getOpDesc", this.el);
			Test.assert(typeof Class.getItemDesc === 'function', "L'oggetto Class contiene una funzione chiamata getItemDesc", this.el);
			Test.assert(typeof Class.getWidth === 'function', "L'oggetto Class contiene una funzione chiamata getWidth", this.el);
			Test.assert(Class.defaults.values._name == 'NomeClasse', "Il nome di default di un oggetto Class è 'NomeClasse'", this.el);
			Test.assert(Class.defaults.values._visibility == 'public', "La visibilità di default di un oggetto Class è 'public'", this.el);
		}
	});
	return new ClassTest;
});  
