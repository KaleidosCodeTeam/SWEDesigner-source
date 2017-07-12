/**
 *  @file Contiene i test per l'oggetto bubbleFor.
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
	var bubbleForTest = Backbone.View.extend({
		el: '#bubbleForTest',
		initialize: function () {
			//Start executing bubbleFor's Tests
			var bubbleFor = new Swedesigner.model.bubbleDiagram.items.bubbleFor;
			Test.assert(bubbleFor != undefined, "bubbleFor è un oggetto esistente e rappresenta l'elemento for", this.el);
			Test.assert(bubbleFor instanceof Swedesigner.model.bubbleDiagram.items.Base, "L'oggetto bubbleFor estende l'oggetto Swedesigner.model.bubbleDiagram.items.Base", this.el);
			Test.assert(bubbleFor.defaults.type == 'bubbleDiagram.items.bubbleFor', "L'oggetto bubbleFor è di tipo 'bubbleDiagram.items.bubbleFor'", this.el);
			Test.assert(bubbleFor.getValues() != undefined, "L'oggetto bubbleFor contiene un attributo 'values'", this.el);
			Test.assertProperties(bubbleFor.getValues(), ['_type', 'initialization', 'termination', 'increment', 'comment'], "L'oggetto bubbleFor contiene gli attributi '_type', 'initialization', 'termination', 'increment', 'comment'", this.el);
			Test.assert(bubbleFor.defaults.values._type == 'FOR', "Il _type (tipo) di default di un oggetto bubbleFor è 'FOR'", this.el);
			Test.assert(bubbleFor.defaults.values.comment == 'bubbleForName', "Il comment (nome,descrizione) di default di un oggetto bubbleFor è 'bubbleForName'", this.el);
		}
	});
	return new bubbleForTest;
});  
