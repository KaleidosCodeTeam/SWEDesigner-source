/**
 *  @file Contiene la classe statica DAOclient.
 *  @author Sovilla Matteo - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'js/models/projectModel',
    'js/models/project',
    'js/views/projectView',
    'js/views/editPanelView'
], function ($, _, projectModel,project,projectView,editPanelView) {

    var DAOclient = {};
    /**
     *  @function DAOclient.save
     *  @param {string} fileName - Nome del file generato da scaricare.
     *  @summary Salva i dati del progetto, li converte in formato JSON e avvia la procedura di download in locale del browser.
     */
    DAOclient.save = function(fileName){
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
     * @function DAOclient#saveAs
     * @summary Estrae la stringa inserita dall'utente nella schermata per il salvataggio con nome e invoca la funzione del DAO per il salvataggio del progetto corrente in un file con il nome desiderato
     */
    DAOclient.saveAs = function() {
        var fName = document.getElementById("fileNameInput").value + ".swed";
        DAOclient.save(fName);
    };
    /**
     *  @function DAOclient.openProject
     *  @summary Legge un file JSON e ne salva il contenuto in project e nel projectModel come progetto attualmente aperto.
     */
    DAOclient.openProject = function() {
        console.log('DAOClient openProj');
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
     * @function DAOclient#newProject
     * @summary Dopo aver chiesto conferma all'utente, crea un nuovo progetto sovrascrivendo quello correntemente aperto.
     */
    DAOclient.newProject = function() {
        if (confirm("Il nuovo progetto sovrascriverà quello attualmente aperto. Sei sicuro?") === true) {
            project.packages.packagesArray = [];
            project.packages.dependenciesArray = [];
            project.classes.classesArray= [];
            project.classes.relationshipsArray= [];
            project.operations= [];
            projectModel.graph.resetCells([]);
            projectModel.currentDiagramType = 'packageDiagram';
            projectModel.currentDiagram = null;
            projectView.paper.selectedCell = null;              // SBAGLIATE
            editPanelView.render();                             // SBAGLIATE
            projectModel.graphSwitched();
            console.log('newProject created');
        } else {
            console.log('New project creation aborted');
        }
    };

    return DAOclient;
});
