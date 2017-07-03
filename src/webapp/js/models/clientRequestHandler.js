define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/projectModel',
    'js/models/project'
], function ($, _, Backbone, joint, projectModel, project) {
    /**
     * @class clientRequestHandler
     * @classdesc Si occupa della gestione delle comunicazioni tra client e server.
     * @extends Backbone.Model
     */
	var clientRequestHandler = Backbone.Model.extend({
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
        },
        viewGeneratedCode: function() { //MAYBE NOT
        }
	});
	return new clientRequestHandler;
});
