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
     *  @module client.models
     *  @class client::RequestHandler
     *  @extends {Backbone.Model}
     */
	var RequestHandler = Backbone.Model.extend({
        /**
         *  @function client::RequestHandler#generateJava
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
            /*$.ajax({
            	url: 'http://localhost:3000/caricaJa?callback=?',
                dataType: "jsonp",
                data: JSON.stringify(myProject),
                //type: 'POST',
                jsonp: 'callback',
                success: function (data) {
                    console.log(data);
                    var ret = $.parseJSON(data);
                    var a = document.createElement("a");
					document.body.appendChild(a);
					a.style = "display: none";
					a.href = "http://localhost/SWEDesigner-source/src/server/codeGenerator/"+ret.nomezip+".zip";
					a.download = ret.nomezip+".zip";
					a.click();
					document.body.removeChild(a);
                    $('#lblResponse').html(ret.nomezip);
                    console.log('Success: ')
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error);
                    $('#lblResponse').html('Error connecting to the server.');
                },
            });*/
			var iframe = document.createElement("iframe");
			document.body.appendChild(iframe);
			iframe.style.display = "none";
			var frame_name = "frame_name";
			iframe.contentWindow.name = frame_name;
			var form = document.createElement("form");
			form.target = frame_name;
			form.action = 'http://localhost:3000/caricaJa?';
			form.method = 'POST';
			var input = document.createElement("input");
			input.type = "hidden";
			input.name = 'project';
			input.value = JSON.stringify(myProject);
			form.appendChild(input);
			document.body.appendChild(form);
			form.submit();
			var a = document.createElement("a");
			document.body.appendChild(a);
			a.style = "display: none";
			a.href = "http://localhost/SWEDesigner-source/src/server/requestHandler/Programma-"+myProject.filename+".zip";
			a.download = "Programma-"+myProject.filename+".zip";
			a.click();
			document.body.removeChild(a);
        },
        /**
         *  @function client::RequestHandler#generateJavascript
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
            /*$.ajax({
                url: 'http://localhost:3000/caricaJs?callback=?',
                dataType: "jsonp",
                data: JSON.stringify(myProject),
                //type: 'POST',
                jsonp: 'callback',
                success: function (data) {
                    console.log(data);
                    var ret = $.parseJSON(data);
                    var a = document.createElement("a");
					document.body.appendChild(a);
					a.style = "display: none";
					a.href = "http://localhost/SWEDesigner-source/src/server/codeGenerator/"+ret.nomezip+".zip";
					a.download = ret.nomezip+".zip";
					a.click();
					document.body.removeChild(a);
                    $('#lblResponse').html(ret.nomezip);
                    console.log('Success: ')
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error);
                    $('#lblResponse').html('Error connecting to the server.');
                },
            });*/
			var iframe = document.createElement("iframe");
			document.body.appendChild(iframe);
			iframe.style.display = "none";
			var frame_name = "frame_name";
			iframe.contentWindow.name = frame_name;
			var form = document.createElement("form");
			form.target = frame_name;
			form.action = 'http://localhost:3000/caricaJa?';
			form.method = 'POST';
			var input = document.createElement("input");
			input.type = "hidden";
			input.name = 'project';
			input.value = JSON.stringify(myProject);
			form.appendChild(input);
			document.body.appendChild(form);
			form.submit();
			var a = document.createElement("a");
			document.body.appendChild(a);
			a.style = "display: none";
			a.href = "http://localhost/SWEDesigner-source/src/server/requestHandler/Programma-"+myProject.filename+".zip";
			a.download = "Programma-"+myProject.filename+".zip";
			a.click();
			document.body.removeChild(a);
        }
	});
	return new RequestHandler;
});
