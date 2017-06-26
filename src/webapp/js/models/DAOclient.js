/**
 * Created by socs on 17/06/2017.
 */
define ([
    'jquery',
    'underscore',
    'js/models/projectModel',
    'js/models/project'
], function ($, _, projectModel,project) {

    var DAOclient = {};

    /**
     * @function DAOclient.save
     * @param {Object} data - Dati da salvare su file.
     * @param {string} fileName - Nome del file da scaricare.
     * @summary Converte i dati da salvare in formato JSON e li scarica tramite il browser.
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
     * @function DAOclient.openProject
     * @param {Object} mod - mainModel dell'applicazione.
     * @summary Legge un file JSON e ne salva il contenuto in mainModel come progetto attualmente aperto.
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
            // projectModel.graph.resetCells(project.packages.packagesArray.concat(project.packages.relationshipsArray));
            console.log('project loaded');
        };
        reader.readAsText(myFile);

    };

    return DAOclient;
});
