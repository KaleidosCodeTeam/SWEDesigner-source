/*
 *  @file Contiene i test per l'oggetto EditPanelView.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/views/editPanelView',
    'js/test/test'
], function ($, _, Backbone, joint, EditPanelView, Test) {
	var EditPanelViewTest = Backbone.View.extend({
		el: '#EditPanelViewTest',
		initialize: function () {
			//Start executing EditPanelView's Tests
			Test.assert(EditPanelView != undefined, "EditPanelView è un oggetto esistente e rappresenta la view del pannello che permette di modificare i valori degli oggetti di Swedesigner", this.el);
			Test.assert(EditPanelView instanceof Backbone.View, "L'oggetto EditPanelView estende l'oggetto Backbone.View", this.el);
			Test.assert(EditPanelView.tagName != undefined, "L'oggetto EditPanelView contiene l'attributo tagName", this.el);
			Test.assert(EditPanelView.el != undefined, "L'oggetto EditPanelView contiene l'attributo el", this.el);
			Test.assert(EditPanelView.currentTemplate != undefined, "L'oggetto EditPanelView contiene l'attributo currentTemplate", this.el);
			Test.assert(EditPanelView.events != undefined, "L'oggetto EditPanelView contiene l'attributo events", this.el);
			Test.assert(typeof EditPanelView.initialize === "function", "L'oggetto EditPanelView contiene la funzione initialize", this.el);
			Test.assert(typeof EditPanelView.reset === "function", "L'oggetto EditPanelView contiene la funzione reset", this.el);
			Test.assert(typeof EditPanelView.render === "function", "L'oggetto EditPanelView contiene la funzione render ", this.el);
			Test.assert(typeof EditPanelView.switch === "function", "L'oggetto EditPanelView contiene la funzione switch", this.el);
			Test.assert(typeof EditPanelView.save === "function", "L'oggetto EditPanelView contiene la funzione save", this.el);
			Test.assert(typeof EditPanelView.execCommand === "function", "L'oggetto EditPanelView contiene la funzione execCommand", this.el);
			Test.assert(typeof EditPanelView.unembedCell === "function", "L'oggetto EditPanelView contiene la funzione unembedCell", this.el);
			Test.assert(typeof EditPanelView.confirmEdit === "function", "L'oggetto EditPanelView contiene la funzione confirmEdit", this.el);
		}
	});
	return new EditPanelViewTest;
});  
