/*
 *  @file Contiene i test per l'oggetto DataManager.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/dataManager',
    'js/test/test'
], function ($, _, Backbone, joint, DataManager, Test) {
	var DataManagerTest = Backbone.View.extend({
		el: '#DataManagerTest',
		initialize: function () {
			//Start executing DataManager's Tests
			Test.assert(DataManager != undefined, "DataManager è un oggetto esistente e rappresenta il model che permette di effettuare le operazioni di apertura e salvataggio del progetto", this.el);
			Test.assert(typeof DataManager.save === "function", "L'oggetto DataManager contiene la funzione save", this.el);
			Test.assert(typeof DataManager.openProject === "function", "L'oggetto DataManager contiene la funzione openProject", this.el);
			Test.assert(typeof DataManager.newProject === "function", "L'oggetto DataManager contiene la funzione newProject", this.el);
		}
	});
	return new DataManagerTest;
});  
