/*
 *  @file Contiene i test per l'oggetto TitlebarView.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/views/titlebarView',
    'js/test/test'
], function ($, _, Backbone, joint, TitlebarView, Test) {
	var TitlebarViewTest = Backbone.View.extend({
		el: '#TitlebarViewTest',
		initialize: function () {
			//Start executing TitlebarView's Tests
			Test.assert(TitlebarView != undefined, "TitlebarView è un oggetto esistente e rappresenta la view dei comandi relativi al progetto (apertura, salvataggio)", this.el);
			Test.assert(TitlebarView instanceof Backbone.View, "L'oggetto TitlebarView estende l'oggetto Backbone.View", this.el);
			Test.assert(TitlebarView.el != undefined, "L'oggetto TitlebarView contiene l'attributo el", this.el);
			Test.assert(TitlebarView.events != undefined, "L'oggetto TitlebarView contiene l'attributo events", this.el);
			Test.assert(typeof TitlebarView.openProject === "function", "L'oggetto TitlebarView contiene la funzione openProject", this.el);
			Test.assert(typeof TitlebarView.newProject === "function", "L'oggetto TitlebarView contiene la funzione newProject", this.el);
			Test.assert(typeof TitlebarView.saveProject === "function", "L'oggetto TitlebarView contiene la funzione saveProject", this.el);
			Test.assert(typeof TitlebarView.saveProjectAs === "function", "L'oggetto TitlebarView contiene la funzione saveProjectAs", this.el);
			Test.assert(typeof TitlebarView.generateJava === "function", "L'oggetto TitlebarView contiene la funzione generateJava", this.el);
			Test.assert(typeof TitlebarView.generateJavascript === "function", "L'oggetto TitlebarView contiene la funzione generateJavascript", this.el);
		}
	});
	return new TitlebarViewTest;
});  
