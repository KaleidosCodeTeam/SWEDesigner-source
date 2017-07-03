/**
 *  @file Contiene la classe ProjectView e ne ritorna una istanza.
 *  @author Bonolo Marco, Pezzuto Francesco, Sovilla Matteo - KaleidosCode
 */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/projectModel',
	'js/models/items/swedesignerItems'
], function ($, _, Backbone, joint, projectModel, Swedesigner) {
    /**
     *  @classdesc View del progetto corrente. Si occupa di gestire il paper e tutti gli eventi ad esso associati.
     *  @module
     *  @class ProjectView
     *  @extends {Backbone.View}
     */
	var ProjectView = Backbone.View.extend({
		/** 
		 *	@var {joint.dia.Paper} ProjectView#paper - L'area di disegno associata al tag HTML "#canvas" nella Single Page Application.
		 */
		paper: {},
		/**
		 *	@function ProjectView#initialize
		 *	@summary Inizializzazione della projectView: inizializzazione del modello, del paper, degli eventi verificabili.
		 */
		initialize: function() {
			//console.log("ProjectView initialized");
			this.model = projectModel;
			this.paper = new joint.dia.Paper({
				el: $('#canvas'),
				model: projectModel.graph,
				width: $('#canvas').width(),
				height: $('#canvas').height(),
				gridSize: 10,
				drawGrid: true,
				background: {
				    color: "#606060"
				},
				elementView: function(element) {
                    if (element.get("type").startsWith("packageDiagram")) {
                        if (element.get("type") === "packageDiagram.PkgComment") {
                            return Swedesigner.model.packageDiagram.items.PkgCommentView;
                        } else {
                        	console.log("displaying package baseView");
                            return Swedesigner.model.packageDiagram.items.BaseView;
                        }
                    } else if (element.get("type").startsWith("classDiagram")) {
                    	if (element.get("type") === "classDiagram.ClComment") {
                            return Swedesigner.model.classDiagram.items.ClCommentView;
                        } else {
                            return Swedesigner.model.classDiagram.items.BaseView;
                        }
                    } else {
                    	return Swedesigner.model.bubbleDiagram.items.BaseView;
                    }
                },
                highlighting: {
                    'default': {
                        name: 'stroke',
                        options: {
                            padding: 3
                        }
                    }
                },
                linkView: joint.dia.LinkView.extend({
                    pointerdblclick: function(evt, x, y) {
                        if (joint.V(evt.target).hasClass('connection') || joint.V(evt.target).hasClass('connection-wrap')) {
                            this.addVertex({x: x, y: y});
                        }
                    },
                }),
                selectedCell: null,
                isHighlighted: false,
                interactive: function(itemView) {
                    if (itemView.model instanceof joint.dia.Link) {
                        // Disable the default vertex add functionality on pointerdown.
                        return {vertexAdd: false};
                    }
                    return true;
				}
			});
			this.listenTo(this.paper, 'blank:pointerdown', _.partial(this.addCell, this));
			this.listenTo(this.model, 'switchgraph', _.partial(this.resetSelectedCells, this));
			this.paper.on('blank:pointerdown', _.partial(this.blankPointerDown, this));
			this.paper.on('blank:pointerup', _.partial(this.blankPointerUp, this));
			$("#canvas").on('mousemove', {paper: this.paper}, this.mouseMoveFunction);
            this.paper.on('cell:pointerup', _.partial(this.pointerUpFunction, this));
            this.paper.on('cell:pointerdown', _.partial(this.pointerDownFunction, this));
            
            this.paper.$el.on('wheel', _.partial(this.onMouseWheel, this));
            dragging = false;
		},
		resetSelectedCells: function() {
            this.paper.selectedCell = null;
            this.paper.trigger('changed-selected-cell');
		},
		/**
		 *	@function ProjectView#mouseMoveFunction
		 *	@param {Object} e - Elemento generante l'evento.
		 *	@summary Traslazione del paper nella direzione del trascinamento del mouse.
		 */
		mouseMoveFunction: function(event) {
			if (dragging == true)
				event.data.paper.translate(event.offsetX - dragStartPosition.x, event.offsetY - dragStartPosition.y);
		},
		/**
		 *	@function ProjectView#blankPointerDown
		 *	@param {Object} elem - Elemento cellView.
		 *	@param {Object} event - Evento.
		 *	@param {double} x - Coordinata dell'asse delle ascisse.
		 *	@param {double} y - Coordinata dell'asse delle ordinate.
		 *	@summary Salva le correnti coordinate al click del mouse nello spazio vuoto del paper.
		 */
		blankPointerDown: function(elem, event, x, y) {
				dragStartPosition = { 'x': x, 'y': y};
				dragging = true;
		},
		/**
		 *	@function ProjectView#blankPointerUp
		 *	@param {Object} elem - Elemento cellView.
		 *	@param {Object} event - Evento.
		 *	@param {double} x - Coordinata dell'asse delle ascisse.
		 *	@param {double} y - Coordinata dell'asse delle ordinate.
		 *	@summary Elimina le coordinate iniziali al click del mouse nello spazio vuoto del paper.
		 */
		blankPointerUp: function(elem, event, x, y) {
				delete dragStartPosition;
				dragging = false;
		},
		/**
		 *	@function ProjectView#onMouseWheel
		 *	@param {Object} elem - Elemento cellView.
		 *	@param {Object} event - Evento.
		 *	@summary Trasla verticalmente il paper effettuando uno zoom in avanti o indietro a seconda della rotazione della ruota del mouse.
		 */
		onMouseWheel: function(el, event) {
			event.preventDefault();
			event = event.originalEvent;

			var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) / 50;
			var offsetX = (event.offsetX || event.clientX - $(this).offset().left); // offsetX non è definito in FF
			var offsetY = (event.offsetY || event.clientY - $(this).offset().top); // offsetY non è definito in FF
			var svgPoint = el.paper.svg.createSVGPoint();
			svgPoint.x = offsetX;
			svgPoint.y = offsetY;
			var p = svgPoint.matrixTransform(el.paper.viewport.getCTM().inverse());
			var newScale = joint.V(el.paper.viewport).scale().sx + delta; // lo scale corrente del paper cambiato da delta

			if (newScale > 0.5 && newScale < 1.8) {
				el.paper.translate(0, 0); // resetta la precedente traslazione del viewport
				el.paper.scale(newScale, newScale, p.x, p.y);
			}
		},
		/**
         *  @function ProjectView#render
         *  @summary Render della ProjectView.
         */
		render: function() {},
		/**
		 *	@function ProjectView#addCell
		 *	@param {Object} elem - Elemento cellView.
		 *	@param {Object} event - Evento.
		 *	@param {double} x - Coordinata dell'asse delle ascisse.
		 *	@param {double} y - Coordinata dell'asse delle ordinate.
		 *	@summary Aggiunge un nuovo elemento al graph chiamando il relativo metodo di ProjectModel.
		 */
		addCell: function(event, type, x, y) {
            if (projectModel.itemToBeAdded !== null && projectModel.itemToBeAdded.isElement()) {
                projectModel.itemToBeAdded.position(x, y);
                projectModel.addItemToGraph();
            }
        },
		/**
		 *	@function ProjectView#deleteCell
		 *	@param {Object} event - Evento.
		 *	@summary Elimina un elemento dal graph chiamando il relativo metodo di ProjectModel.
		 */
		deleteCell: function(e) {
            projectModel.deleteCell(this.paper.selectedCell);
            this.paper.selectedCell = null;
            this.paper.trigger('changed-selected-cell');
        },
        /**
		 *	@function ProjectView#unembedCell
		 *	@param {Object} event - Evento.
		 *	@summary Rimuove l'innestamento della cella selezionata.
		 */
        unembedCell: function(e) {
		    var parentId = this.paper.selectedCell.get('parent');
		    if (parentId) {
		        var parent = this.model.getCellFromId(parentId);
		        parent.unembed(this.paper.selectedCell);
		        this.model.resizeParent(parent);
            }
        },
        /**
		 *	@function ProjectView#pointerDownFunction
		 *	@param {Object} prView - Istanza della ProjectView.
		 *	@param {Object} elem - Elemento cellView.
		 *	@param {Object} event - Evento.
		 *	@param {double} x - Coordinata dell'asse delle ascisse.
		 *	@param {double} y - Coordinata dell'asse delle ordinate.
		 *	@summary Gestice l'evento generato dal click (non rilasciato) del mouse nel paper. Se viene cliccato un elemento, genera a sua volta l'evento "changed-selected-cell" gestito da EditPanelView.
		 */
        pointerDownFunction: function(prView, cellView, evt, x, y) {
            if (cellView) {
                //console.log("cella selezionata: ",this.selectedCell);
                //console.log("cellview: ",cellView);
                if (this.selectedCell !== cellView.model) {
                    changed = true;
                    this.selectedCell = cellView.model;
                    console.log('changed-selected-cell');
                    this.trigger("changed-selected-cell");
                }
            }
        },
        /**
		 *	@function ProjectView#pointerUpFunction
		 *	@param {Object} prView - Istanza della ProjectView.
		 *	@param {Object} elem - Elemento cellView.
		 *	@param {Object} event - Evento.
		 *	@param {double} x - Coordinata dell'asse delle ascisse.
		 *	@param {double} y - Coordinata dell'asse delle ordinate.
		 *	@summary Gestice l'evento generato dal click (al rilascio) del mouse nel paper (rimozione di un elemento, nesting di un elemento in un'altro, collegamento di una relazione tra elementi).
		 */
        pointerUpFunction: function(prView, cellView, evt, x, y) {
            var className = evt.target.parentNode.getAttribute('class');
            switch (className) {
                case 'element-tool-remove':
                    prView.deleteCell(cellView.model);
                    return;
                default:
                    if (projectModel.itemToBeAdded && projectModel.itemToBeAdded.type === 'nesting') {
                        if (projectModel.itemToBeAdded.source !== null) {
                            projectModel.itemToBeAdded.target = cellView.model;
                            projectModel.addItemToGraph();
                        } else {
                            projectModel.itemToBeAdded.source = cellView.model;
                        }
                    }
					if (projectModel.itemToBeAdded && projectModel.itemToBeAdded.isLink()) {
						if (projectModel.itemToBeAdded.get("source").id !== undefined) {
						    projectModel.itemToBeAdded.set("target", {id: cellView.model.id});
						    projectModel.addItemToGraph();
						} else {
						    projectModel.itemToBeAdded.set("source", {id: cellView.model.id});
						}
					}
                    return;
            }
        },
		/**
		 *	@function ProjectView#switchIn
		 *	@param {string} id - Identificativo dell'elemento.
		 *	@summary Gestisce lo switch in profondità (dall'elemento selezionato il cui id è parametro in input) invocando il relativo metodo di ProjectModel.
		 */
        switchIn: function(id) {
            projectModel.switchInGraph(id);
            this.paper.selectedCell = null;
            this.paper.trigger('changed-selected-cell');
            //console.log(projectModel);
            //console.log(this.paper);
        },
        /**
		 *	@function ProjectView#switchOut
		 *	@param {string} diagramType - Tipo di diagramma di destinazione.
		 *	@summary Gestisce lo switch verso un diagramma (il cui tipo è parametro in input) antistante da quello corrente invocando il relativo metodo di ProjectModel.
		 */
        switchOut: function(diagramType) {
		    projectModel.switchOutGraph(diagramType);
		    this.paper.selectedCell = null;
		    this.paper.trigger('changed-selected-cell');
		    //console.log(projectModel);
		    //console.log(this.paper);
        },
        /**
		 *	@function ProjectView#deleteOperationAt
		 *	@param {int} ind - Indice dell'array di operazioni del diagramma delle bubble da eliminare.
		 *	@summary Gestisce l'eliminazione di un diagramma delle bubble invocando il relativo metodo di ProjectModel.
		 */
        deleteOperationAt: function(ind) {
            projectModel.deleteOperation(this.paper.selectedCell.getValues().operations[ind].id);
        }
	});
	return new ProjectView;
});
