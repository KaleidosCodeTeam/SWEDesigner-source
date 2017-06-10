Swedesigner.model.packageDiagram.items.Package = joint.shapes.basic.Generic.extend({
    markup: ['<g class="rotatable">',
    		'<g class="scalable">',
    		'<rect class="package-name-rect"/><rect class="package-divider-rect"/>',
    		'</g>',
    		'<text class="package-name-text"/>',
    		'</g>'
    ].join(),
    defaults: _.defaultsDeep({
        type: 'package.Package',
        position: {x: 200, y: 200},
        size: {width: 100, height: 100},
        attrs: {
            rect: {'width': 200},
            '.package-name-rect': {
                'stroke': '#d6b656',
                'stroke-width': 1,
                'fill': '#fff2cc'
            },
            '.package-divider-rect': {
                'stroke': 'black',
                'stroke-width': 1,
                'fill': 'black'
            },
            '.package-name-text': {
                'ref': '.uml-class-name-rect',
                'ref-y': .6,
                'ref-x': .5,
                'text-anchor': 'middle',
                'y-alignment': 'middle',
                'fill': '#222222',
                'font-size': 16,
                'font-family': 'Roboto'
            }
        },
        values: {
            name: "PackageName",
          	subPackages = []
        }
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
            attrs['.package-' + rect.type + '-text'].text = lines.join('\n');
            attrs['.uml-class-' + rect.type + '-rect'].height = rectHeight;
            attrs['.uml-class-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';

            offsetY += rectHeight;
        });
    }
});

Swedesigner.model.packageDiagram.items.PackageView = joint.dia.ElementView.extend({
	/*
    initialize: function() {

        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

        this.listenTo(this.model, 'uml-update', function() {
            this.update();
            this.resize();
        });
    }
    */
});
