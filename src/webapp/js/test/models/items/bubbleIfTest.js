/**
 *  @file Contiene i test per l'oggetto bubbleIf.
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
	var bubbleIfTest = Backbone.View.extend({
		el: '#bubbleIfTest',
		initialize: function () {
			//Start executing bubbleIf's Tests
			var bubbleIf = new Swedesigner.model.bubbleDiagram.items.bubbleIf;
			Test.assert(bubbleIf != undefined, "bubbleIf è un oggetto esistente e rappresenta l'elemento if", this.el);
			Test.assert(bubbleIf instanceof Swedesigner.model.bubbleDiagram.items.Base, "L'oggetto bubbleIf estende l'oggetto Swedesigner.model.bubbleDiagram.items.Base", this.el);
			Test.assert(bubbleIf.defaults.type == 'bubbleDiagram.items.bubbleIf', "L'oggetto bubbleIf è di tipo 'bubbleDiagram.items.bubbleIf'", this.el);
			Test.assert(bubbleIf.getValues() != undefined, "L'oggetto bubbleIf contiene un attributo 'values'", this.el);
			Test.assertProperties(bubbleIf.getValues(), ['_type', 'condition','comment'], "L'oggetto bubbleIf contiene gli attributi '_type', 'condition', 'comment'", this.el);
			Test.assert(bubbleIf.defaults.values._type == 'IF', "Il _type (tipo) di default di un oggetto bubbleIf è 'IF'", this.el);
			Test.assert(bubbleIf.defaults.values.comment == 'bubbleIfName', "Il comment (nome,descrizione) di default di un oggetto bubbleIf è 'bubbleIfName'", this.el);
		}
	});
	return new bubbleIfTest;
});  
