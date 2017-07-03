/**
 *  @file Contiene la classe statica DAOclient.
 *  @author Sovilla Matteo - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'js/models/projectModel',
    'js/models/project'
], function ($, _, projectModel, project) {
    /** @namespace */
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
     *  @function DAOclient.keyPaired
     *  @param {Object[]} array - Array di oggetti.
     *  @return Copia dell'array passato come parametro in input.
     *  @summary Esegue la copia dei dati di un array in uno nuovo che ritorna al termine.
     *  @ignore
     */
    DAOclient.keyPaired = function(array) {
        var newArray = [];
        var i = 0;
        for (var el in array) {
            newArray[i] = el;
            i++;
        }
        return newArray;
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
    return DAOclient;
});
