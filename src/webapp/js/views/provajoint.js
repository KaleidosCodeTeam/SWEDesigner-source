
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint'
], function ($, _, Backbone, joint) {

    var graph = new joint.dia.Graph();

    var paper = new joint.dia.Paper({
        el: $('#canvas'),
        width: $('#canvas').width(),
        height:$('#canvas').height(),
        model: graph,
        gridSize: 10,
        drawGrid: true,
        background:{
            color: '#EDF6F6'
        }
    });

    var uml = joint.shapes.uml;

	return graph;
});
