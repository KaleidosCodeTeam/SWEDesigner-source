/*
 *  @file Contiene i test per l'oggetto bubbleReturn.
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
	var bubbleReturnTest = Backbone.View.extend({
		el: '#bubbleReturnTest',
		initialize: function () {
			//Start executing bubbleReturn's Tests
			var bubbleReturn = new Swedesigner.model.bubbleDiagram.items.bubbleReturn;
			Test.assert(bubbleReturn != undefined, "bubbleReturn è un oggetto esistente e rappresenta l'elemento di ritorno (return)", this.el);
			Test.assert(bubbleReturn instanceof Swedesigner.model.bubbleDiagram.items.Base, "L'oggetto bubbleReturn estende l'oggetto Swedesigner.model.bubbleDiagram.items.Base", this.el);
			Test.assert(bubbleReturn.defaults.type == 'bubbleDiagram.items.bubbleReturn', "L'oggetto bubbleReturn è di tipo 'bubbleDiagram.items.bubbleReturn'", this.el);
			Test.assert(bubbleReturn.getValues() != undefined, "L'oggetto bubbleReturn contiene un attributo 'values'", this.el);
			Test.assertProperties(bubbleReturn.getValues(), ['_type', 'value', 'comment'], "L'oggetto bubbleReturn contiene gli attributi '_type', 'value', 'comment'", this.el);
			Test.assert(bubbleReturn.defaults.values._type == 'RETURN', "Il _type (tipo) di default di un oggetto bubbleReturn è 'RETURN'", this.el);
			Test.assert(bubbleReturn.defaults.values.comment == 'bubbleReturn', "Il comment (nome,descrizione) di default di un oggetto bubbleReturn è 'bubbleReturn'", this.el);
		}
	});
	return new bubbleReturnTest;
});  
