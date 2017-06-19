define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/DAOclient'
], function ($, _, Backbone, joint, DAOclient) {
    /**
     * @class TitlebarModel
     * @classdesc Model della barra del titolo, si occupa di fornire i metodi necessari alla gestione delle funzionalità richieste alla barra del titolo.
     * @extends Backbone.Model
     */
	var titlebarModel = Backbone.Model.extend({
		projModel: {},

        /**
         * @function TitlebarModel#initialize
         * @param param
         * @summary Metodo di inizializzazione.
         */
		initialize: function(param) {
            this.projModel = param.projModel;
            console.log(this.projModel);
		},

        /**
         * @function TitlebarModel#newProject
         * @summary
         */
        newProject: function() {
		    console.log('newProject clicked [model]');
        },

        /**
         * @function TitlebarModel#openProject
         * @summary Invoca la funzione del DAO per l'apertura da file di un progetto.
         */
        openProject: function() {
            console.log('titleBarModel openProj ='+this.projModel);
            DAOclient.openProject(this.projModel);
        },

        /**
         * @function TitlebarModel#saveProject
         * @summary Invoca la funzione del DAO per il salvataggio del progetto corrente in un file nominato "newProject.swed".
         */
        saveProject: function() {
		    DAOclient.save(this.projModel.project.projectPkgDiagram,'newProject.swed');
        },

        /**
         * @function TitlebarModel#saveProjectAs
         * @summary Estrae la stringa inserita dall'utente nella schermata per il salvataggio con nome e invoca la funzione del DAO per il salvataggio del progetto corrente in un file con il nome desiderato
         */
        saveProjectAs: function() {
		    var fName = document.getElementById("fileNameInput").value + ".swed";
            DAOclient.save(this.projModel.project.projectPkgDiagram,fName);
        },
        closeProject: function() { //MAYBE NOT
        },
        undo: function() {
        },
        redo: function() {
        },
        zoomIn: function() {
        },
        zoomOut: function() {
        },
        upperLayer: function() { //MAYBE NOT
        },
        lowerLayer: function() { //MAYBE NOT
        },
        generateJava: function() {
        },
        generateJavascript: function() {
        },
        viewGeneratedCode: function() { //MAYBE NOT
        }
	});
	return titlebarModel;
});
