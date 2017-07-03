/**
 *  @file Contiene la classe statica dataManager.
 *  @author Sovilla Matteo - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'js/models/projectModel',
    'js/models/project'
], function ($, _, projectModel,project) {

    var dataManager = {};
    /**
     *  @function dataManager.save
     *  @param {string} fileName - Nome del file generato da scaricare.
     *  @summary Salva i dati del progetto, li converte in formato JSON e avvia la procedura di download in locale del browser.
     */
    dataManager.save = function(fileName){
        projectModel.saveCurrentDiagram();
        var myProject = {};
        myProject.packages = project.packages;
        myProject.classes = project.classes;
        myProject.operations = project.operations;
        var file = JSON.stringify(myProject);
        console.log(file);
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
     * @function dataManager#saveAs
     * @summary Estrae la stringa inserita dall'utente nella schermata per il salvataggio con nome e invoca la funzione del DAO per il salvataggio del progetto corrente in un file con il nome desiderato
     */
    dataManager.saveAs = function() {
        var fName = document.getElementById("fileNameInput").value + ".swed";
        dataManager.save(fName);
    };
    /**
     *  @function dataManager.openProject
     *  @summary Legge un file JSON e ne salva il contenuto in project e nel projectModel come progetto attualmente aperto.
     */
    dataManager.openProject = function() {
        console.log('dataManager openProj');
        var myFile = document.getElementById("selectedFile").files[0];
        var myFileRead = {};
        var reader = new FileReader();
        reader.onload = function(event) {
            myFileRead = event.target.result;
            console.log(myFileRead);
            var myProject = JSON.parse(myFileRead);
            console.log(myProject);
            console.log(myProject.packages);
            project.packages = myProject.packages;
            project.classes = myProject.classes;
            project.operations = myProject.operations;
            projectModel.currentDiagramType = 'packageDiagram';
            projectModel.currentDiagram = null;
            projectModel.graph.resetCells(project.packages.packagesArray.concat(project.packages.dependenciesArray));
            projectModel.graphSwitched();
            console.log('project loaded');
        };
        reader.readAsText(myFile);
    };

    /**
     * @function dataManager#newProject
     * @summary Dopo aver chiesto conferma all'utente, crea un nuovo progetto sovrascrivendo quello correntemente aperto.
     */
    dataManager.newProject = function() {
        if (confirm("Il nuovo progetto sovrascriverà quello attualmente aperto. Sei sicuro?") === true) {
            project.packages.packagesArray = [];
            project.packages.dependenciesArray = [];
            project.classes.classesArray= [];
            project.classes.relationshipsArray= [];
            project.operations= [];
            projectModel.graph.resetCells([]);
            projectModel.currentDiagramType = 'packageDiagram';
            projectModel.currentDiagram = null;
            projectModel.graphSwitched();
            console.log('newProject created');
        } else {
            console.log('New project creation aborted');
        }
    };

    return dataManager;
});
