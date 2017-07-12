/**
 *  @file Contiene i test per l'oggetto RequestHandler.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/requestHandler',
    'js/test/test'
], function ($, _, Backbone, joint, RequestHandler, Test) {
	var RequestHandlerTest = Backbone.View.extend({
		el: '#RequestHandlerTest',
		initialize: function () {
			//Start executing RequestHandler's Tests
			Test.assert(RequestHandler != undefined, "RequestHandler è un oggetto esistente e rappresenta il model che si occupa della comunicazione tra client e server", this.el);
			Test.assert(RequestHandler instanceof Backbone.Model, "L'oggetto RequestHandler estende l'oggetto Backbone.Model", this.el);
			Test.assert(typeof RequestHandler.generateJava === "function", "L'oggetto RequestHandler contiene la funzione generateJava", this.el);
			Test.assert(typeof RequestHandler.generateJavascript === "function", "L'oggetto RequestHandler contiene la funzione generateJavascript", this.el);
		}
	});
	return new RequestHandlerTest;
});  
