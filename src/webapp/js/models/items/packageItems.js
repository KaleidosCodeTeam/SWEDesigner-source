Swedesigner.model.Diagram.items = {};

Swedesigner.model.Diagram.items.Base = joint.shapes.basic.Generic.extend({
	toolMarkup: [
		'<g class="element-tools">',
        '<g class="element-tool-remove"><circle fill="red" r="11"/>',
        '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>',
        '<title>Rimuovi questo elemento</title>',
        '</g>',
        '</g>'].join(''),
        defaults: _.defaultsDeep({
            type: 'uml.Diagram.Base'
        }, joint.shapes.basic.Generic.prototype.defaults),
        initialize: function () {
            this.on('change:values', function () {
                this.updateRectangles();
                this.trigger('uml-update');
            }, this);
            this.updateRectangles();
            joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
        },
        updateRectangles: function() {}
});

Swedesigner.model.Diagram.items.BaseView = joint.dia.ElementView.extend({
    initialize: function () {
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);
        this.listenTo(this.model, 'uml-update', function () {
            this.update();
            this.resize();
        });
    },
    render: function () {
        joint.dia.ElementView.prototype.render.apply(this, arguments);
        this.renderTools();
        this.update();
        return this;
    },
    renderTools: function () {
        var toolMarkup = this.model.toolMarkup || this.model.get('toolMarkup');
        if (toolMarkup) {
            var nodes = joint.V(toolMarkup);
            joint.V(this.el).append(nodes);
        }
        return this;
    }
});

Swedesigner.model.Diagram.items.Package = Swedesigner.model.Diagram.items.Base.extend({
    markup: [
        '<g class="scalable">',
        '<rect class="uml-package-name-rect"/>',
        '</g>',
        '<text class="uml-package-name-text"/>',
    ].join(''),
    defaults: _.defaultsDeep({
        type: 'uml.Diagram.Package',
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
    }, Swedesigner.model.Diagram.items.Base.prototype.defaults),
    initialize: function() {
    	Swedesigner.model.Diagram.items.Base.prototype.initialize.apply(this, arguments);
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
