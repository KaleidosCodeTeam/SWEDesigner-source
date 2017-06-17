/**
 * Created by socs on 17/06/2017.
 */
define ([
    'jquery',
    'underscore',
    'jsonfn',
    'js/models/mainModel'
], function ($, _, jsonfn,mainModel) {
var DAOclient = {};
    /**
     * @function DAOclient.save
     * @param {Object} data - Dati da salvare su file.
     * @param {string} fileName - Nome del file da scaricare.
     * @summary Converte i dati da salvare in formato JSON e li scarica tramite il browser.
     */
    DAOclient.saveProject = (function () {
        var a = document.createElement("a");
        a.style = "display: none";
        document.body.appendChild(a);
        return function (data, fileName) {
            var json = jsonfn.stringify(data),
                blob = new Blob([json], {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

DAOclient.openProject = function(mod) {
    myFile = document.getElementById("selectedFile").files[0];
    var myFileRead = {};
    var reader = new FileReader();
    reader.onload = function(event) {
        myFileRead = event.target.result;
        mod.project.projectPkgDiagram = {}; /*JSONfn.parse(myFileRead)*/
        mod.project.currentGraph = mod.project.projectPkgDiagram;
        console.log('project loaded');
    };
    reader.readAsText(myFile);
};
return DAOclient;
});