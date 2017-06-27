define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/items/swedesignerItems',
    'js/models/project'
], function ($, _, Backbone, joint, Swedesigner, project) {
	var projectModel = Backbone.Model.extend({
		graph: {},
		currentDiagram: null,	//	conterrà un Id del diagramma corrente
		currentDiagramType: '',
        itemToBeAdded: null,
		initialize: function() {
			console.log("MainModel initialized");
            this.graph = new joint.dia.Graph({},{cellNamespace: Swedesigner.model});
            this.currentDiagramType = 'packageDiagram';
            let myAdjustVertices = _.partial(this.adjustVertices, this.graph);
            this.graph.on('add remove change:source change:target', myAdjustVertices);
		},
        /**
         *  @function projectModel#addItem
         *  @param {Object} item - elemento del diagramma definito in swedesignerItems.
         *  @summary Aggiunge al grafo un elemento passato in input.
         */
        addItem: function(item) {
            this.itemToBeAdded=item;
        },
        addItemToGraph: function() {
            _.each(this.graph.get('cells').models, function(el) {   // Non sono sicuro se funzionerà
                el.set("z", 1);
            });
            this.graph.addCell(this.itemToBeAdded);
            this.trigger('addCell', this.itemToBeAdded);
            this.itemToBeAdded=null;
        },
		deleteCell: function (cell) {
            if (cell.type === 'packageDiagram.Package') {
                project.deleteClassesOf(cell.id);
            }
            if (cell.type === 'classDiagram.Class') {
                project.deleteOperationsOf(cell.id);
            }
            /* ~~~~~~ Legacy code ~~~~~~
            if (cell.getValues().hasOwnProperty("operations")) {
                for (var op in cell.getValues().operations) {
                    project.deleteBubbleDiagram(cell.getValues().operations[op].id);
                }
            }*/
            this.graph.removeCells([cell]);
            this.trigger('addcell');
		},
		// Metodo chiamato dalla editPanelView per spostarsi solamente in un graph in profondità - NON ANCORA TESTATO
		switchInGraph: function(id) {
            this.saveCurrentDiagram();
			if (this.currentDiagramType === 'packageDiagram') {
				// id contiene l'id del package selezionato
                var index = project.getClassIndex(id);
                this.currentDiagram = id;
                if (index != -1) {
                    this.graph.resetCells(project.classes.classesArray[index].items.concat(project.classes.relationshipsArray[index].items));
                } else {
                    this.graph.resetCells([]);
                }
                this.currentDiagram = id;
                this.currentDiagramType = 'classDiagram';
                this.itemToBeAdded = null;
			} else if (this.currentDiagramType === 'classDiagram') {
				// id contiene l'id dell'operazione della classe selezionata
				// Scorro tutte le classi e per ogni classe, tutte le sue operazioni e ritorno la classe e l'indice dell'operazione
                var index = project.getOperationIndex(id);
                this.currentDiagram = id;
                if (index != -1) {
                    this.graph.resetCells(project.operations[index].cells);
                } else {
                    this.graph.resetCells([]);
                }
                this.currentDiagramType = 'bubbleDiagram';
                this.itemToBeAdded = null;
			};
            this.trigger("switchgraph");
		},
		// Metodo chiamato dalla pathView per spostarsi solamente in un graph "soprastante" - NON ANCORA TESTATO
		switchOutGraph: function(diagramType) {
            this.saveCurrentDiagram();
            if (diagramType == 'packageDiagram') {
                this.currentDiagram = null;
                this.graph.resetCells(project.packages.packagesArray.concat(project.packages.dependenciesArray));
                this.currentDiagramType = 'packageDiagram';
                this.itemToBeAdded = null;
            } else if (diagramType == 'classDiagram') {
                var OpIndex = project.getOperationIndex(this.currentDiagram);
                var found = false;
                var ClIndex = -1;
                for (var i=0; i<project.classes.classesArray.length && found==false; ++i) {
                    for (var j=0; j<project.classes.classesArray[i].items.length && found==false; ++j) {
                        for (var k=0; k<project.classes.classesArray[i].items[j].getValues().operations.length && found==false; ++k) {
                            if (project.classes.classesArray[i].items[j].getValues().operations[k].id == this.currentDiagram) {
                                ClIndex = i;
                                found = true;
                            }
                        }
                    }
                }
                if (ClIndex != -1) {
                    this.graph.resetCells(project.classes.classesArray[ClIndex].items.concat(project.classes.relationshipsArray[ClIndex].items));
                } else {
                    this.graph.resetCells([]);
                }
                this.currentDiagram = project.classes.classesArray[ClIndex].id;
                this.currentDiagramType = 'classDiagram';
                this.itemToBeAdded = null;
            };
            this.trigger("switchgraph");
        },
        saveCurrentDiagram: function() {
            // salva in project il graph correntemente aperto
            if (this.currentDiagramType === 'packageDiagram') {
                project.packages.packagesArray = (this.graph.getElements());
                project.packages.dependenciesArray = (this.graph.getLinks());
                //console.log('Into saveCurrentDiagram (from package to class diagram) - packagesArray: ');
                //console.log(project.packages.packagesArray);
            } else if (this.currentDiagramType === 'classDiagram') {
                var index = project.getClassIndex(this.currentDiagram);
                if (index != -1) {
                    project.classes.classesArray[index].items = this.graph.getElements();
                    project.classes.relationshipsArray[index].items = this.graph.getLinks();
                } else {
                    project.classes.classesArray.push({
                        id: this.currentDiagram,
                        items: this.graph.getElements()
                    });
                    project.classes.relationshipsArray.push({
                        id: this.currentDiagram,
                        items: this.graph.getLinks()
                    });
                }
            } else {
                var index = project.getOperationIndex(this.currentDiagram);
                if (index != -1) {
                    project.operations[index].cells = this.graph.getCells();
                } else {
                    project.operations.push({
                        id: this.currentDiagram,
                        items: this.graph.getCells()
                    });
                }
            }
        },
        graphSwitched: function() {
            this.trigger("switchgraph");
        },
        /**
         *  @function Diagram#adjustVertices
         *  @param {Object} graph - graph del diagramma.
         *  @param {Object} cell - elemento del diagramma.
         *  @summary Aggiusta i vertici del graph quando ci sono link multipli tra elementi.
         */
        adjustVertices: function (graph, cell) {
            // If the cell is a view, find its model.
            cell = cell.model || cell;

            if (cell instanceof joint.dia.Element) {

                _.chain(graph.getConnectedLinks(cell)).groupBy(function (link) {
                    // the key of the group is the model id of the link's source or target, but not our cell id.
                    return _.omit([link.get('source').id, link.get('target').id], cell.id)[0];
                }).each(function (group, key) {
                    // If the member of the group has both source and target model adjust vertices.
                    if (key !== 'undefined') adjustVertices(graph, _.first(group));
                });

                return;
            }

            // The cell is a link. Let's find its source and target models.
            var srcId = cell.get('source').id || cell.previous('source').id;
            var trgId = cell.get('target').id || cell.previous('target').id;

            // If one of the ends is not a model, the link has no siblings.
            if (!srcId || !trgId) return;

            var siblings = _.filter(graph.getLinks(), function (sibling) {

                var _srcId = sibling.get('source').id;
                var _trgId = sibling.get('target').id;

                return (_srcId === srcId && _trgId === trgId) || (_srcId === trgId && _trgId === srcId);
            });

            switch (siblings.length) {

                case 0:
                    // The link was removed and had no siblings.
                    break;

                case 1:
                    // There is only one link between the source and target. No vertices needed.
                    cell.unset('vertices');
                    break;

                default:

                    // There is more than one siblings. We need to create vertices.

                    // First of all we'll find the middle point of the link.
                    var srcCenter = graph.getCell(srcId).getBBox().center();
                    var trgCenter = graph.getCell(trgId).getBBox().center();
                    var midPoint = joint.g.line(srcCenter, trgCenter).midpoint();

                    // Then find the angle it forms.
                    var theta = srcCenter.theta(trgCenter);

                    // This is the maximum distance between links
                    var gap = 20;

                    _.each(siblings, function (sibling, index) {

                        // We want the offset values to be calculated as follows 0, 20, 20, 40, 40, 60, 60 ..
                        var offset = gap * Math.ceil(index / 2);

                        // Now we need the vertices to be placed at points which are 'offset' pixels distant
                        // from the first link and forms a perpendicular angle to it. And as index goes up
                        // alternate left and right.
                        //
                        //  ^  odd indexes
                        //  |
                        //  |---->  index 0 line (straight line between a source center and a target center.
                        //  |
                        //  v  even indexes
                        var sign = index % 2 ? 1 : -1;
                        var angle = joint.g.toRad(theta + sign * 90);

                        // We found the vertex.
                        var vertex = joint.g.point.fromPolar(offset, angle, midPoint);

                        sibling.set('vertices', [{x: vertex.x, y: vertex.y}]);
                    });
            }
        }
	});
	return new projectModel;
});
