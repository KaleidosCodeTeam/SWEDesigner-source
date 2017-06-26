define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/DAOclient',
    'js/models/items/swedesignerItems',
    'js/models/projectModel',
    'js/models/project'
], function ($, _, Backbone, joint, DAOclient, Swedesigner, projectModel,project) {
    /**
     * @class TitlebarModel
     * @classdesc Model della barra del titolo, si occupa di fornire i metodi necessari alla gestione delle funzionalità richieste alla barra del titolo.
     * @extends Backbone.Model
     */
	var titlebarModel = Backbone.Model.extend({

        /**
         * @function TitlebarModel#initialize
         * @summary Metodo di inizializzazione.
         */
		initialize: function() {
		},

        /**
         * @function TitlebarModel#newProject
         * @summary Dopo aver chiesto conferma all'utente, crea un nuovo progetto sovrascrivendo quello correntemente aperto.
         */
        newProject: function() {
            if (confirm("Il nuovo progetto sovrascriverà quello attualmente aperto. Sei sicuro?") === true) {
                project.packages.packagesArray = [];
                project.packages.dependenciesArray = [];
                project.classes.classesArray= [];
                project.classes.relationshipsArray= [];
                project.operations= [];
                projectModel.graph.resetCells([]);
                projectModel.currentDiagramType = 'packageDiagram';
                projectModel.currentDiagram = null;
                console.log('newProject created');
            } else {
                console.log('New project creation aborted');
            }
        },

        /**
         * @function TitlebarModel#openProject
         * @summary Invoca la funzione del DAO per l'apertura da file di un progetto.
         */
        openProject: function() {
            DAOclient.openProject();
        },

        /**
         * @function TitlebarModel#saveProject
         * @summary Invoca la funzione del DAO per il salvataggio del progetto corrente in un file nominato "newProject.swed".
         */
        saveProject: function() {
		    DAOclient.save('newProject.swed');
        },

        /**
         * @function TitlebarModel#saveProjectAs
         * @summary Estrae la stringa inserita dall'utente nella schermata per il salvataggio con nome e invoca la funzione del DAO per il salvataggio del progetto corrente in un file con il nome desiderato
         */
        saveProjectAs: function() {
		    var fName = document.getElementById("fileNameInput").value + ".swed";
            DAOclient.save(fName);
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
	return new titlebarModel;
});
