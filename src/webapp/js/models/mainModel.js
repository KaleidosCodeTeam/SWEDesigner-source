define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/items/swedesignerItems'

    //'js/models/project'
], function ($, _, Backbone, joint, Swedesigner/*, Project*/) {
	var MainModel = Backbone.Model.extend({
		//urlRoot: '/path(forse)',
		project: {
			projectPkgDiagram: {},
            currentGraph: {},
		},
		initialize: function() {
			console.log("MainModel initialized");
			this.project.projectPkgDiagram = new Swedesigner.model.Diagram('packageDiagram');
			console.log('Project.projectPkgDiagram ' + this.project.projectPkgDiagram);
			this.project.currentGraph = this.project.projectPkgDiagram;
			console.log('Project.currentGraph ' + this.project.currentGraph);
		},
		deleteCell: function (cell) {
            /*if (cell.getValues().hasOwnProperty("operations")) {
                for (var op in cell.getValues().operations) {
                    this.deleteBubbleDiagram(cell.getValues().operations[op].id);
                }
            }*/
            console.log(cell);
            this.project.currentGraph.graph.removeCells([cell]);
            console.log((this.project.currentGraph.graph));

            //this.trigger('addcell');
		},
		// Metodo chiamato dalla editPanelView per spostarsi solamente in un graph in profondità - NON ANCORA TESTATO
		switchInGraph: function(id) {
			if (this.project.currentGraph.diagramType=='packageDiagram') {
				// id contiene il cid del package selezionato
				this.project.currentGraph=this.project.currentGraph.graph.getCell(id).classDiagram;
			} else if (this.project.currentGraph.diagramType=='classDiagram') {
				// id contiene l'id dell'operazione della classe selezionata
				// Scorro tutte le classi e per ogni classe, tutte le sue operazioni e ritorno la classe e l'indice dell'operazione
				var cl=this.project.currentGraph.graph.getElements().forEach(function(element) {
					for (var i=0; i<element.operations.length; ++i) {
						if (element.operations[i].id==id) {
							return { el: element, op: i };
						}
					}
				});
				this.project.currentGraph=cl.el.operations[op].bubbleDiagram;	// Non so se funziona
			}
		},
		// Metodo chiamato dalla pathView per spostarsi solamente in un graph "soprastante" - NON ANCORA TESTATO
		switchOutGraph: function(pkgId, classId) {
			if (classId) {
				// Se classId è diverso da null, torno al diagramma delle classi
				// Utilizzo l'id del package per caricare il suo diagramma delle classi
				this.project.currentDiagram=this.project.projectPkgDiagram.graph.getCell(pkgId).classDiagram;
			} else {
				// Switch sul diagramma dei package
				this.project.currentDiagram=this.project.projectPkgDiagram;
			}
			var change=this.project.currentGraph.graph.getCell(id);
		}
		/*saveProject: function() {
			Swedesigner.model.DAO.saveProject(this.project);
		},
		openProject: function() {
			this.project = Swedesigner.model.DAO.openProject();
		}*/
	});
	return MainModel;
});
