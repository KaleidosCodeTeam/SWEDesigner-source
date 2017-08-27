/*
 *  @file Contiene i test per l'oggetto ProjectView.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/views/projectView',
    'js/test/test'
], function ($, _, Backbone, joint, ProjectView, Test) {
	var ProjectViewTest = Backbone.View.extend({
		el: '#ProjectViewTest',
		initialize: function () {
			//Start executing ProjectView's Tests
			Test.assert(ProjectView != undefined, "ProjectView è un oggetto esistente e rappresenta la view dei diagrammi e quindi edll'oggetto joint.dia.Paper", this.el);
			Test.assert(ProjectView instanceof Backbone.View, "L'oggetto ProjectView estende l'oggetto Backbone.View", this.el);
			Test.assert(ProjectView.paper != undefined, "L'oggetto ProjectView contiene l'attributo paper", this.el);
			Test.assert(typeof ProjectView.initialize === "function", "L'oggetto ProjectView contiene la funzione initialize", this.el);
			Test.assert(typeof ProjectView.resetSelectedCell === "function", "L'oggetto ProjectView contiene la funzione resetSelectedCell", this.el);
			Test.assert(typeof ProjectView.mouseMoveFunction === "function", "L'oggetto ProjectView contiene la funzione mouseMoveFunction", this.el);
			Test.assert(typeof ProjectView.blankPointerDown === "function", "L'oggetto ProjectView contiene la funzione blankPointerDown", this.el);
			Test.assert(typeof ProjectView.blankPointerUp === "function", "L'oggetto ProjectView contiene la funzione blankPointerUp", this.el);
			Test.assert(typeof ProjectView.onMouseWheel === "function", "L'oggetto ProjectView contiene la funzione onMouseWheel", this.el);
			Test.assert(typeof ProjectView.render === "function", "L'oggetto ProjectView contiene la funzione render", this.el);
			Test.assert(typeof ProjectView.addCell === "function", "L'oggetto ProjectView contiene la funzione addCell", this.el);
			Test.assert(typeof ProjectView.deleteCell === "function", "L'oggetto ProjectView contiene la funzione deleteCell", this.el);
			Test.assert(typeof ProjectView.unembedCell === "function", "L'oggetto ProjectView contiene la funzione unembedCell", this.el);
			Test.assert(typeof ProjectView.pointerDownFunction === "function", "L'oggetto ProjectView contiene la funzione pointerDownFunction", this.el);
			Test.assert(typeof ProjectView.pointerUpFunction === "function", "L'oggetto ProjectView contiene la funzione pointerUpFunction", this.el);
			Test.assert(typeof ProjectView.switchIn === "function", "L'oggetto ProjectView contiene la funzione switchIn", this.el);
			
			Test.assert(typeof ProjectView.switchOut === "function", "L'oggetto ProjectView contiene la funzione switchOut", this.el);
			
			Test.assert(typeof ProjectView.deleteOperationAt === "function", "L'oggetto ProjectView contiene la funzione deleteOperationAt", this.el);
		}
	});
	return new ProjectViewTest;
});  
