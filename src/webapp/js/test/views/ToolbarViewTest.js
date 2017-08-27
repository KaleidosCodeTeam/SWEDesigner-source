/*
 *  @file Contiene i test per l'oggetto ToolbarView.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/views/toolbarView',
    'js/test/test'
], function ($, _, Backbone, joint, ToolbarView, Test) {
	var ToolbarViewTest = Backbone.View.extend({
		el: '#ToolbarViewTest',
		initialize: function () {
			//Start executing ToolbarView's Tests
			Test.assert(ToolbarView != undefined, "ToolbarView è un oggetto esistente e rappresenta la view della barra degli strumenti laterale", this.el);
			Test.assert(ToolbarView instanceof Backbone.View, "L'oggetto ToolbarView estende l'oggetto Backbone.View", this.el);
			Test.assert(ToolbarView.el != undefined, "L'oggetto ToolbarView contiene l'attributo el", this.el);
			Test.assert(ToolbarView.events != undefined, "L'oggetto ToolbarView contiene l'attributo events", this.el);
			Test.assert(typeof ToolbarView.initialize === "function", "L'oggetto ToolbarView contiene la funzione initialize", this.el);
			Test.assert(typeof ToolbarView.render === "function", "L'oggetto ToolbarView contiene la funzione render", this.el);
			Test.assert(typeof ToolbarView.addElement === "function", "L'oggetto ToolbarView contiene la funzione addElement", this.el);
		}
	});
	return new ToolbarViewTest;
});  
