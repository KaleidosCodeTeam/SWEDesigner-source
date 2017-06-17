define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/mainModel',
	'js/models/items/swedesignerItems'
	/** ecc. */
], function ($, _, Backbone, joint, MainModel, Swedesigner) {
	var ProjectView = Backbone.View.extend({
		paper: {},
		initialize: function() {
			console.log("ProjectView initialized");
			this.model = new MainModel();
			this.paper = new joint.dia.Paper({
				el: $('#canvas'),
				model: this.model.project.currentGraph.graph,
				width: $('#canvas').width(),
				height:$('#canvas').height(),
				gridSize: 10,
				drawGrid: true,
				background:{
				    color: '#EDF6F6'
				},
				elementView: function (element) {
                    if (element.get("type").startsWith("packageDiagram")) {
                        if (element.get("type") == "packageDiagram.Comment") {
                            return Swedesigner.model.packageDiagram.items.CommentView;
                        } else {
                        	console.log("displaying package baseView");
                            return Swedesigner.model.packageDiagram.items.BaseView;
                        }
                    } else if (element.get("type").startsWith("classDiagram")) {
                    	if (element.get("type") == "classDiagram.Comment") {
                            return Swedesigner.model.classDiagram.items.CommentView;
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
            this.paper.on('cell:pointerup', _.partial(this.pointerUpFunction, this));
            this.paper.on('cell:pointerdown', _.partial(this.pointerDownFunction, this));
		},
		render: function() {

		},
		deleteCell: function(e) {
            this.model.deleteCell(this.paper.selectedCell);
            this.paper.selectedCell=null;
            this.paper.trigger("changed-cell");
        },
        pointerDownFunction: function (prView, cellView, evt, x, y) {
            if (cellView) {
                //console.log("cella selezionata: ",this.selectedCell);
                //console.log("cellview: ",cellView);
                if (this.selectedCell!=cellView.model) {
                    changed=true;
                    this.selectedCell=cellView.model;
                    console.log('changed-cell');
                    this.trigger("changed-cell");
                }
            }
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
            this.panAndZoom.reset();
            this.model.switchToGraph(id);
            if (id!="class") {
                this.visibleElements=this.model.getClassVisibleElements(this.paper.selectedCell);
            } else {
                this.visibleElements = [];
            }
            //console.log("elementi: ", this.visibleElements);
            this.paper.selectedCell = null;
            this.paper.trigger("changed-cell");
            this.trigger("Switchgraph");
        },


        /**
         * Returns whether the current diagram is an
         * activity or a class one.
         * @name ProjectView#getCurrentDiagramType
         * @function
         */
        getCurrentDiagramType: function () {
            return this.model.getCurrentDiagramType();
        },

        /**
         * Delets the `ind`th method of the diagram.
         * @name ProjectView#deleteMethodAt
         * @param  {number} ind the method index
         * @function
         */
        deleteMethodAt: function (ind) {
            this.model.deleteMethodDiagram(this.paper.selectedCell.getValues().methods[ind].id);
        }
	});
	return ProjectView;
});
