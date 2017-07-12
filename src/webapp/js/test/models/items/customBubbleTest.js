/**
 *  @file Contiene i test per l'oggetto customBubble.
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
	var customBubbleTest = Backbone.View.extend({
		el: '#customBubbleTest',
		initialize: function () {
			//Start executing customBubble's Tests
			var customBubble = new Swedesigner.model.bubbleDiagram.items.customBubble;
			Test.assert(customBubble != undefined, "customBubble è un oggetto esistente e rappresenta l'elemento custom bubble (bubble modificabile)", this.el);
			Test.assert(customBubble instanceof Swedesigner.model.bubbleDiagram.items.Base, "L'oggetto customBubble estende l'oggetto Swedesigner.model.bubbleDiagram.items.Base", this.el);
			Test.assert(customBubble.defaults.type == 'bubbleDiagram.items.customBubble', "L'oggetto customBubble è di tipo 'bubbleDiagram.items.customBubble'", this.el);
			Test.assert(customBubble.getValues() != undefined, "L'oggetto customBubble contiene un attributo 'values'", this.el);
			Test.assertProperties(customBubble.getValues(), ['_type', 'bubbleCode','comment'], "L'oggetto customBubble contiene gli attributi '_type', 'bubbleCode', 'comment'", this.el);
			Test.assert(customBubble.defaults.values._type == 'CUSTOM', "Il _type (tipo) di default di un oggetto customBubble è 'CUSTOM'", this.el);
			Test.assert(customBubble.defaults.values.comment == 'customBubbleName', "Il comment (nome,descrizione) di default di un oggetto customBubble è 'customBubbleName'", this.el);
		}
	});
	return new customBubbleTest;
});  
