/**
 *  @file Contiene i test per l'oggetto bubbleElse.
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
	var bubbleElseTest = Backbone.View.extend({
		el: '#bubbleElseTest',
		initialize: function () {
			//Start executing bubbleElse's Tests
			var bubbleElse = new Swedesigner.model.bubbleDiagram.items.bubbleElse;
			Test.assert(bubbleElse != undefined, "bubbleElse è un oggetto esistente e rappresenta l'elemento else", this.el);
			Test.assert(bubbleElse instanceof Swedesigner.model.bubbleDiagram.items.Base, "L'oggetto bubbleElse estende l'oggetto Swedesigner.model.bubbleDiagram.items.Base", this.el);
			Test.assert(bubbleElse.defaults.type == 'bubbleDiagram.items.bubbleElse', "L'oggetto bubbleElse è di tipo 'bubbleDiagram.items.bubbleElse'", this.el);
			Test.assert(bubbleElse.getValues() != undefined, "L'oggetto bubbleElse contiene un attributo 'values'", this.el);
			Test.assertProperties(bubbleElse.getValues(), ['_type', 'comment'], "L'oggetto bubbleElse contiene gli attributi '_type', 'comment'", this.el);
			Test.assert(bubbleElse.defaults.values._type == 'ELSE', "Il _type (tipo) di default di un oggetto bubbleElse è 'ELSE'", this.el);
			Test.assert(bubbleElse.defaults.values.comment == 'bubbleElseName', "Il comment (nome,descrizione) di default di un oggetto bubbleElse è 'bubbleElseName'", this.el);
		}
	});
	return new bubbleElseTest;
});  
