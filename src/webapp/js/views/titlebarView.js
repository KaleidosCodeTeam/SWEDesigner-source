define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/TitlebarModel'
	//'js/views/' riferimento alla view principale del progetto 
	/** ecc. */
], function ($, _, Backbone, joint, TitlebarModel) {
	var TitlebarView = Backbone.View.extend({
		el: 'titlebar',
		events: {
			'click new-project': newProject,
			'click open-project': openProject,
			'click save-project': saveProject,
			'click save-poject-with-name': saveProjectWithName,
			'click close-project': closeProject, //MAYBE NOT
			'click undo': undo,
			'click redo': redo,
			'click zoom-in': zoomIn,
			'click zoom-out': zoomOut,
			'click upper-layer': upperLayer, //MAYBE NOT
			'click lower-layer': lowerLayer, //MAYBE NOT
			'click generate-java': generateJava,
			'click generate-js': generateJavascript,
			'click view-generated-code': viewGeneratedCode, 
		},
		initialize: function() {
			this.model = new TitlebarModel();
		},
		render: function() {
		},
		function newProject() {
		},
		function openProject() {
		},
		function saveProject() {
		},
		function saveProjectWithName() {
		},
		function closeProject() { //MAYBE NOT
		},
		function undo() {
		},
		function redo() {
		},
		function zoomIn() {
		},
		function zoomOut() {
		},
		function upperLayer() { //MAYBE NOT
		},
		function lowerLayer() { //MAYBE NOT
		},
		function generateJava() {
		},
		function generateJavascript() {
		},
		function viewGeneratedCode() {
		}
	)};
	return TitlebarView;
});