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
				model: projectModel.project.currentGraph.graph,
				width: $('#canvas').width(),
				height:$('#canvas').height(),
				gridSize: 10,
				drawGrid: true,
				background:{
				    color: '#EDF6F6'
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
            this.paper.on('cell:pointerup', _.partial(this.pointerUpFunction, this));
            this.paper.on('cell:pointerdown', _.partial(this.pointerDownFunction, this));
		},
		render: function() {

		},
		addCell: function(event, type, x, y) {
			console.log(projectModel.project);
			if(projectModel.project.currentGraph.itemToBeAdded !== null/* && this.model.project.currentGraph.itemToBeAdded.isElement()*/) {
                projectModel.project.currentGraph.itemToBeAdded.position(x, y);
                projectModel.project.currentGraph.addItemToGraph();
			}
		},
		deleteCell: function(e) {
            projectModel.deleteCell(this.paper.selectedCell);
            this.paper.selectedCell=null;
            this.paper.trigger("changed-cell");
        },
        pointerDownFunction: function (prView, cellView, evt, x, y) {
            if (cellView) {
                //console.log("cella selezionata: ",this.selectedCell);
                //console.log("cellview: ",cellView);
                if (this.selectedCell!==cellView.model) {
                    changed=true;
                    this.selectedCell=cellView.model;
                    console.log('changed-cell');
                    this.trigger("changed-cell");
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
                    return;
            }
        },
        switch: function (id) {
            projectModel.switchInGraph(id);
            this.paper.render();
            this.paper.selectedCell = null;
            this.paper.trigger("changed-cell");
            this.trigger("switchgraph");
        },


        /**
         * Delets the `ind`th method of the diagram.
         * @name ProjectView#deleteMethodAt
         * @param  {number} ind the method index
         * @function
         */
        /*deleteMethodAt: function (ind) {
            projectModel.deleteMethodDiagram(this.paper.selectedCell.getValues().methods[ind].id);
        }*/
	});
	return new projectView;
});
