/**
 *  @file Contiene la classe ProjectModel.
 *  @author Bonolo Marco, Pezzuto Francesco, Sovilla Matteo - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/items/swedesignerItems',
    'js/models/project'
], function ($, _, Backbone, joint, Swedesigner, project) {
    /**
     *  @classdesc Model del progetto corrente. Si occupa di gestire il graph e tutti gli eventi ad esso associati.
     *  @module client.models
     *  @class ProjectModel
     *  @extends {Backbone.Model}
     */
	var ProjectModel = Backbone.Model.extend({
        /** 
         *  @var {joint.dia.Graph} ProjectModel#graph - Il model dell'area di disegno associata al paper della ProjectView.
         */
		graph: {},
        /** 
         *  @var {string} ProjectModel#currentDiagram - L'id del diagramma correntemente caricato nel graph (null se è il diagramma dei package).
         */
		currentDiagram: null,
        /** 
         *  @var {string} ProjectModel#currentDiagramType - Il tipo del diagramma correntemente caricato nel graph ("packageDiagram", "classDiagram" o "bubbleDiagram").
         */
		currentDiagramType: '',
        /** 
         *  @var {string} ProjectModel#itemToBeAdded - Store temporaneo dell'elemento da aggiungere al graph corrente.
         */
        itemToBeAdded: null,
        /**
         *  @function ProjectModel#initialize
         *  @summary Inizializzazione del ProjectModel: inizializzazione del graph, del currentDiagramType, degli eventi verificabili.
         */
		initialize: function() {
			//console.log("MainModel initialized");
            this.graph = new joint.dia.Graph({},{cellNamespace: Swedesigner.model});
            this.currentDiagramType = 'packageDiagram';
            let myAdjustVertices = _.partial(this.adjustVertices, this.graph);
            this.graph.on('add remove change:source change:target', myAdjustVertices);
            this.graph.on('change:position', _.partial(this.changedPosition, this.graph));
            this.graph.on('change:size', function(cell, newPosition, opt) {
                if (opt.skipParentHandler) return;

                if (cell.get('embeds') && cell.get('embeds').length) {
                    // If we're manipulating a parent element, let's store
                    // it's original size to a special property so that
                    // we can shrink the parent element back while manipulating
                    // its children.
                    cell.set('originalSize', cell.get('size'));
                }
            });
		},
        /**
         *  @function ProjectModel#changedPosition
         *  @param {joint.dia.Graph} graph - Grafo.
         *  @param {join.dia.Cell} cell - Elemento correntemente selezionato.
         *  @param {Object} newPosition - Posizione attuale dell'oggetto nel grafo.
         *  @param {Object} opt - Traslazione dell'oggetto dalla posizione iniziale alla posizione "newPosition".
         *  @summary Gestisce la traslazione di un elemento selezionato nel grafo.
         */
        changedPosition: function(graph, cell, newPosition, opt) {

            if (opt.skipParentHandler) return;

            if (cell.get('embeds') && cell.get('embeds').length) {
                // If we're manipulating a parent element, let's store
                // it's original position to a special property so that
                // we can shrink the parent element back while manipulating
                // its children.
                cell.set('originalPosition', cell.get('position'));
            }

            var parentId = cell.get('parent');
            if (!parentId) return;

            var parent = graph.getCell(parentId);
            var parentBbox = parent.getBBox();

            if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
            if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));

            var originalPosition = parent.get('originalPosition');
            var originalSize = parent.get('originalSize');

            var newX = originalPosition.x;
            var newY = originalPosition.y;
            var newCornerX = originalPosition.x + originalSize.width;
            var newCornerY = originalPosition.y + originalSize.height;

            _.each(parent.getEmbeddedCells(), function(child) {

                var childBbox = child.getBBox();

                var padding = 50;

                if (childBbox.x - padding < newX) { newX = childBbox.x - padding; }
                if (childBbox.y - padding < newY) { newY = childBbox.y - padding; }
                if (childBbox.corner().x + padding > newCornerX) { newCornerX = childBbox.corner().x + padding; }
                if (childBbox.corner().y + padding > newCornerY) { newCornerY = childBbox.corner().y + padding; }
            });
            // Note that we also pass a flag so that we know we shouldn't adjust the
            // `originalPosition` and `originalSize` in our handlers as a reaction
            // on the following `set()` call.
            parent.set({
                position: { x: newX, y: newY },
                size: { width: newCornerX - newX, height: newCornerY - newY }
            }, { skipParentHandler: true });
        },
        /**
         *  @function ProjectModel#addItem
         *  @param {Object} item - elemento del diagramma.
         *  @summary Aggiunge al grafo un elemento passato in input.
         */
        addItem: function(item) {
            this.itemToBeAdded = item;
        },
        /**
         *  @function ProjectModel#resizeParent
         *  @param {Object} parent - elemento del diagramma.
         *  @summary Esegue il resize di un elemento del diagramma ingrandendolo.
         */
        resizeParent: function(parent) {
            if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
            if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));

            var originalPosition = parent.get('originalPosition');
            var originalSize = parent.get('originalSize');

            var newX = originalPosition.x;
            var newY = originalPosition.y;
            var newCornerX = originalPosition.x + originalSize.width;
            var newCornerY = originalPosition.y + originalSize.height;

            _.each(parent.getEmbeddedCells(), function(child) {

                var childBbox = child.getBBox();

                var padding = 50;

                if (childBbox.x - padding < newX) { newX = childBbox.x - padding; }
                if (childBbox.y - padding < newY) { newY = childBbox.y - padding; }
                if (childBbox.corner().x + padding > newCornerX) { newCornerX = childBbox.corner().x + padding; }
                if (childBbox.corner().y + padding > newCornerY) { newCornerY = childBbox.corner().y + padding; }
            });

            parent.set({
                position: { x: newX, y: newY },
                size: { width: newCornerX - newX, height: newCornerY - newY }
            }, { skipParentHandler: true });
        },
        /**
         *  @function ProjectModel#addItemToGraph
         *  @summary Aggiunge un elemento al grafo del diagramma corrente.
         */
        addItemToGraph: function() {
            if (this.itemToBeAdded.type === 'nesting'){
                var cell = this.itemToBeAdded.source;
                var parent = this.itemToBeAdded.target;
                areRelatives = function(cell, ancestorId, grph) {
                    if (cell.id === ancestorId) return true;
                    if (!cell.get('parent')) return false;
                    if (cell.get('parent') === ancestorId) return true;
                    return areRelatives(grph.getCell(cell.get('parent')), ancestorId, grph);
                };
                // Prevent recursive embedding.
                if (!areRelatives(parent,cell.id,this.graph)/*parent.get('parent') !== cell.id*/ && !cell.get('parent')) {
                    parent.embed(cell);
                    moveAhead = function(cll) {
                        cll.toFront();
                        _.each(cll.getEmbeddedCells(), moveAhead);
                    };
                    moveAhead(cell);
                    this.resizeParent(parent);
                }
            } else {
                //_.each(this.graph.get('cells').models, function(el) {   // Non sono sicuro se funzionerà
                //    el.set("z", 1);
                //});
                this.graph.addCell(this.itemToBeAdded);
            }
            this.trigger('addCell', this.itemToBeAdded);
            this.itemToBeAdded = null;
        },
        /**
         *  @function ProjectModel#deleteCell
         *  @summary Rimuove un elemento dal grafo eliminando anche gli eventuali diagrammi derivati (classi o bubble).
         */
		deleteCell: function(cell) {
            if (cell.get("type") === 'packageDiagram.items.Package') {
                project.deleteClassesDiagramOfPkg(cell.get("id"));
            }
            if (cell.get("type") === 'classDiagram.items.Class') {
                for (var op in cell.getValues().operations) {
                    project.deleteOperationDiagram(cell.getValues().operations[op].id);
                }
            }
            this.graph.removeCells([cell]);
            this.trigger('addcell');
            //console.log(project.packages.packagesArray);
            //console.log(project.classes.classesArray);
            //console.log(project.classes.relationshipsArray);
            //console.log(project.operations);
		},
        /**
         *  @function ProjectModel#deleteOperation
         *  @summary Rimuove un'operazione ed eventualmente anche il diagramma delle bubble associato.
         */
        deleteOperation: function(id) {
            project.deleteOperationDiagram(id);
        },
		/**
         *  @function ProjectModel#switchInGraph
         *  @summary Esegue lo switch in profondità al diagramma selezionato svuotando il graph dagli elementi correntemente presenti e caricando gli eventuali
         *  nuovi elementi.
         */
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
                var index = project.getOperationIndex(id);
                this.currentDiagram = id;
                if (index != -1) {
                    this.graph.resetCells(project.operations[index].items);
                } else {
                    this.graph.resetCells([]);
                }
                this.currentDiagramType = 'bubbleDiagram';
                this.itemToBeAdded = null;
			};
            this.trigger("switchgraph");
		},
		/**
         *  @function ProjectModel#switchOutGraph
         *  @summary Esegue lo switch all'antistante tipo di diagramma selezionato svuotando il graph dagli elementi correntemente presenti e caricando gli eventuali
         *  nuovi elementi.
         */
		switchOutGraph: function(diagramType) {
            this.saveCurrentDiagram();
            if (diagramType == 'packageDiagram') {
                // Devo spostarmi al diagramma dei package
                this.currentDiagram = null;
                this.graph.resetCells(project.packages.packagesArray.concat(project.packages.dependenciesArray));
                this.currentDiagramType = 'packageDiagram';
                this.itemToBeAdded = null;
            } else if (diagramType == 'classDiagram') {
                // Devo spostarmi ad un diagramma delle classi
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
        /**
         *  @function ProjectModel#saveCurrentDiagram
         *  @summary Salva il diagramma correntemente aperto all'interno della struttura definita nella classe Project.
         */
        saveCurrentDiagram: function() {
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
                    project.operations[index].items = this.graph.getCells();
                } else {
                    project.operations.push({
                        id: this.currentDiagram,
                        items: this.graph.getCells()
                    });
                }
            }
        },
        /**
         *  @function ProjectModel#graphSwitched
         *  @summary Genera l'evento "switchgraph".
         */
        graphSwitched: function() {
            this.trigger("switchgraph");
        },
        /**
         *  @function ProjectModel#getCellFromId
         *  @param {string} cellId - Identificativo dell'elemento nel graph.
         *  @summary Ritorna l'elemento del graph avente l'id passato come parametro in input.
         */
        getCellFromId: function(cellId) {
            return this.graph.getCell(cellId);
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
	return new ProjectModel;
});
