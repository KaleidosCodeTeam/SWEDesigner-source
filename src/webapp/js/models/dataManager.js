/**
 *  @file Contiene la classe DataManager.
 *  @author Sovilla Matteo - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'js/models/projectModel',
    'js/models/project',
    'js/views/pathView'
], function ($, _, projectModel, project, pathView) {
    /** @namespace client::DataManager */
    var DataManager = {};
    /**
     *  @function client::DataManager.save
     *  @param {string} fileName - Nome del file generato da scaricare.
     *  @summary Salva i dati del progetto, li converte in formato JSON e avvia la procedura di download in locale del browser.
     */
    DataManager.save = function(fileName){
        projectModel.saveCurrentDiagram();
        var myProject = {};
        if (!fileName) {
            if (document.getElementById("fileNameInput").value) fileName = document.getElementById("fileNameInput").value + ".swed";
            else fileName = "newProject.swed";
        }
        myProject.packages = project.packages;
        myProject.classes = project.classes;
        myProject.operations = project.operations;
        var file = JSON.stringify(myProject);
        //console.log(file);
        var myBlob = new Blob([file], {type: "application/octet-stream"});
        var reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById("lnkDownload").href = event.target.result;
            document.getElementById("lnkDownload").download = fileName;
            document.getElementById("lnkDownload").click();
        };
        reader.readAsDataURL(myBlob);
    };
    /**
     *  @function client::DataManager.openProject
     *  @summary Legge un file JSON e ne salva il contenuto in project e nel projectModel come progetto attualmente aperto.
     */
    DataManager.openProject = function() {
        //console.log('DataManager.openProject');
        var myFile = document.getElementById("selectedFile").files[0];
        var v = document.getElementById("selectedFile").files[0].name.split(".");
        if (v[v.length-1] === "swed") {
	        var myFileRead = {};
	        var reader = new FileReader();
	        reader.onload = function(event) {
                try {
    	            myFileRead = event.target.result;
    	            //console.log(myFileRead);
    	            var myProject = JSON.parse(myFileRead);
    	            //console.log(myProject);
    	            //console.log(myProject.packages);
    	            project.packages = myProject.packages;
    	            project.classes = myProject.classes;
    	            project.operations = myProject.operations;
    	            projectModel.currentDiagramType = 'packageDiagram';
    	            projectModel.currentDiagram = null;
    	            projectModel.graph.resetCells(project.packages.packagesArray.concat(project.packages.dependenciesArray));
    	            projectModel.itemToBeAdded = null;
    	            projectModel.members.attributes = [];
    	            projectModel.members.methods = [];
    	            projectModel.currentPath = [];
    	            projectModel.graphSwitched();
    	            console.log('Project successfully loaded');
                } catch (e) {
                    console.log('Error while reading file');
                    window.alert('ERRORE: Il file è danneggiato o contiene errori');
                }
	        };
	        reader.readAsText(myFile);
	    } else {
	    	console.log('File extension wrong');
            window.alert('ERRORE: Il file in input non ha estensione .swed');
	    }
    };
    /**
     *  @function client::DataManager.newProject
     *  @summary Dopo aver chiesto conferma all'utente, crea un nuovo progetto sovrascrivendo quello correntemente aperto.
     */
    DataManager.newProject = function() {
        if (confirm("Il nuovo progetto sovrascriverà quello attualmente aperto. Vuoi salvare prima di creare un nuovo progetto?") === true) {
            DataManager.save();
            project.packages.packagesArray = [];
            project.packages.dependenciesArray = [];
            project.classes.classesArray= [];
            project.classes.relationshipsArray= [];
            project.operations= [];
            projectModel.graph.resetCells([]);
            projectModel.currentDiagramType = 'packageDiagram';
            projectModel.currentDiagram = null;
            projectModel.itemToBeAdded = null;
            projectModel.members.attributes = [];
            projectModel.members.methods = [];
            projectModel.currentPath = [];
            projectModel.graphSwitched();
            console.log('New project created');
        } else if (confirm("Vuoi creare un nuovo progetto senza salvare?") === true) {
            project.packages.packagesArray = [];
            project.packages.dependenciesArray = [];
            project.classes.classesArray= [];
            project.classes.relationshipsArray= [];
            project.operations= [];
            projectModel.graph.resetCells([]);
            projectModel.currentDiagramType = 'packageDiagram';
            projectModel.currentDiagram = null;
            projectModel.itemToBeAdded = null;
            projectModel.members.attributes = [];
            projectModel.members.methods = [];
            projectModel.currentPath = [];
            projectModel.graphSwitched();
            console.log('New project created');
        } else {
            console.log('New project creation aborted');
        }
    };
    return DataManager;
});
