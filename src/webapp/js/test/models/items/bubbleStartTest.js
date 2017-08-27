/*
 *  @file Contiene i test per l'oggetto bubbleStart.
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
	var bubbleStartTest = Backbone.View.extend({
		el: '#bubbleStartTest',
		initialize: function () {
			//Start executing bubbleStart's Tests
			var bubbleStart = new Swedesigner.model.bubbleDiagram.items.bubbleStart;
			Test.assert(bubbleStart != undefined, "bubbleStart è un oggetto esistente e rappresenta l'elemento iniziale (start)", this.el);
			Test.assert(bubbleStart instanceof Swedesigner.model.bubbleDiagram.items.Base, "L'oggetto bubbleStart estende l'oggetto Swedesigner.model.bubbleDiagram.items.Base", this.el);
			Test.assert(bubbleStart.defaults.type == 'bubbleDiagram.items.bubbleStart', "L'oggetto bubbleStart è di tipo 'bubbleDiagram.items.bubbleStart'", this.el);
			Test.assert(bubbleStart.getValues() != undefined, "L'oggetto bubbleStart contiene un attributo 'values'", this.el);
			Test.assertProperties(bubbleStart.getValues(), ['_type', 'value'], "L'oggetto bubbleStart contiene gli attributi '_type', 'value'", this.el);
			Test.assert(bubbleStart.defaults.values._type == 'START', "Il _type (tipo) di default di un oggetto bubbleStart è 'START'", this.el);
		}
	});
	return new bubbleStartTest;
});  
