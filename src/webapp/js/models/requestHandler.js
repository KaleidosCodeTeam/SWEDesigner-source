/**
 *  @file Contiene la classe RequestHandler.
 *  @author Bonolo Marco, Pezzuto Francesco, Sovilla Matteo - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/projectModel',
    'js/models/project'
], function ($, _, Backbone, joint, projectModel, project) {
    /**
     *  @classdesc Si occupa della gestione delle comunicazioni tra client e server (lato client).
     *  @module
     *  @class RequestHandler
     *  @extends {Backbone.Model}
     */
	var RequestHandler = Backbone.Model.extend({
        /**
         *  @function RequestHandler#generateJava
         *  @summary Salva il progetto correntemente aperto e crea una richiesta di generazione del relativo codice Java che invia al server.
         */
        generateJava: function() {
            projectModel.saveCurrentDiagram();
            var myProject = {};
            myProject.filename = 'projectname';
           	myProject.project = {};
            myProject.project.packages = project.packages;
            myProject.project.classes = project.classes;
            myProject.project.operations = project.operations;
            $.ajax({
            	url: 'http://localhost:3000/caricaJa?callback=?',
                dataType: "jsonp",
                data: JSON.stringify(myProject),
                //type: 'POST',
                jsonp: 'callback',
                success: function (data) {
                    console.log(data);
                    var ret = $.parseJSON(data);
                    $('#lblResponse').html(ret.nomezip);
                    console.log('Success: ')
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error);
                    $('#lblResponse').html('Error connecting to the server.');
                },
            });
        },
        /**
         *  @function RequestHandler#generateJavascript
         *  @summary Salva il progetto correntemente aperto e crea una richiesta di generazione del relativo codice Javascript che invia al server.
         */
        generateJavascript: function() {
            projectModel.saveCurrentDiagram();
            var myProject = {};
            myProject.filename = 'projectname';
           	myProject.project = {};
            myProject.project.packages = project.packages;
            myProject.project.classes = project.classes;
            myProject.project.operations = project.operations;
            $.ajax({
                url: 'http://localhost:3000/caricaJs?callback=?',
                dataType: "jsonp",
                data: JSON.stringify(myProject),
                //type: 'POST',
                jsonp: 'callback',
                success: function (data) {
                    console.log(data);
                    var ret = $.parseJSON(data);
                    $('#lblResponse').html(ret.nomezip);
                    console.log('Success: ')
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error);
                    $('#lblResponse').html('Error connecting to the server.');
                },
            });
        }
	});
	return new RequestHandler;
});
