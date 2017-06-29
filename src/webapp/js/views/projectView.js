define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/projectModel',
	'js/models/items/swedesignerItems'
	/* ecc. */
], function ($, _, Backbone, joint, projectModel, Swedesigner) {
	var projectView = Backbone.View.extend({
		paper: {},
		initialize: function() {
			console.log("ProjectView initialized");
			this.model = projectModel;
			this.paper = new joint.dia.Paper({
				el: $('#canvas'),
				model: projectModel.graph,
				width: $('#canvas').width(),
				height:$('#canvas').height(),
				gridSize: 10,
				drawGrid: true,
				background:{
				    color: "#373737"
				},
				elementView: function (element) {
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
                    	return joint.dia.elementView;//Swedesigner.model.bubbleDiagram.items.BaseView;
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
                    pointerdblclick: function (evt, x, y) {
                        if (joint.V(evt.target).hasClass('connection') || joint.V(evt.target).hasClass('connection-wrap')) {
                            this.addVertex({x: x, y: y});
                        }
                    },
                }),
                selectedCell: null,
                isHighlighted: false,
                interactive: function (itemView) {
                    if (itemView.model instanceof joint.dia.Link) {
                        // Disable the default vertex add functionality on pointerdown.
                        return {vertexAdd: false};
                    }
                    return true;
				}
			});
			this.listenTo(this.paper, 'blank:pointerdown', _.partial(this.addCell, this));
			this.paper.on('blank:pointerdown', _.partial(this.blankPointerDown, this));
			this.paper.on('blank:pointerup', _.partial(this.blankPointerUp, this));
			$("#canvas").on('mousemove', {paper: this.paper}, this.mouseMoveFunction);
            this.paper.on('cell:pointerup', _.partial(this.pointerUpFunction, this));
            this.paper.on('cell:pointerdown', _.partial(this.pointerDownFunction, this));
            
            this.paper.$el.on('wheel', _.partial(this.onMouseWheel, this));
            dragging = false;

		},
		mouseMoveFunction: function(event) {
			if(dragging == true)
				event.data.paper.translate(event.offsetX - dragStartPosition.x, event.offsetY - dragStartPosition.y);
		},
		blankPointerDown: function(elem, event, x, y) {
				dragStartPosition = { 'x': x, 'y': y};
				dragging = true;
		},
		blankPointerUp: function(elem, event, x, y) {
				delete dragStartPosition;
				dragging = false;
		},
		onMouseWheel: function(el, event) {
			event.preventDefault();
			event = event.originalEvent;

			var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) / 50;
			var offsetX = (event.offsetX || event.clientX - $(this).offset().left); // offsetX is not defined in FF
			var offsetY = (event.offsetY || event.clientY - $(this).offset().top); // offsetY is not defined in FF
			var svgPoint = el.paper.svg.createSVGPoint();
			svgPoint.x = offsetX;
			svgPoint.y = offsetY;
			var p = svgPoint.matrixTransform(el.paper.viewport.getCTM().inverse());
			var newScale = joint.V(el.paper.viewport).scale().sx + delta; // the current paper scale changed by delta

			if (newScale > 0.5 && newScale < 1.8) {
				el.paper.translate(0, 0); // reset the previous viewport translation
				el.paper.scale(newScale, newScale, p.x, p.y);
			}
		},
		render: function() {

		},
		addCell: function(event, type, x, y) {
            if(projectModel.itemToBeAdded !== null && projectModel.itemToBeAdded.isElement()) {
                projectModel.itemToBeAdded.position(x, y);
                projectModel.addItemToGraph();
            }
        },
		deleteCell: function(e) {
            projectModel.deleteCell(this.paper.selectedCell);
            this.paper.selectedCell=null;
            this.paper.trigger("changed-selected-cell");
        },
        pointerDownFunction: function (prView, cellView, evt, x, y) {
            if (cellView) {
                //console.log("cella selezionata: ",this.selectedCell);
                //console.log("cellview: ",cellView);
                if (this.selectedCell!==cellView.model) {
                    changed=true;
                    this.selectedCell=cellView.model;
                    console.log('changed-selected-cell');
                    this.trigger("changed-selected-cell");
                }
            }
            /**
             * @todo
             */
            /*if (projectModel.project.currentGraph.itemToBeAdded && this.model.project.currentGraph.itemToBeAdded.isLink()) {
                if (projectModel.project.currentGraph.itemToBeAdded.get("source").id !== undefined) {
                    projectModel.project.currentGraph.itemToBeAdded.set("target", {id: cellView.model.id});
                    projectModel.project.currentGraph.item.addCellToGraph();
                } else {
                    projectModel.project.currentGraph.itemToBeAdded.set("source", {id: cellView.model.id});
                }
			}*/
        },
        pointerUpFunction: function (prView,cellView, evt, x, y) {
            var className=evt.target.parentNode.getAttribute('class');
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
        switchIn: function (id) {
            projectModel.switchInGraph(id);
            this.paper.selectedCell = null;
            this.paper.trigger("changed-selected-cell");
            console.log(projectModel);
            console.log(this.paper);
        },
        switchOut: function(diagramType) {
		    projectModel.switchOutGraph(diagramType);
		    this.paper.selectedCell = null;
		    this.paper.trigger('changed-selected-cell');
		    console.log(projectModel);
		    console.log(this.paper);
        },

        deleteOperationAt: function (ind) {
            projectModel.deleteOperation(this.paper.selectedCell.getValues().operations[ind].id);
        }
	});
	return new projectView;
});
