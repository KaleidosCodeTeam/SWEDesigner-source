/**
 * Created by socs on 17/06/2017.
 */
define ([
    'jquery',
    'underscore',
    'jsonfn'
], function ($, _, jsonfn) {
var DAOclient = {};
    /**
     * @function DAOclient.save
     * @param {Object} data - Dati da salvare su file.
     * @param {string} fileName - Nome del file da scaricare.
     * @summary Converte i dati da salvare in formato JSON e li scarica tramite il browser.
     */
    DAOclient.save = (function () {
    var a = document.createElement("a");
    a.style = "display: none";
    document.body.appendChild(a);
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

DAOclient.open = function() {

};
return DAOclient;
});