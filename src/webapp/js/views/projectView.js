define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/mainModel',
	'js/models/swedesignerItems'
	/** ecc. */
], function ($, _, Backbone, joint, MainModel, Swedesigner) {
	var ProjectView = Backbone.View.extend({
		el: 'body',
		events: {},
		views: {
			projectView: {},
			titleBarView: {},
			toolbarView: {},
			pathView: {},
			editPanelView: {}
		},
		initialize: function() {
			this.model = MainModel;
			this.paper = new joint.dia.Paper({
				el: $('#canvas'),
				model: this.model.project.graph,
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
                            return Swedesigner.model.packageDiagram.items.BaseView;
                        }
                    } else if (element.get("type").startsWith("classDiagram")) {
                    	if (element.get("type") == "classDiagram.Comment") {
                            return Swedesigner.model.classDiagram.items.CommentView;
                        } else {
                            return Swedesigner.model.classDiagram.items.BaseView;
                        }
                    } else {
                    	return return Swedesigner.model.///////////////////////////////// NOME DIAGRAMMA Diagram.items.BaseView;
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
		},
		render: function() {
		}
	});
	return ProjectView;
});
