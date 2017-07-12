/**
 *  @file Contiene i test per l'oggetto ProjectModel.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/projectModel',
    'js/test/test'
], function ($, _, Backbone, joint, ProjectModel, Test) {
	var ProjectModelTest = Backbone.View.extend({
		el: '#ProjectModelTest',
		initialize: function () {
			//Start executing ProjectModel's Tests
			Test.assert(ProjectModel != undefined, "ProjectModel è un oggetto esistente e rappresenta il model del graph cioè gestisce gli eventi ad esso associati", this.el);
			Test.assert(ProjectModel instanceof Backbone.Model, "L'oggetto ProjectModel estende l'oggetto Backbone.Model", this.el);
			Test.assert(ProjectModel.graph != undefined, "L'oggetto ProjectModel contiene l'attributo graph", this.el);
			Test.assert(ProjectModel.currentDiagram == undefined, "L'oggetto ProjectModel contiene l'attributo currentDiagram", this.el);
			Test.assert(ProjectModel.currentDiagramType != undefined, "L'oggetto ProjectModel contiene l'attributo currentDiagramType", this.el);
			Test.assert(ProjectModel.itemToBeAddedd == undefined, "L'oggetto ProjectModel contiene l'attributo itemToBeAdded", this.el);
			Test.assert(typeof ProjectModel.initialize === "function", "L'oggetto ProjectModel contiene la funzione initialize", this.el);
			Test.assert(typeof ProjectModel.changedPosition === "function", "L'oggetto ProjectModel contiene la funzione changedPosition", this.el);
			Test.assert(typeof ProjectModel.addItem === "function", "L'oggetto ProjectModel contiene la funzione addItem", this.el);
			Test.assert(typeof ProjectModel.resizeParent === "function", "L'oggetto ProjectModel contiene la funzione resizeParent", this.el);
			Test.assert(typeof ProjectModel.addItemToGraph === "function", "L'oggetto ProjectModel contiene la funzione addItemToGraph", this.el);
			Test.assert(typeof ProjectModel.deleteCell === "function", "L'oggetto ProjectModel contiene la funzione deleteCell", this.el);
			Test.assert(typeof ProjectModel.deleteOperation === "function", "L'oggetto ProjectModel contiene la funzione deleteOperation", this.el);
			Test.assert(typeof ProjectModel.switchInGraph === "function", "L'oggetto ProjectModel contiene la funzione switchInGraph", this.el);
			Test.assert(typeof ProjectModel.switchOutGraph === "function", "L'oggetto ProjectModel contiene la funzione switchOutGraph", this.el);
			Test.assert(typeof ProjectModel.saveCurrentDiagram === "function", "L'oggetto ProjectModel contiene la funzione saveCurrentDiagram", this.el);
			Test.assert(typeof ProjectModel.graphSwitched === "function", "L'oggetto ProjectModel contiene la funzione graphSwitched", this.el);
			Test.assert(typeof ProjectModel.getCellFromId === "function", "L'oggetto ProjectModel contiene la funzione getCellFromId", this.el);
			Test.assert(typeof ProjectModel.adjustVertices === "function", "L'oggetto ProjectModel contiene la funzione adjustVertices", this.el);
		}
	});
	return new ProjectModelTest;
});  
