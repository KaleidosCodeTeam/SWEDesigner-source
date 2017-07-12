/**
 *  @file Contiene i test per l'oggetto PathView.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/views/pathView',
    'js/test/test'
], function ($, _, Backbone, joint, PathView, Test) {
	var PathViewTest = Backbone.View.extend({
		el: '#PathViewTest',
		initialize: function () {
			//Start executing PathView's Tests
			Test.assert(PathView != undefined, "PathView è un oggetto esistente e rappresenta la view del breadcrumb che permette gli spostamenti tra i vari diagrammi", this.el);
			Test.assert(PathView instanceof Backbone.View, "L'oggetto PathView estende l'oggetto Backbone.View", this.el);
			Test.assert(PathView.el != undefined, "L'oggetto PathView contiene l'attributo el", this.el);
			Test.assert(PathView.events != undefined, "L'oggetto PathView contiene l'attributo events", this.el);
			Test.assert(typeof PathView.initialize === "function", "L'oggetto PathView contiene la funzione initialize", this.el);
			Test.assert(typeof PathView.render === "function", "L'oggetto PathView contiene la funzione render ", this.el);
			Test.assert(typeof PathView.switchDiagram === "function", "L'oggetto PathView contiene la funzione switchDiagram", this.el);
		}
	});
	return new PathViewTest;
});  
