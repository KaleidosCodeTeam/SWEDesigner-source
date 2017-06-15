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
			console.log("prima")
			this.model = new MainModel();
			console.log("dopo")
			this.paper = new joint.dia.Paper({
				el: $('#canvas'),
				model: this.model.project.currentGraph,
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
			var p = new Swedesigner.model.packageDiagram.items.Package({
				position: { x:100  , y: 100 },
				size: { width: 180, height: 50 },
				_package: 'Prova'
			});
			console.log(p);
			this.model.project.currentGraph.graph.addCell(p);
		},
		render: function() {
		},
		deleteCell: function(e) {
            //console.log(e);
            this.model.deleteCell(this.paper.selectedCell);
            this.paper.selectedCell = null;
            this.paper.trigger("changed-cell");
            /*if (e.which == 46) {//ha premuto tasto canc
                if (this.paper.selectedCell) {
                    this.model.deleteCell(this.paper.selectedCell);
                    this.paper.selectedCell = null;
                    this.paper.trigger("changed-cell");
                }
            }*/
        }
        /*pointerDownFunction: function (prView, cellView, evt, x, y) {

            if (cellView) {
                //console.log(this.selectedCell,"cella selez");
                //console.log("cellview ",cellView);
                if (this.selectedCell != cellView.model) {
                    changed = true;
                    this.selectedCell = cellView.model;
                    this.trigger("changed-cell");
                }
            }



            if (ProjectModel.options.cellToBeAdded && ProjectModel.options.cellToBeAdded.isLink()) {
                //console.log(ProjectModel.options.cellToBeAdded.get("source").id);
                if (ProjectModel.options.cellToBeAdded.get("source").id != undefined) {
                    //console.log("set target");
                    ProjectModel.options.cellToBeAdded.set("target", {id: cellView.model.id});
                    ProjectModel.addCellToGraph();
                } else {
                    //console.log("set source");
                    ProjectModel.options.cellToBeAdded.set("source", {id: cellView.model.id});
                }
            }

            if(this.selectedCell) {


                if (cellView.model.get("type").startsWith("activity")) {
                    var cell = cellView.model;
                    console.log(cellView);
                    if (cell.get('parent')) {
                        this.model.getCell(cell.get('parent')).unembed(cell);
                    }
                    var g = this.model.attributes.cells.models;
                    if (this.selectedCell) {
                        var currentCell = this.selectedCell;
                        var currentIndex = g.indexOf(currentCell);
                        if (currentCell) {
                            console.log("mousedown");
                            var figli = this.selectedCell.getEmbeddedCells({deep: true});
                            if (figli) {
                                var move = function (a, old_index, new_index) {
                                    if (new_index >= a.length) {
                                        var k = new_index - a.length;
                                        while ((k--) + 1) {
                                            a.push(undefined);
                                        }
                                    }
                                    a.splice(new_index, 0, a.splice(old_index, 1)[0]);
                                    return a; // for testing purposes
                                };
                                // funzione di debug
                                var debug = function () {
                                    var x = "";

                                    for (var d = 0; d < g.length; d++) {
                                        x += "|" + g[d].get("values").comment[0] + "|";
                                    }
                                    //console.log(x);
                                };

                                //debug();

                                move(g, currentIndex, g.length - 1);

                                for (var i = 0; i < figli.length; i++) {
                                    //console.log("SPOSTO", g[currentIndex].get("values").comment[0]);

                                    move(g, currentIndex, g.length - 1);
                                    //debug();
                                }
                            }
                        }
                        //debug();
                    }
                }
            }
		},*/
	});
	return ProjectView;
});
