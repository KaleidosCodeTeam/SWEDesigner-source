/**
 *  @file Contiene i test per l'oggetto bubbleWhile.
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
	var bubbleWhileTest = Backbone.View.extend({
		el: '#bubbleWhileTest',
		initialize: function () {
			//Start executing bubbleWhile's Tests
			var bubbleWhile = new Swedesigner.model.bubbleDiagram.items.bubbleWhile;
			Test.assert(bubbleWhile != undefined, "bubbleWhile è un oggetto esistente e rappresenta l'elemento while", this.el);
			Test.assert(bubbleWhile instanceof Swedesigner.model.bubbleDiagram.items.Base, "L'oggetto bubbleWhile estende l'oggetto Swedesigner.model.bubbleDiagram.items.Base", this.el);
			Test.assert(bubbleWhile.defaults.type == 'bubbleDiagram.items.bubbleWhile', "L'oggetto bubbleWhile è di tipo 'bubbleDiagram.items.bubbleWhile'", this.el);
			Test.assert(bubbleWhile.getValues() != undefined, "L'oggetto bubbleWhile contiene un attributo 'values'", this.el);
			Test.assertProperties(bubbleWhile.getValues(), ['_type', 'condition', 'comment'], "L'oggetto bubbleWhile contiene gli attributi '_type', 'condition', 'comment'", this.el);
			Test.assert(bubbleWhile.defaults.values._type == 'WHILE', "Il _type (tipo) di default di un oggetto bubbleWhile è 'WHILE'", this.el);
			Test.assert(bubbleWhile.defaults.values.comment == 'bubbleWhileName', "Il comment (nome,descrizione) di default di un oggetto bubbleWhile è 'bubbleWhileName'", this.el);
		}
	});
	return new bubbleWhileTest;
});  
