/**
 *  @file Contiene la classe MainView.
 *  @author Bonolo Marco, Pezzuto Francesco, Sovilla Matteo - KaleidosCode
 */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/views/titlebarView',
	'js/views/toolbarView',
	'js/views/pathView',
	'js/views/editPanelView',
	'js/views/projectView'
], function ($, _, Backbone, joint, TitlebarView, ToolbarView, PathView, EditPanelView, ProjectView) {
	/**
     *  @classdesc View principale che imposta e memorizza un'istanza delle views delle sotto-componenti.
     *  @module client.views
     *  @class MainView
     *  @extends {Backbone.View}
     */
	var MainView = Backbone.View.extend({
		/**
         *  @var {Object} MainView#views - Oggetto contenente un'istanza di view di ogni sotto-componente.
         */
		views: {
			projectView: {},
			titleBarView: {},
			toolbarView: {},
			pathView: {},
			editPanelView: {}
		},
		/**
         *  @function MainView#initialize
         *  @summary Inizializzazione della MainView.
         */
		initialize: function() {
			console.log("MainView initialized");
			this.views.projectView = ProjectView;
			this.views.titlebarView = TitlebarView;
			this.views.toolbarView = ToolbarView;
			this.views.pathView = PathView;
			this.views.editPanelView = EditPanelView;
		}
	});
	return new MainView;
});
