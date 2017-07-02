/**
 *  @file Contiene la classe TitlebarView e ne ritorna una istanza.
 *  @author Sovilla Matteo - KaleidosCode
 */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/titlebarModel'
], function ($, _, Backbone, joint, titlebarModel) {
    /**
     *  @classdesc View della barra del titolo. Si occupa di gestire gli eventi ad essa associati invocando le apposite funzioni del model.
     *  @module
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
			//'click view-generated-code': 'viewGeneratedCode'
		},
        /**
         *  @function TitlebarView#initialize
         *  @summary Inizializzazione della TitlebarView.
         */
		initialize: function() {
			this.model = titlebarModel;
		},
        /**
         *  @function TitlebarView#render
         *  @summary Render della titlebar.
         */
		render: function() {},
        /**
         *  @function TitlebarView#openProject
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Apre un progetto invocando il rispettivo metodo di TitlebarModel.
         */
		openProject: function(event) {
			//console.log(event.currentTarget);
			titlebarModel.openProject();
		},
        /**
         *  @function TitlebarView#newProject
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Crea un nuovo progetto invocando il rispettivo metodo di TitlebarModel.
         */
        newProject: function(event) {
            //console.log(event.currentTarget);
            titlebarModel.newProject();
        },
        /**
         *  @function TitlebarView#saveProject
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Salva il progetto correntemente aperto invocando il rispettivo metodo di TitlebarModel.
         */
        saveProject: function(event) {
            //console.log(event.currentTarget);
            titlebarModel.saveProject();
        },
        /**
         *  @function TitlebarView#saveProjectAs
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Salva il progetto correntemente aperto con nome specificato dall'utente invocando il rispettivo metodo di TitlebarModel.
         */
        saveProjectAs: function(event) {
            //console.log(event.currentTarget);
            titlebarModel.saveProjectAs();
        },
        /**
         *  @function TitlebarView#generateJava
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Richiede al server di generare il codice in linguaggio Java del progetto correntemente aperto invocando il rispettivo metodo di TitlebarModel.
         */
        generateJava: function(event) {
            //console.log(event.currentTarget);
            titlebarModel.generateJava();
        },
        /**
         *  @function TitlebarView#generateJavascript
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Richiede al server di generare il codice in linguaggio Javascript del progetto correntemente aperto invocando il rispettivo metodo di TitlebarModel.
         */
        generateJavascript: function(event) {
            //console.log(event.currentTarget);
            titlebarModel.generateJavascript();
        }
	});
	return new TitlebarView;
});
