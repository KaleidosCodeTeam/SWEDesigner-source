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
                    if (element.get("type").startsWith("class")) {
                        
                    } else if (element.get("type").startsWith("class")) {
                    	if (element.get("type") == "class.HxComment") {
                            return celltypes.class.CommentView;
                        } else {
                            return celltypes.class.ClassDiagramElementView;
                        }
                    } else {
                    	return celltypes.activity.ActivityDiagramElementView;
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

                interactive: function (cellView) {
                    if (cellView.model instanceof joint.dia.Link) {
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
