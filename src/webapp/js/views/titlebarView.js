define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/titlebarModel'
	/** ecc. */
], function ($, _, Backbone, joint, titlebarModel) {
    /**
     * @class TitlebarView
     * @classdesc View della barra del titolo, si occupa di gestire gli eventi ad essa associati invocando le apposite funzioni del model.
     * @extends Backbone.View
     */
	var titlebarView = Backbone.View.extend({
		el: 'body',
		events: {
			'click #openFile-button': 'openProject',
			'click #newProject': 'newProject',
			'click #saveProject': 'saveProject',
			'click #saveProjectAs-button': 'saveProjectAs',
			'click close-project': 'this.model.closeProject', //MAYBE NOT
			'click undo': 'this.model.undo',
			'click redo': 'this.model.redo',
			'click zoom-in': 'this.model.zoomIn',
			'click zoom-out': 'this.model.zoomOut',
			'click upper-layer': 'this.model.upperLayer', //MAYBE NOT
			'click lower-layer': 'this.model.lowerLayer', //MAYBE NOT
			'click generate-java': 'this.model.generateJava',
			'click generate-js': 'this.model.generateJavascript',
			'click view-generated-code': 'this.model.viewGeneratedCode'
		},
        /**
         * @function TitlebarView#initialize
         * @summary Metodo di inizializzazione.
         */
		initialize: function() {
			this.model = titlebarModel;
		},
		render: function() {
		},

        /**
         * @function TitlebarView#openProject
         * @param event
         * @summary Fornisce informazioni utili al debug mediante console.log e invoca la funzione corrispondente nel model.
         */
		openProject: function (event) {
			console.log(event.currentTarget);
			titlebarModel.openProject();
		},

        /**
         * @function TitlebarView#newProject
         * @param event
         * @summary Fornisce informazioni utili al debug mediante console.log e invoca la funzione corrispondente nel model.
         */
        newProject: function (event) {
            console.log(event.currentTarget);
            titlebarModel.newProject();
        },

        /**
         * @function TitlebarView#saveProject
         * @param event
         * @summary Fornisce informazioni utili al debug mediante console.log e invoca la funzione corrispondente nel model.
         */
        saveProject: function (event) {
            console.log(event.currentTarget);
            titlebarModel.saveProject();
        },

        /**
         * @function TitlebarView#saveProjectAs
         * @param event
         * @summary Fornisce informazioni utili al debug mediante console.log e invoca la funzione corrispondente nel model.
         */
        saveProjectAs: function (event) {
            console.log(event.currentTarget);
            titlebarModel.saveProjectAs();
        }
	});
	return new titlebarView;
});
