/**
 *  @file Contiene i test per l'oggetto ToolbarModel.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/toolbarModel',
    'js/test/test'
], function ($, _, Backbone, joint, ToolbarModel, Test) {
	var ToolbarModelTest = Backbone.View.extend({
		el: '#ToolbarModelTest',
		initialize: function () {
			//Start executing ToolbarModel's Tests
			Test.assert(ToolbarModel != undefined, "ToolbarModel è un oggetto esistente e rappresenta il model che si occupa della barra degli strumenti laterale", this.el);
			Test.assert(ToolbarModel instanceof Backbone.Model, "L'oggetto ToolbarModel estende l'oggetto Backbone.Model", this.el);
			Test.assert(ToolbarModel.items != undefined, "L'oggetto ToolbarModel contiene l'attributo items", this.el);
			Test.assert(typeof ToolbarModel.initialize === "function", "L'oggetto ToolbarModel contiene la funzione initialize", this.el);
			Test.assert(typeof ToolbarModel.getCurrentDiagram === "function", "L'oggetto ToolbarModel contiene la funzione getCurrentDiagram", this.el);
			Test.assert(typeof ToolbarModel.createItems === "function", "L'oggetto ToolbarModel contiene la funzione createItems", this.el);
			Test.assert(typeof ToolbarModel.addElement === "function", "L'oggetto ToolbarModel contiene la funzione addElement", this.el);
		}
	});
	return new ToolbarModelTest;
});  
