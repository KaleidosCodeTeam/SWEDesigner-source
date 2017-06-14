Swedesigner = {};
Swedesigner.model = {};
Swedesigner.model.packageDiagram = {};
Swedesigner.model.diagram = {};
Swedesigner.model.activityDiagram = {};
Swedesigner.model.bubbleFlowchart = {};

Swedesigner.model.packageDiagram.items = {};

/**
 *  @module Swedesigner.model.packageDiagram.items
 *  @class Base
 *  @classdesc Elemento base generico per diagramma dei package UML.
 *  @extends {joint.shapes.basic.Generic}
 */
Swedesigner.model.packageDiagram.items.Base = joint.shapes.basic.Generic.extend({
	/**
     *  @var {string} Base#markup Markup HTML per la rappresentazione grafica.
     */
	toolMarkup: [
		'<g class="element-tools">',
        '<g class="element-tool-remove"><circle fill="red" r="11"/>',
        '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>',
        '<title>Remove thi element</title>',
        '</g>',
        '</g>'].join(''),
    /**
     *  @var {Object} Base#defaults Attributi di default per l'oggetto.
     */
    defaults: _.defaultsDeep({
        type: 'uml.packageDiagram.Base'
    }, joint.shapes.basic.Generic.prototype.defaults),
    /**
     *  @function Base#initialize
     *  @summary Metodo di inizializzazione: imposta evento al verificarsi del cambio dei valori e chiama il metodo per la renderizzazione dell'item.
     */
    initialize: function () {
        this.on('change:values', function () {
            this.updateRectangles();
            this.trigger('uml-update');
        }, this);
        this.updateRectangles();
        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    },
    /**
     *  @function Base#updateRectangles
     *  @summary Render dell'item.
     *  @abstract
     */
    updateRectangles: function() {}
});

/**
 *  @module Swedesigner.model.packageDiagram.items
 *  @class BaseView
 *  @classdesc View per oggetto "Base".
 *  @extends {joint.dia.ElementView}
 */
Swedesigner.model.packageDiagram.items.BaseView = joint.dia.ElementView.extend({
	/**
     *  @function BaseView#initialize
     *  @summary Metodo di inizializzazione: chiama il metodo "initialize" della classe base e imposta un evento alla reazione del model chiamando sequenzialmente i metodi "update" e "resize".
     */
    initialize: function () {
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);
        this.listenTo(this.model, 'uml-update', function () {
            this.update();
            this.resize();
        });
    },
    /**
     *  @function BaseView#render
     *  @summary Renderizzazione dell'item.
     *  @return {Object} L'oggetto BaseView.
     */
    render: function () {
        joint.dia.ElementView.prototype.render.apply(this, arguments);
        this.renderTools();
        this.update();
        return this;
    },
    
    /**
     *  @function BaseView#renderTools
     *  @summary Assistenza al metodo "render" per la renderizzazione dell'item.
     *  @return {Object} L'oggetto BaseView.
     */
    renderTools: function () {
        var toolMarkup = this.model.toolMarkup || this.model.get('toolMarkup');
        if (toolMarkup) {
            var nodes = joint.V(toolMarkup);
            joint.V(this.el).append(nodes);
        }
        return this;
    }
});

/**
 *  @module Swedesigner.model.packageDiagram.items
 *  @class Package
 *  @classdesc Elemento package per diagramma dei package UML.
 *  @extends {Swedesigner.model.packageDiagram.items.Base}
 */
Swedesigner.model.packageDiagram.items.Package = Swedesigner.model.packageDiagram.items.Base.extend({
    /**
     *  @var {string} Package#markup Markup HTML per la rappresentazione grafica.
     */
    markup: [
        '<g class="scalable">',
        '<rect class="uml-package-name-rect"/>',
        '</g>',
        '<text class="uml-package-name-text"/>',
    ].join(''),
    /**
     *  @var {Object} Package#defaults Attributi di default per l'oggetto Package (tipo, posizione, dimensione, attributi CSS, stato e contenuto dell'oggetto).
     */
    defaults: _.defaultsDeep({
        type: 'uml.packageDiagram.Package',
        position: {x: 200, y: 200},
        size: {width: 100, height: 100},
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
        _package: 'PackageName',
    }, Swedesigner.model.packageDiagram.items.Base.prototype.defaults),
    /**
     *  @function Package#initialize
     *  @summary Metodo di inizializzazione: chiama il metodo "initialize" della classe base.
     */
    initialize: function() {
    	Swedesigner.model.packageDiagram.items.Base.prototype.initialize.apply(this, arguments);
    },
    /**
     *  @function Package#getPackageName
     *  @returns {Object[]} name.
     *  @summary Ritorna l'array contenente i nomi del package.
     */
    getPackageName: function() {
        return this.get('_package');
    },
    /**
     *  @function Package#updateRectangles
     *  @summary Render del package.
     */
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


Swedesigner.model.diagram.items={};

/**
 *  @module Swedesigner.model.diagram.items
 *  @class Base
 *  @classdesc Elemento base generico per diagramma delle classi UML.
 *  @extends {joint.shapes.basic.Generic}
 */
Swedesigner.model.diagram.items.Base=joint.shapes.basic.Generic.extend({
    /**
     *  @var {string} Base#markup Markup HTML per la rappresentazione grafica.
     */
    toolMarkup: [
        '<g class="element-tools">',
        '<g class="element-tool-remove"><circle fill="red" r="11"/>',
        '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>',
        '<title>Remove</title>',
        '</g>',
        '</g>'
    ].join(''),
    /**
     *  @var {Object} Base#defaults Attributi di default per l'oggetto.
     */
    defaults: _.defaultsDeep({
        type: 'uml.Base'
    }, joint.shapes.basic.Generic.prototype.defaults),
    /**
     *  @function Base#initialize
     *  @summary Metodo di inizializzazione: imposta evento al verificarsi del cambio dei valori e chiama il metodo per la renderizzazione dell'item.
     */
    initialize: function() {
        this.on('change:values', function() {
            this.updateRectangles();
            this.trigger('uml-update');
        }, this);
        this.updateRectangles();
        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    },
    /**
     *  @function Base#getValues
     *  @summary Ritorna i valori dell'item (nome, attributi, metodi, ...).
     *  @return {Object} I valori dell'item.
     */
    getValues: function() {
        return this.get('values');
    },
    /**
     *  @function Base#updateRectangles
     *  @summary Render dell'item.
     *  @abstract
     */
    updateRectangles: function() {},
    /**
     *  @function Base#setToValue
     *  @summary Imposta "values.<path>" a "<value>".
     *  @param {Object} value - valore da assegnare.
     *  @param {string} path - percorso al membro.
     */
    setToValue: function(value, path) {
        obj=this.getValues();
        path=path.split('.');
        for (i=0; i<path.length-1; i++) {
            obj=obj[path[i]];
        }
        obj[path[i]]=value;
        this.updateRectangles();
        this.trigger("uml-update");
    },
    /**
     *  @function Base#executeMethod
     *  @summary Esegue il metodo avente il nome passato in input.
     *  @param {function} met - metodo da essere eseguito.
     */
    executeMethod: function(met) {
        return this[met] && this[met].apply(this, [].slice.call(arguments, 1));
    }
});

/**
 *  @module Swedesigner.model.diagram.items
 *  @class BaseView
 *  @classdesc View per oggetto "Base".
 *  @extends {joint.dia.ElementView}
 */
Swedesigner.model.diagram.items.BaseView=joint.dia.ElementView.extend({
    /**
     *  @function BaseView#initialize
     *  @summary Metodo di inizializzazione: chiama il metodo "initialize" della classe base e imposta un evento alla reazione del model chiamando sequenzialmente i metodi "update" e "resize".
     */
    initialize: function () {
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);
        this.listenTo(this.model, 'uml-update', function() {
            this.update();
            this.resize();
        });
    },
    // FORSE DA ELIMINARE events
    /*
     *  @var {Object} BaseView#events Gli eventi della view collegati ai rispettivi callback.
     */
    /*events: {
        'mousedown .togglemethods': 'toggleMethods',
        'mousedown .toggleattributes': 'toggleAttributes'
    },*/
    /**
     *  @function BaseView#render
     *  @summary Renderizzazione dell'item.
     *  @return {Object} L'oggetto BaseView.
     */
    render: function() {
        joint.dia.ElementView.prototype.render.apply(this, arguments);
        this.renderTools();
        this.update();
        return this;
    },
    /**
     *  @function BaseView#renderTools
     *  @summary Assistenza al metodo "render" per la renderizzazione dell'item.
     *  @return {Object} L'oggetto BaseView.
     */
    renderTools: function() {
        var toolMarkup = this.model.toolMarkup || this.model.get('toolMarkup');
        //console.log("markup:", toolMarkup);
        if (toolMarkup) {
            var nodes = joint.V(toolMarkup);
            //console.log("el:", joint.V(this.el));
            joint.V(this.el).append(nodes);
        }
        return this;
    },
    // INIZIO ---- FORSE DA ELIMINARE 
    /*pointerclick: function (evt, x, y) {
        this._dx = x;
        this._dy = y;
        this._action = '';
        var className = evt.target.parentNode.getAttribute('class');
        switch (className) {
            case 'element-tool-remove':
            this.model.remove();
            return;
            break;
            default:
        }
        joint.dia.CellView.prototype.pointerclick.apply(this, arguments);
    },*/
    /*
     * Toggles the display of the class attributes.
     * @name diagramElementView#toggleattributes
     * @function
     */
    /*toggleAttributes: function () {
    },*/ // tolta perché buggata
    /*
     * Toggles the display of the class methods.
     * @name diagramElementView#togglemethods
     * @function
     */
    /*toggleMethods: function () {
    }*/ // tolta perché buggata
    // FINE ---- FORSE DA ELIMINARE
});

/**
 *  @module Swedesigner.model.diagram.items
 *  @class Class
 *  @classdesc Elemento classe per diagramma delle classi UML.
 *  @extends {Swedesigner.model.diagram.items.Base}
 */
Swedesigner.model.diagram.items.Class=Swedesigner.model.diagram.items.Base.extend({
    /**
     *  @function Class#initialize
     *  @summary Metodo di inizializzazione: chiama il metodo "initialize" della classe base.
     */
    initialize: function() {
        Swedesigner.model.diagram.items.Base.prototype.initialize.apply(this, arguments);
    },
    /**
     *  @var {string} Class#markup Markup HTML per la rappresentazione grafica.
     */
    markup: [
        '<g class="rotatable">',
        '<g>',
        '<rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect toggleattributes"/><rect class="uml-class-divider-rect"/><rect class="uml-class-methods-rect togglemethods"/>',
        '</g>',
        '<text class="uml-class-name-text"/><text class="uml-class-attrs-text toggleattributes"/><text class="uml-class-methods-text togglemethods"/>',
        '</g>'
    ].join(''),
    /**
     *  @var {Object} Class#defaults Attributi di default per l'oggetto Class (tipo, posizione, dimensione, attributi CSS, stato e contenuto dell'oggetto).
     */
    defaults: _.defaultsDeep({
        type: 'class.Class',
        position: {x: 200, y: 200},
        size: {width: 100, height: 100},
        attrs: {
            rect: {'width': 200},
            '.uml-class-name-rect': {
                'stroke': '#b38f21',
                'stroke-width': 1,
                'fill': '#ffdf7e'
            },
            '.uml-class-attrs-rect': {
                'stroke': '#b38f21',
                'stroke-width': 1,
                'fill': '#ffdf7e',
                'expanded': 'true'
            },
            '.uml-class-methods-rect': {
                'stroke': '#b38f21',
                'stroke-width': 1,
                'fill': '#ffdf7e',
                'expanded': 'true'
            },
            '.uml-class-divider-rect': {
                'stroke': 'black',
                'stroke-width': 1,
                'fill': 'black'
            },
            '.uml-class-name-text': {
                'ref': '.uml-class-name-rect',
                'ref-y': .44,
                'ref-x': .5,
                'text-anchor': 'middle',
                'y-alignment': 'middle',
                'fill': '#222222',
                'font-size': 14,
                'font-family': 'Roboto'
            },
            '.uml-class-attrs-text': {
                'ref': '.uml-class-attrs-rect',
                'ref-y': 2,
                'ref-x': 5,
                'fill': '#222222',
                'font-size': 12,
                'font-family': 'monospace'
            },
            '.uml-class-methods-text': {
                'ref': '.uml-class-methods-rect',
                'ref-y': 2,
                'ref-x': 5,
                'fill': '#222222',
                'font-size': 12,
                'font-family': 'monospace'
            }
        },
        attributesExpanded: true,
        methodsExpanded: true,
        values: {
        	_visibility: "public",
            _name: "NomeClasse",
            isAbstract: false,
            isInterface : false,
            constructorList : [],
            attributes: [
            	/*{
					_name : "",
					_type : "",
					_default : "",
					_visibility : "",
					isStatic : "",
					isFinal : ""
				}*/
            ],
            operations : [
				/*{
					_name : "",
					_visibility : "",
					returnType : "",
					isStatic : "",
					isAbstract : "",
					isFinal : "",
					parameters : [
						{
							_type : "",
							_name : "",
							_default : ""
						}
					]
				}*/
			],
            //Attributi utili lato client
            static: "false",
            final: "false",
            frozen: "false",
            readOnly: "false",
            enum: "false",
            generic: "false",
        }
    }, Swedesigner.model.diagram.items.Base.prototype.defaults),
    /**
     *  @function Class#updateRectangles
     *  @summary Render della classe.
     */
    updateRectangles: function() {
        var attrs=this.get('attrs');
        var offsetY=0;
        rects = [
            {
                type: 'name',
                text: this.getValues()._name
            },
            {
                type: 'attrs',
                text: this.get('attributesExpanded') ? this.getValues().attributes : "Attributi (premi per espandere)"
            },
            {
                type: 'methods',
                text: this.get('methodsExpanded') ? this.getValues().operations : "Metodi (premi per espandere)"
            }
        ];
        var rectWidth=this.getWidth();
        var rectHeight=1*15+1;
        attrs['.uml-class-name-text'].text=rects[0].text;
        attrs['.uml-class-name-rect'].height=rectHeight;
        attrs['.uml-class-name-rect'].width=rectWidth;
        attrs['.uml-class-name-rect'].transform='translate(0,'+offsetY+')';
        if (this.getValues().isAbstract=="true") {
            attrs['.uml-class-name-text']['font-style']="italic";
        } else {
            attrs['.uml-class-name-text']['font-style']="normal";
        }
        offsetY+=rectHeight;
        //rectHeight = _.isArray(rects[1].text) ? rects[1].text.length*15+1 : 1*15+1;
        if (_.isArray(rects[1].text)) {
            if (rects[1].text.length>0) {
                rectHeight=rects[1].text.length*15+1;
            } else {
                rectHeight=1*15+1;
            }
        } else {
            rectHeight=1*15+1;
        }
        attrs['.uml-class-attrs-text'].text=_.isArray(rects[1].text) ? rects[1].text.map(function(e) {
            let vis="";
            switch (e._visibility) {
                case "public":
                    vis="+";
                    break;
                case "private":
                    vis="-";
                    break;
                case "protected":
                    vis="#";
                    break;
            }
            return vis+" "+e._name+":"+e._type;
        }).join('\n') : rects[1].text;
        attrs['.uml-class-attrs-rect'].height=rectHeight;
        attrs['.uml-class-attrs-rect'].width=rectWidth;
        attrs['.uml-class-attrs-rect'].transform='translate(0,'+offsetY+')';
        offsetY+=rectHeight;
        //rectHeight = _.isArray(rects[2].text) ? rects[2].text.length*15+1 : 1*15+1;
        if (_.isArray(rects[2].text)) {
            if (rects[2].text.length>0) {
                rectHeight=rects[2].text.length*15+1;
            } else {
                rectHeight=1*15+1;
            }
        } else {
            rectHeight=1*15+1;
        }
        attrs['.uml-class-methods-text'].text=_.isArray(rects[2].text) ? rects[2].text.map(function(e) {
            let vis="";
            switch (e._visibility) {
                case "public":
                    vis="+";
                    break;
                case "private":
                    vis="-";
                    break;
                case "protected":
                    vis="#";
                    break;
            }
            let params=e.parameters.map(function(f) {
                return f._name+":"+f._type;
            }).join(",");
            return vis+" "+e._name+"("+params+")"+":"+e.returnType;
        }).join('\n') : rects[2].text;
        attrs['.uml-class-methods-rect'].height=rectHeight;
        attrs['.uml-class-methods-rect'].width=rectWidth;
        attrs['.uml-class-methods-rect'].transform='translate(0,'+offsetY+')';
        Swedesigner.model.diagram.items.Base.prototype.updateRectangles.apply(this, arguments);
    },
    /**
     *  @function Class#addMethod
     *  @summary Aggiunge un nuovo metodo alla classe.
     */
    addMethod: function() {
        this.getValues().operations.push({
            _name: "",
            _visibility: "private",
            id: joint.util.uuid(),
            returnType: "",
            //isStatic: "false",  /** @todo */
            //isAbstract: "false",
            //isFinal: "false",
            parameters: []
        });
    },
    /**
     *  @function Class#addAttribute
     *  @summary Aggiunge un nuovo attributo alla classe.
     */
    addAttribute: function() {
            this.getValues().attributes.push({
                _name: "",
                _type: "",
                _default: "",
                _visibility: "private",
                isStatic: "false",
                isFinal: "false"
            });
        },
    /**
     *  @function Class#addParameter
     *  @param {Number} ind - indice del metodo.
     *  @summary Aggiunge un parametro al metodo passato in input.
     */
    addParameter: function(ind) {
        this.getValues().operations[ind].parameters.push({
            _name: "",
            _type: "",
            _default: ""
        });
    },
    /**
     *  @function Class#deleteParameter
     *  @param {Number} ind - indice del metodo.
     *  @summary Rimuove un parametro dal metodo passato in input.
     */
    deleteParameter: function(met) {
        this.getValues().operations[met[0]].parameters.splice(met[1], 1);
        this.updateRectangles();
        this.trigger("uml-update");
    },
    /**
     *  @function Class#deleteAttribute
     *  @param {Number} ind - indice dell'attributo.
     *  @summary Rimuove un attributo dalla classe.
     */
    deleteAttribute: function(ind) {
        this.getValues().attributes.splice(ind, 1);
        this.updateRectangles();
        this.trigger("uml-update");
    },
    /**
     *  @function Class#deleteMethod
     *  @param {Number} ind - indice del metodo.
     *  @summary Rimuove un metodo dalla classe.
     */
    deleteMethod: function(ind) {
        this.getValues().operations.splice(ind, 1);
        this.updateRectangles();
        this.trigger("uml-update");
    },
    // FORSE DA CAMBIARE /** @todo */
    /**
     *  @function Class#getAttrsDesc
     *  @returns {Object[]} Attributi della classe.
     *  @summary Ritorna la lista di attributi della classe.
     */
    getAttrsDesc: function() {
        let attrDesc=this.getValues().attributes.map(function(e) {
            let vis="";
            switch (e._visibility) {
                case "public":
                    vis="+";
                    break;
                case "private":
                    vis="-";
                    break;
                case "protected":
                    vis="#";
                    break;
            }
            return {'text': vis+e._name+":"+e._type, 'icon': 'assets/attributeicon.png'};
        });
        return attrDesc;
    },
    // FORSE DA CAMBIARE /** @todo */
    /**
     *  @function Class#getMetDesc
     *  @returns {Object[]} Metodi della classe.
     *  @summary Ritorna la lista di metodi della classe.
     */
    getMetDesc: function() {
        let metDesc=this.getValues().operations.map(function(e) {
            let vis="";
            switch (e._visibility) {
                case "public":
                    vis="+";
                    break;
                case "private":
                    vis="-";
                    break;
                case "protected":
                    vis="#";
                    break;
            }
            let params = e.parameters.map(function(f) {
                return f._name+":"+f._type;
            }).join(",");
            return {
                'text': vis+" "+e._name+"("+params+")"+":"+e.returnType,
                'icon': 'assets/methodicon.png'
            };
        });
        return metDesc;
    },
    // FORSE DA CAMBIARE /** @todo */
    /**
     *  @function Class#getItemDesc
     *  @returns {Object} Classe.
     *  @summary Ritorna le informazioni della classe.
     */
    getItemDesc: function() {
        return {
            'text': this.getValues()._name,
            'icon': 'assets/classicon.png',
            'children': this.getAttrsDesc().concat(this.getMetDesc())
        }
    },
    /**
     *  @function Class#getWidth
     *  @returns {Number} Larghezza dell'oggetto grafico.
     *  @summary Ritorna la larghezza dell'oggetto grafico.
     */
    getWidth: function() {
        let longest=rects[0].text.length;
        let tmp=this.getAttrsDesc();
        for (i=0; i<tmp.length; i++) {
            if (tmp[i].text.length>longest) {
                longest=tmp[i].text.length;
            }
        }
        //console.log(longest);
        tmp=this.getMetDesc();
        for (i=0; i<tmp.length; i++) {
            if (tmp[i].text.length>longest) {
                longest=tmp[i].text.length;
            }
        }
        return longest*5+180;
    }
});

/**
 *  @module Swedesigner.model.diagram.items
 *  @class Interface
 *  @classdesc Interfaccia UML.
 *  @extends {Swedesigner.model.diagram.items.Class}
 */
Swedesigner.model.diagram.items.Interface=Swedesigner.model.diagram.items.Base.extend({
    /**
     *  @var {string} Interface#markup Markup HTML per la rappresentazione grafica.
     */
    markup: [
        '<g class="rotatable">',
        '<g class="">',
        '<rect class="uml-class-name-rect"/><rect class="uml-class-methods-rect togglemethods"/>',
        '</g>',
        '<text class="uml-class-name-text"/><text class="uml-class-methods-text togglemethods"/>',
        '</g>'
    ].join(''),
    /**
     *  @var {Object} Interface#defaults Attributi di default per l'oggetto (tipo, posizione, dimensione, attributi CSS, stato e contenuto dell'oggetto).
     */
    defaults: _.defaultsDeep({
        type: 'class.Interface',
        position: {x: 200, y: 200},
        size: {width: 100, height: 100},
        attrs: {
            rect: {'width': 200},
            '.uml-class-name-rect': {
                'stroke': '#b38f21',
                'stroke-width': 1,
                'fill': '#ffdf7e'
            },
            '.uml-class-methods-rect': {
                'stroke': '#b38f21',
                'stroke-width': 1,
                'fill': '#ffdf7e',
                'expanded': 'true'
            },
            '.uml-class-name-text': {
                'ref': '.uml-class-name-rect',
                'ref-y': .5,
                'ref-x': .5,
                'text-anchor': 'middle',
                'y-alignment': 'middle',
                'fill': '#222222',
                'font-size': 14,
                'font-family': 'Roboto'
            },
            '.uml-class-methods-text': {
                'ref': '.uml-class-methods-rect',
                'ref-y': 5,
                'ref-x': 5,
                'fill': '#222222',
                'font-size': 12,
                'font-family': 'monospace'
            }
        },
        methodsExpanded: true,
        values: {
            _name: "NomeInterfaccia",
            operations: [
            	/*{
					_name : "",
					_visibility : "",
					returnType : "",
					isStatic : "",
					isAbstract : "",
					isFinal : "",
					parameters : [
						{
							_type : "",
							_name : "",
							_default : ""
						}
					]
				}*/
            ]
        }
    }, Swedesigner.model.diagram.items.Base.prototype.defaults),
    /**
     *  @function Interface#initialize
     *  @summary Metodo di inizializzazione.
     */
    initialise: function() {
        Swedesigner.model.diagram.items.Base.prototype.initialise.apply(this, arguments);
    },
    /**
     *  @function Interface#updateRectangles
     *  @summary Aggiorna la rappresentazione grafica dell'oggetto.
     */
    updateRectangles: function() {
        var attrs=this.get('attrs');
        var offsetY=0;
        rects = [
            {type: 'name', text: this.getValues()._name},
            {
                type: 'methods',
                text: this.get('methodsExpanded') ? this.getValues().operations : "Metodi (premi per espandere)"
            }
        ];
        var rectWidth=this.getWidth();
        var rectHeight=2*15+1;
        attrs['.uml-class-name-text'].text=["<<interfaccia>>", rects[0].text].join('\n');
        attrs['.uml-class-name-rect'].height=rectHeight;
        attrs['.uml-class-name-rect'].width=rectWidth;
        attrs['.uml-class-name-rect'].transform='translate(0,'+offsetY+')';
        offsetY+=rectHeight;
        //rectHeight=_.isArray(rects[1].text) ? rects[1].text.length*15+1 : 1*15+1;
        if (_.isArray(rects[1].text)) {
            if (rects[1].text.length>0) {
                rectHeight=rects[1].text.length*15+1;
            } else {
                rectHeight=1*15+1;
            }
        } else {
            rectHeight=1*15+1;
        }
        attrs['.uml-class-methods-text'].text=_.isArray(rects[1].text) ? rects[1].text.map(function(e) {
            var vis='';
            switch (e._visibility) {
                case "public":
                    vis="+";
                    break;
                case "private":
                    vis="-";
                    break;
                case "protected":
                    vis="#";
                    break;
            }
            var params=e.parameters.map(function(f) {
                return f._name+":"+f._type;
            }).join(',');
            return vis+" "+e._name+"("+params+")"+":"+e.returnType;
        }).join('\n'):rects[1].text;
        attrs['.uml-class-methods-rect'].height=rectHeight;
        attrs['.uml-class-methods-rect'].width=rectWidth;
        attrs['.uml-class-methods-rect'].transform='translate(0,'+offsetY+')';
        Swedesigner.model.diagram.items.Base.prototype.updateRectangles.apply(this, arguments);
    },
    /**
     *  @function Interface#addMethod
     *  @summary Aggiunge un metodo all'oggetto.
     */
    addMethod: function() {
        this.getValues().operations.push({
            _name: "",
            _visibility: "private",
            id: joint.util.uuid(),
            returnType: "",
            parameters: []
        });
    },
    /**
     *  @function Interface#addParameter
     *  @param {Number} ind - indice del metodo.
     *  @summary Aggiunge un parametro al metodo dell'oggetto indicato.
     */
    addParameter: function(ind) {
        this.getValues().operations[ind].parameters.push({
            _name: "",
            _type: "",
            _default: ""
        });
    },
    // FORSE DA CAMBIARE /** @todo */
    /**
     *  @function Interface#deleteParameter
     *  @param {Number} met - indice del metodo.
     *  @summary Rimuove il primo parametro dal metodo dell'oggetto indicato.
     */
    deleteParameter: function(met) {
        this.getValues().operations[met[0]].parameters.splice(met[1], 1);
    },
    /**
     *  @function Interface#deleteMethod
     *  @param {Number} met - indice del metodo.
     *  @summary Rimuove il metodo indicato dall'oggetto.
     */
    deleteMethod: function(ind) {
        this.getValues().operations.splice(ind, 1);
    },
    // FORSE DA CAMBIARE /** @todo */
    /**
     *  @function Interface#getMetDesc
     *  @returns {Object[]} Metodi della classe.
     *  @summary Ritorna la lista dei metodi dell'interfaccia.
     */
    getMetDesc: function() {
        let methodDesc=this.getValues().operations.map(function(e) {
            let vis="";
            switch (e._visibility) {
                case "public":
                    vis="+";
                    break;
                case "private":
                    vis="-";
                    break;
                case "protected":
                    vis="#";
                    break;
            }
            let params=e.parameters.map(function(f) {
                return f._name+":"+f._type;
            }).join(',');
            return {
                'text': vis+" "+e._name+"("+params+")"+":"+e.returnType,
                'icon': 'assets/methodicon.png'
            };
        });
        return methodDesc;
    },
    // FORSE DA CAMBIARE /** @todo */
    /**
     *  @function Interface#getItemDesc
     *  @returns {Object} Interfaccia.
     *  @summary Ritorna le informazioni dell'interfaccia.
     */
    getItemDesc: function() {
        return {
            'text': this.getValues()._name,
            'icon': 'assets/interfaceicon.png',
            'children': this.getMethodDesc()
        }
    },
    /**
     *  @function Interface#getWidth
     *  @returns {Number} Larghezza dell'oggetto grafico.
     *  @summary Ritorna la larghezza dell'oggetto grafico.
     */
    getWidth: function() {
        let longest=rects[0].text.length;
        //console.log(longest);
        let tmp=this.getMetDesc();
        for (i=0; i<tmp.length; i++) {
            if (tmp[i].text.length>longest) {
                longest=tmp[i].text.length;
            }
        }
        return longest*5+180;
    }
});

/**
 *  @module Swedesigner.model.diagram.items
 *  @class diagramLink
 *  @classdesc Collegamento tra due componenti di un diagramma delle classi UML.
 *  @extends {joint.dia.Link}
 */
Swedesigner.model.diagram.items.diagramLink=joint.dia.Link.extend({
    /**
     *  @var {Object} diagramLink#defaults Attributi di default per l'oggetto.
     */
    defaults: _.defaultsDeep({
        type: 'class.diagramLink',
        source: {x: 30, y: 30},
        target: {x: 150, y: 120}
    }, joint.dia.Link.prototype.defaults),
    /**
     *  @function diagramLink#initialize
     *  @summary Metodo di inizializzazione.
     */
    initialize: function() {
        joint.dia.Link.prototype.initialize.apply(this, arguments);
    },
    /**
     *  @function diagramLink#getValues
     *  @summary Ritorna i valori del collegamento.
     *  @return {Object} I valori del collegamento.
     */
    getValues: function() {
        return this.get("values");
    },
    /**
     *  @function diagramLink#setToValue
     *  @summary Imposta "values.<path>" a "<value>".
     *  @param {Object} value - valore da assegnare.
     *  @param {string} path - percorso al membro.
     */
    setToValue: function(value, path) {
        obj=this.getValues();
        path=path.split('.');
        for (i=0; i<path.length-1; i++) {
            obj=obj[path[i]];
        }
        obj[path[i]]=value;
        this.updateRectangles();
        this.trigger("uml-update");
    }
});

/**
 *  @module Swedesigner.model.diagram.items
 *  @class Generalization
 *  @classdesc Generalizzazione tra due componenti UML.
 *  @extends {Swedesigner.model.diagram.items.diagramLink}
 */
Swedesigner.model.diagram.items.Generalization=Swedesigner.model.diagram.items.diagramLink.extend({
    /**
     *  @var {Object} Generalization#defaults Attributi di default per l'oggetto.
     */
    defaults: _.defaultsDeep({
        type: 'class.Generalization',
        attrs: {'.marker-target': {d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white'}}
    }, Swedesigner.model.diagram.items.diagramLink.prototype.defaults)
});

/**
 *  @module Swedesigner.model.diagram.items
 *  @class Implementation
 *  @classdesc Implementazione tra due componenti UML.
 *  @extends {Swedesigner.model.diagram.items.diagramLink}
 */
Swedesigner.model.diagram.items.Implementation=Swedesigner.model.diagram.items.diagramLink.extend({
    /**
     *  @var {Object} Implementation#defaults Attributi di default per l'oggetto.
     */
    defaults: _.defaultsDeep({
        type: 'class.Implementation',
        attrs: {
            '.marker-target': {d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white'},
            '.connection': {'stroke-dasharray': '3,3'}
        }
    }, Swedesigner.model.diagram.items.diagramLink.prototype.defaults)
});

/**
 *  @module Swedesigner.model.diagram.items
 *  @class Aggregation
 *  @classdesc Aggregazione tra due componenti UML.
 *  @extends {Swedesigner.model.diagram.items.diagramLink}
 */
Swedesigner.model.diagram.items.Aggregation=Swedesigner.model.diagram.items.diagramLink.extend({
    /**
     *  @var {Object} Aggregation#defaults Attributi di default per l'oggetto.
     */
    defaults: _.defaultsDeep({
        type: 'class.Aggregation',
        attrs: {'.marker-target': {d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'white'}}
    }, Swedesigner.model.diagram.items.diagramLink.prototype.defaults)
});

/**
 *  @module Swedesigner.model.diagram.items
 *  @class Composition
 *  @classdesc Composizione tra due componenti UML.
 *  @extends {Swedesigner.model.diagram.items.diagramLink}
 */
Swedesigner.model.diagram.items.Composition=Swedesigner.model.diagram.items.diagramLink.extend({
    /**
     *  @var {Object} Composition#defaults Attributi di default per l'oggetto.
     */
    defaults: _.defaultsDeep({
        type: 'class.Composition',
        attrs: {'.marker-target': {d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'black'}}
    }, Swedesigner.model.diagram.items.diagramLink.prototype.defaults)
});

/**
 *  @module Swedesigner.model.diagram.items
 *  @class Association
 *  @classdesc Associazione tra due componenti UML.
 *  @extends {Swedesigner.model.diagram.items.diagramLink}
 */
Swedesigner.model.diagram.items.Association=Swedesigner.model.diagram.items.diagramLink.extend({
    /**
     *  @var {Object} Association#defaults Attributi di default per l'oggetto.
     */
    defaults: _.defaultsDeep({
        type: 'class.Association',
        attrs: {
            '.marker-target': {
                d: 'M 50 10 L 60 3 M 50 10 L 60 16',
                fill: 'white',
                'fill-opacity': '0.4',
                stroke: 'black'
            },
            /*'.marker-target':{d: 'M 35 0 L 20 10 L 35 20',fill:'white','fill-opacity':'0.4',stroke:'black'},*/
            '.connection': {'stroke-dasharray': '3,3'}
        },
        labels: [
            {
                position: 0.5,
                attrs: {
                    text: {
                        text: ''
                    }
                }
            }
        ],
        values: {
            card: "1",
            attribute: ""
        }
    }, Swedesigner.model.diagram.items.diagramLink.prototype.defaults),
    /**
     *  @function Association#updatelabel
     *  @summary Aggiornamento della label.
     */
    updatelabel: function() {
        this.label(0, {
            attrs: {
                text: {
                    text: this.getcard()+" "+this.getAttribute()
                }
            }
        });
    },
    /**
     *  @function Association#getcard
     *  @returns {Number} Cardinalità della label.
     *  @summary Ritorna la cardinalità della label.
     */
    getcard: function() {
        return this.get('values').card;
    },
    /**
     *  @function Association#getAttribute
     *  @returns {string} Attributo della label.
     *  @summary Ritorna l'attributo della label.
     */
    getAttribute: function() {
        return this.get('values').attribute;
    },
    /**
     *  @function Association#initialize
     *  @summary Metodo di inizializzazione.
     */
    initialize: function() {
        this.updatelabel();
        Swedesigner.model.diagram.items.diagramLink.prototype.initialize.apply(this, arguments);
    },
    /**
     *  @function Association#setToValue
     *  @summary Imposta "values.<path>" a "<value>".
     *  @param {Object} value - valore da assegnare.
     *  @param {string} path - percorso al membro.
     */
    setToValue: function(value, path) {
        obj=this.getValues();
        path=path.split('.');
        for (i=0; i<path.length-1; i++) {
            obj=obj[path[i]];
        }
        obj[path[i]]=value;
        this.updatelabel();
    }
});
