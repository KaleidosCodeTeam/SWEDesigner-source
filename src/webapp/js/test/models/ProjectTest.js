/*
 *  @file Contiene i test per l'oggetto Project.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/project',
    'js/test/test'
], function ($, _, Backbone, joint, Project, Test) {
	var ProjectTest = Backbone.View.extend({
		el: '#ProjectTest',
		initialize: function () {
			//Start executing Project's Tests
			Test.assert(Project != undefined, "Project è un oggetto esistente e rappresenta il model del progetto cioè i dati degli oggetti che compongono i vari diagrammi", this.el);
			Test.assert(Project instanceof Backbone.Model, "L'oggetto Project estende l'oggetto Backbone.Model", this.el);
			Test.assert(Project.packages != undefined, "L'oggetto Project contiene l'attributo packages", this.el);
			Test.assert(Project.classes != undefined, "L'oggetto Project contiene l'attributo classes", this.el);
			Test.assert(Project.operations != undefined, "L'oggetto Project contiene l'attributo operations", this.el);
			Test.assert(typeof Project.deleteClassesDiagramOfPkg === "function", "L'oggetto Project contiene la funzione deleteClassesDiagramOfPkg", this.el);
			Test.assert(typeof Project.deleteOperationDiagram === "function", "L'oggetto Project contiene la funzione deleteOperationDiagram", this.el);
			Test.assert(typeof Project.getOperationIndex === "function", "L'oggetto Project contiene la funzione getOperationIndex", this.el);
			Test.assert(typeof Project.getClassIndex === "function", "L'oggetto Project contiene la funzione getClassIndex", this.el);
		}
	});
	return new ProjectTest;
});  
