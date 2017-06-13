Swedesigner.model.packageDiagram.items = {};
Swedesigner.model.packageDiagram.items.Package = joint.shapes.basic.Generic.extend({
    markup: [
        '<g class="scalable">',
        '<rect class="uml-package-name-rect"/>',
        '</g>',
        '<text class="uml-package-name-text"/>',
    ].join(''),
    defaults: _.defaultsDeep({
        type: 'uml.Package',
        attrs: {
            rect: {'width': 200},
            '.uml-package-name-rect': {
                'fill': '#55dd77',
                'stroke': '#000',
                'stroke-width': 2
            },
            '.uml-package-name-text': {
            	'ref': '.uml-package-name-rect',
            	'ref-y': .5,
            	'ref-x': .5,
            	'text-anchor': 'middle',
            	'y-alignment': 'middle',
            	'font-weight': 'bold',
            	'fill': 'black',
            	'font-size': 12,
            	'font-family': 'Times New Roman'
            }
        },
        name: ['PackageName']
    }, joint.shapes.basic.Generic.prototype.defaults),
    initialize: function() {
        this.on('change:name', function() {
            this.updateRectangles();
            this.trigger('uml-update');
        }, this);
        this.updateRectangles();
        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    },
    getPackageName: function() {
        return this.get('name');
    },
    updateRectangles: function() {
        var attrs = this.get('attrs');
        var rects = [
            { type: 'name', text: this.getPackageName() }
        ];
        var offsetY = 0;
        _.each(rects, function(rect) {
            var lines = _.isArray(rect.text) ? rect.text : [rect.text];
            var rectHeight = lines.length * 20 + 20;
            attrs['.uml-package-' + rect.type + '-text'].text = lines.join('\n');
            attrs['.uml-package-' + rect.type + '-rect'].height = rectHeight;
            attrs['.uml-package-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';
            offsetY += rectHeight;
        });
    }
});

Swedesigner.model.packageDiagram.items.PackageView = joint.dia.ElementView.extend({
    initialize: function() {
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);
        this.listenTo(this.model, 'uml-update', function() {
            this.update();
            this.resize();
        });
    }
});
