/**
 * Created by socs on 17/06/2017.
 */
define ([
    'jquery',
    'underscore',
    'jsonfn',
    'js/models/projectModel'
], function ($, _, jsonfn,projectModel) {

    var DAOclient = {};

    /**
     * @function DAOclient.save
     * @param {Object} data - Dati da salvare su file.
     * @param {string} fileName - Nome del file da scaricare.
     * @summary Converte i dati da salvare in formato JSON e li scarica tramite il browser.
     */
    DAOclient.save = function(data,fileName){
        var file = JSON.stringify(data); /*JSONfn.stringify(data);*/
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
            projectModel.project.projectPkgDiagram = JSON.parse(myFileRead); /*JSONfn.parse(myFileRead);*/
            projectModel.project.currentGraph = projectModel.project.projectPkgDiagram;
            console.log('project loaded');
        };
        reader.readAsText(myFile);
    };

    return DAOclient;
});