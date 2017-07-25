/**
 *  @file Contiene la classe TitlebarView.
 *  @author Sovilla Matteo - KaleidosCode
 */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/dataManager',
    'js/models/requestHandler'
], function ($, _, Backbone, joint, dataManager, requestHandler) {
    /**
     *  @classdesc View della barra del titolo. Si occupa di gestire gli eventi ad essa associati invocando le apposite funzioni del model.
     *  @module client.views
     *  @class TitlebarView
     *  @extends {Backbone.View}
     */
	var TitlebarView = Backbone.View.extend({
        /**
         *  @var {string} TitlebarView#el - Il tag HTML popolato dalla titlebar.
         */
		el: 'body',
        /**
         *  @var {Object} TitlebarView#events - Gli eventi verificabili nella titlebar.
         */
		events: {
			'click #openFile-button': 'openProject',
			'click #newProject': 'newProject',
			'click #saveProject': 'saveProject',
			'click #saveProjectAs-button': 'saveProjectAs',
			//'click undo': 'undo',                          // @todo
			//'click redo': 'redo',                          // @todo
			//'click zoom-in': 'zoomIn',                     // @todo
			//'click zoom-out': 'zoomOut',                   // @todo
			//'click upper-layer': 'upperLayer',             // @todo
			//'click lower-layer': 'lowerLayer',             // @todo
			'click #generate-java': 'generateJava',
			'click #generate-js': 'generateJavascript'
		},
        /**
         *  @function TitlebarView#openProject
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Apre un progetto invocando il rispettivo metodo di DataManager.
         */
		openProject: function(event) {
			//console.log(event.currentTarget);
            dataManager.openProject();
		},
        /**
         *  @function TitlebarView#newProject
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Crea un nuovo progetto invocando il rispettivo metodo di DataManager.
         */
        newProject: function(event) {
            //console.log(event.currentTarget);
            dataManager.newProject();
        },
        /**
         *  @function TitlebarView#saveProject
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Salva il progetto correntemente aperto invocando il rispettivo metodo di DataManager.
         */
        saveProject: function(event) {
            //console.log(event.currentTarget);
            dataManager.save();
        },
        /**
         *  @function TitlebarView#saveProjectAs
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Salva il progetto correntemente aperto con nome specificato dall'utente invocando il rispettivo metodo di DataManager.
         */
        saveProjectAs: function(event) {
            //console.log(event.currentTarget);
            dataManager.save();
        },
        /**
         *  @function TitlebarView#generateJava
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Richiede al server di generare il codice in linguaggio Java del progetto correntemente aperto invocando il rispettivo metodo di RequestHandler.
         */
        generateJava: function(event) {
            //console.log(event.currentTarget);
            requestHandler.generateJava();
        },
        /**
         *  @function TitlebarView#generateJavascript
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Richiede al server di generare il codice in linguaggio Javascript del progetto correntemente aperto invocando il rispettivo metodo di RequestHandler.
         */
        generateJavascript: function(event) {
            //console.log(event.currentTarget);
            requestHandler.generateJavascript();
        }
	});
	return new TitlebarView;
});
