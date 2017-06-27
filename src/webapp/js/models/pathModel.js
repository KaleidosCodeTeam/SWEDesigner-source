define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/projectModel'
], function ($, _, Backbone, joint, projectModel) {
	var pathModel = Backbone.Model.extend({
		initialize: function() {
		},
		currentDiagram: function() {
			return projectModel.currentDiagramType;
		},
		switchDiagram: function(type) {
			if(type == "packageDiagram") {
				//devo chiamare la funzione switch di projectView passando come parametro l'id del diagramma dei package
			} else
				if(type == "classDiagram") {
					//devo chiamare la funzione switch di projectView passando l'id del diagramma delle classi che contiene il metodo corrente
			}
		}
	});
	return new pathModel;
});
