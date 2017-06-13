define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'models/items/swedesignerItems'
], function ($, _, Backbone, joint, items) {
	/**
	 *  @module client.models
	 *  @class PackageDiagram
	 *  @classdesc Model per il diagramma dei package.
	 *  @extends {Backbone.model}
	 */
	var PackageDiagram = Backbone.Model.extend({
		/**
	     *  @var {Object} PackageDiagram#graph Joint.js Graph.
	     */
		graph: {},
		itemToBeAdded: null,
		//diagramType: 'package',
		/**
	     *  @function PackageDiagram#initialize
	     *  @summary Metodo di inizializzazione.
	     */
		initialize: function() {
			this.graph=new joint.dia.graph({}, {cellNamespace: Swedesigner.model.packageDiagram.items});
			let myAdjustVertices=_.partial(this.adjustVerticies, this.graph);
			this.graph.on('add remove change:source change:target', myAdjustVertices);
		},
		/**
	     *  @function PackageDiagram#addItem
	     *  @param {Object} item - elemento del diagramma dei package definito swedesignerItems.
	     *  @summary Aggiunge al grafo un elemento passato in input.
	     */
		addItem: function(item) {
			this.itemToBeAdded=item;
		},
		addItemToGraph: function() {
			_.each(this.graph.get('cells').models, function(el) {	// Non sono sicuro se funzionerà
				el.set("z", 1);
			});
			this.graph.addCell(this.itemToBeAdded);
			this.trigger('addCell', this.itemToBeAdded);
			this.itemToBeAdded=null;
		},
		/**
	     *  @function PackageDiagram#deleteItem
	     *  @param {Object} item - elemento del diagramma dei package definito swedesignerItems.
	     *  @summary Elimina dal grafo un elemento passato in input.
	     */
		deleteItem: function(item) {
			// Bisogna capire se il package contiene delle classi ed eventualmente eliminarle


			this.graph.removeCells([item]);
			console.log(this.graph);
			this.trigger('addcell');	// Trigger dell'evento 'addcell' definito su View
		},
		/**
	     *  @function PackageDiagram#getCurrentGraph
	     *  @returns {Object} Graph del diagramma dei package.
	     *  @summary Ritorna il Graph del diagramma dei package.
	     */
		getCurrentGraph: function() {
			return this.get("graph");
		},
		/*getDiagramType: function() {
			return diagramType;
		},*/
		/**
	     *  @function PackageDiagram#adjustVertices
	     *  @param {Object} graph - graph del diagramma.
		 *  @param {Object} cell - elemento del diagramma.
	     *  @summary Aggiusta i vertici del graph quando ci sono link multipli tra elementi.
	     */
		/*adjustVertices: function (graph, cell) {
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
		}*/
	});
	return PackageDiagram;
});