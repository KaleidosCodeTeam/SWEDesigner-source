define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
    //'js/models/diagram'
], function ($, _, Backbone, joint/*, diagram*/) {

    var Swedesigner = {};
    Swedesigner.model = {};
    Swedesigner.model.packageDiagram = {};
    Swedesigner.model.classDiagram = {};
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
         *  @var {string} Base#toolMarkup Markup HTML per la rappresentazione grafica.
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
            type: 'packageDiagram.Package',
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
            _importance: "alta",
        }, Swedesigner.model.packageDiagram.items.Base.prototype.defaults),
        classDiagram: {},
        /**
         *  @function Package#initialize
         *  @summary Metodo di inizializzazione: chiama il metodo "initialize" della classe base e crea l'istanza di Diagram associata al diagramma delle classi relativo al package.
         */
        initialize: function() {
        	Swedesigner.model.packageDiagram.items.Base.prototype.initialize.apply(this, arguments);
            this.classDiagram = new Swedesigner.model.Diagram('classDiagram');
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

    /**
     *  @module Swedesigner.model.packageDiagram.items
     *  @class PkgComment
     *  @classdesc Commento per diagramma dei package UML.
     *  @extends {joint.shapes.basic.TextBlock}
     */
    Swedesigner.model.packageDiagram.items.PkgComment = joint.shapes.basic.TextBlock.extend({
        /**
         *  @var {string} PkgComment#toolMarkup Markup HTML per la rappresentazione grafica.
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
         *  @var {Object} PkgComment#defaults Attributi di default per l'oggetto PkgComment.
         */
        defaults: _.defaultsDeep({
            type: "packageDiagram.PkgComment",
            position: {x: 200, y: 200},
            size: {width: 100, height: 100},
            values: {
                comment: ""
            }
        }, joint.shapes.basic.TextBlock.prototype.defaults),
        /**
         *  @function PkgComment#initialize
         *  @summary Metodo di inizializzazione.
         */
        initialize: function () {
            joint.shapes.basic.TextBlock.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function PkgComment#getValues
         *  @summary Ritorna i valori dell'item PkgComment.
         *  @returns {Object} Valori dell'item PkgComment (values.comment per accedere al testo del commento).
         */
        getValues: function () {
            return this.get("values");
        },
        /**
         *  @function PkgComment#setToValue
         *  @summary Imposta "values.<path>" a "<value>".
         *  @param {Object} value - valore da assegnare.
         *  @param {string} path - percorso al membro.
         */
        setToValue: function (value, path) {
            obj = this.getValues();
            path = path.split('.');
            for (i = 0; i < path.length - 1; i++) {
                obj = obj[path[i]];
            }
            obj[path[i]] = value;
            this.updateContent();
            //this.get('content')=value;
            //this.updateRectangles();
            //this.trigger("uml-update");
        },
        /**
         *  @function PkgComment#updateContent
         *  @summary Aggiorna l'item PkgComment.
         */
        updateContent: function () {
            if (joint.env.test('svgforeignobject')) {
                // Content element is a <div> element.
                this.attr({
                    '.content': {
                        html: joint.util.breakText(this.getValues().comment, this.get('size'), this.get('attrs')['.content'])
                    }
                });
            } else {
                // Content element is a <text> element.
                // SVG elements don't have innerHTML attribute.
                this.attr({
                    '.content': {
                        text: joint.util.breakText(this.getValues().comment, cell.get('size'), this.get('attrs')['.content'])
                    }
                });
            }
        }
    });

    /**
     *  @module Swedesigner.model.packageDiagram.items
     *  @class PkgCommentView
     *  @classdesc View per oggetto "PkgComment".
     *  @extends {joint.shapes.basic.TextBlockView}
     */
    Swedesigner.model.packageDiagram.items.PkgCommentView = joint.shapes.basic.TextBlockView.extend({
        /**
         *  @function PkgCommentView#initialize
         *  @summary Metodo di inizializzazione.
         */
        initialize: function () {
            joint.shapes.basic.TextBlockView.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function PkgCommentView#render
         *  @summary Renderizzazione dell'item.
         *  @return {Object} L'oggetto PkgCommentView.
         */
        render: function () {
            joint.shapes.basic.TextBlockView.prototype.render.apply(this, arguments);
            this.renderTools();
            this.update();
            return this;
        },
        /**
         *  @function PkgCommentView#renderTools
         *  @summary Assistenza al metodo "render" per la renderizzazione dell'item.
         *  @return {Object} L'oggetto PkgCommentView.
         */
        renderTools: function () {
            var toolMarkup = this.model.toolMarkup || this.model.get('toolMarkup');
            //console.log("markup:", toolMarkup);
            if (toolMarkup) {
                var nodes = joint.V(toolMarkup);
                //console.log("el:", joint.V(this.el));
                joint.V(this.el).append(nodes);
            }
            return this;
        }
    });

    Swedesigner.model.classDiagram.items={};

    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class Base
     *  @classdesc Elemento base generico per diagramma delle classi UML.
     *  @extends {joint.shapes.basic.Generic}
     */
    Swedesigner.model.classDiagram.items.Base=joint.shapes.basic.Generic.extend({
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
            type: 'uml.classDiagram.Base'
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
     *  @module Swedesigner.model.classDiagram.items
     *  @class BaseView
     *  @classdesc View per oggetto "Base".
     *  @extends {joint.dia.ElementView}
     */
    Swedesigner.model.classDiagram.items.BaseView=joint.dia.ElementView.extend({
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
     *  @module Swedesigner.model.classDiagram.items
     *  @class Class
     *  @classdesc Elemento classe per diagramma delle classi UML.
     *  @extends {Swedesigner.model.classDiagram.items.Base}
     */
    Swedesigner.model.classDiagram.items.Class=Swedesigner.model.classDiagram.items.Base.extend({
        /**
         *  @function Class#initialize
         *  @summary Metodo di inizializzazione: chiama il metodo "initialize" della classe base.
         */
        initialize: function() {
            Swedesigner.model.classDiagram.items.Base.prototype.initialize.apply(this, arguments);
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
            type: 'classDiagram.Class',
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
                _name: "NomeClasse",
            	_visibility: "public",
                _importance: "alta",
                isAbstract: "false",
                isInterface : "false",
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
    							_default : "",
                                _direction: ""
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
                generic: "false"
            }
        }, Swedesigner.model.classDiagram.items.Base.prototype.defaults),
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
            Swedesigner.model.classDiagram.items.Base.prototype.updateRectangles.apply(this, arguments);
        },
        /**
         *  @function Class#addOperation
         *  @summary Aggiunge una nuova operazione alla classe.
         */
        addOperation: function() {
            this.getValues().operations.push({
                _name: "",
                _visibility: "private",
                id: joint.util.uuid(),
                returnType: "",
                isStatic: "false",
                isAbstract: "false",
                isFinal: "false",
                parameters: [],
                bubbleDiagram : new Swedesigner.model.Diagram('bubbleDiagram')
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
         *  @param {Number} ind - indice dell'operazione.
         *  @summary Aggiunge un parametro all'operazione passata in input.
         */
        addParameter: function(ind) {
            this.getValues().operations[ind].parameters.push({
                _name: "",
                _type: "",
                _default: "",
                _direction: "in"
            });
        },
        /**
         *  @function Class#deleteParameter
         *  @param {Number} ind - indice dell'operazione.
         *  @summary Rimuove un parametro dall'operazione passata in input.
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
         *  @function Class#deleteOperation
         *  @param {Number} ind - indice dell'operazione.
         *  @summary Rimuove un'operazione dalla classe.
         */
        deleteOperation: function(ind) {
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
         *  @function Class#getOpDesc
         *  @returns {Object[]} Operazioni della classe.
         *  @summary Ritorna la lista di operazioni della classe.
         */
        getOpDesc: function() {
            let opDesc=this.getValues().operations.map(function(e) {
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
            return opDesc;
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
                'children': this.getAttrsDesc().concat(this.getOpDesc())
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
            tmp=this.getOpDesc();
            for (i=0; i<tmp.length; i++) {
                if (tmp[i].text.length>longest) {
                    longest=tmp[i].text.length;
                }
            }
            return longest*5+180;
        }
    });

    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class Interface
     *  @classdesc Interfaccia UML.
     *  @extends {Swedesigner.model.classDiagram.items.Class}
     */
    Swedesigner.model.classDiagram.items.Interface=Swedesigner.model.classDiagram.items.Base.extend({
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
            type: 'classDiagram.Interface',
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
                _importance: "alta",
                isInterface : "true",
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
    							_default : "",
                                _direction: ""
    						}
    					]
    				}*/
                ]
            }
        }, Swedesigner.model.classDiagram.items.Base.prototype.defaults),
        /**
         *  @function Interface#initialize
         *  @summary Metodo di inizializzazione.
         */
        initialize: function() {
            Swedesigner.model.classDiagram.items.Base.prototype.initialise.apply(this, arguments);
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
            Swedesigner.model.classDiagram.items.Base.prototype.updateRectangles.apply(this, arguments);
        },
        /**
         *  @function Interface#addOperation
         *  @summary Aggiunge un'operazione all'oggetto.
         */
        addOperation: function() {
            this.getValues().operations.push({
                _name: "",
                _visibility: "private",
                id: joint.util.uuid(),
                returnType: "",
                isStatic: "false",
                isAbstract: "false",
                isFinal: "false",
                parameters: []
            });
        },
        /**
         *  @function Interface#addParameter
         *  @param {Number} ind - indice dell'operazione.
         *  @summary Aggiunge un parametro all'operazione dell'oggetto indicato.
         */
        addParameter: function(ind) {
            this.getValues().operations[ind].parameters.push({
                _name: "",
                _type: "",
                _default: "",
                _direction: "in"
            });
        },
        // FORSE DA CAMBIARE /** @todo */
        /**
         *  @function Interface#deleteParameter
         *  @param {Number} met - indice dell'operazione.
         *  @summary Rimuove il primo parametro dall'operazione dell'interfaccia.
         */
        deleteParameter: function(met) {
            this.getValues().operations[met[0]].parameters.splice(met[1], 1);
        },
        /**
         *  @function Interface#deleteOperation
         *  @param {Number} met - indice dell'operazione.
         *  @summary Rimuove un'operazione dall'interfaccia.
         */
        deleteOperation: function(ind) {
            this.getValues().operations.splice(ind, 1);
        },
        // FORSE DA CAMBIARE /** @todo */
        /**
         *  @function Interface#getOpDesc
         *  @returns {Object[]} Operazioni della classe.
         *  @summary Ritorna la lista delle operazioni dell'interfaccia.
         */
        getOpDesc: function() {
            let opDesc=this.getValues().operations.map(function(e) {
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
            return opDesc;
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
            let tmp=this.getOpDesc();
            for (i=0; i<tmp.length; i++) {
                if (tmp[i].text.length>longest) {
                    longest=tmp[i].text.length;
                }
            }
            return longest*5+180;
        }
    });

    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class ClComment
     *  @classdesc Commento per diagramma delle classi UML.
     *  @extends {joint.shapes.basic.TextBlock}
     */
    Swedesigner.model.packageDiagram.items.ClComment = joint.shapes.basic.TextBlock.extend({
        /**
         *  @var {string} ClComment#toolMarkup Markup HTML per la rappresentazione grafica.
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
         *  @var {Object} ClComment#defaults Attributi di default per l'oggetto ClComment.
         */
        defaults: _.defaultsDeep({
            type: "classDiagram.ClComment",
            position: {x: 200, y: 200},
            size: {width: 100, height: 100},
            values: {
                comment: ""
            }
        }, joint.shapes.basic.TextBlock.prototype.defaults),
        /**
         *  @function ClComment#initialize
         *  @summary Metodo di inizializzazione.
         */
        initialize: function () {
            joint.shapes.basic.TextBlock.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function ClComment#getValues
         *  @summary Ritorna i valori dell'item ClComment.
         *  @returns {Object} Valori dell'item ClComment (values.comment per accedere al testo del commento).
         */
        getValues: function () {
            return this.get("values");
        },
        /**
         *  @function ClComment#setToValue
         *  @summary Imposta "values.<path>" a "<value>".
         *  @param {Object} value - valore da assegnare.
         *  @param {string} path - percorso al membro.
         */
        setToValue: function (value, path) {
            obj = this.getValues();
            path = path.split('.');
            for (i = 0; i < path.length - 1; i++) {
                obj = obj[path[i]];
            }
            obj[path[i]] = value;
            this.updateContent();
            //this.get('content')=value;
            //this.updateRectangles();
            //this.trigger("uml-update");
        },
        /**
         *  @function ClComment#updateContent
         *  @summary Aggiorna l'item ClComment.
         */
        updateContent: function () {
            if (joint.env.test('svgforeignobject')) {
                // Content element is a <div> element.
                this.attr({
                    '.content': {
                        html: joint.util.breakText(this.getValues().comment, this.get('size'), this.get('attrs')['.content'])
                    }
                });
            } else {
                // Content element is a <text> element.
                // SVG elements don't have innerHTML attribute.
                this.attr({
                    '.content': {
                        text: joint.util.breakText(this.getValues().comment, cell.get('size'), this.get('attrs')['.content'])
                    }
                });
            }
        }
    });

    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class ClCommentView
     *  @classdesc View per oggetto "ClComment".
     *  @extends {joint.shapes.basic.TextBlockView}
     */
    Swedesigner.model.packageDiagram.items.ClCommentView = joint.shapes.basic.TextBlockView.extend({
        /**
         *  @function ClCommentView#initialize
         *  @summary Metodo di inizializzazione.
         */
        initialize: function () {
            joint.shapes.basic.TextBlockView.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function ClCommentView#render
         *  @summary Renderizzazione dell'item.
         *  @return {Object} L'oggetto ClCommentView.
         */
        render: function () {
            joint.shapes.basic.TextBlockView.prototype.render.apply(this, arguments);
            this.renderTools();
            this.update();
            return this;
        },
        /**
         *  @function ClCommentView#renderTools
         *  @summary Assistenza al metodo "render" per la renderizzazione dell'item.
         *  @return {Object} L'oggetto ClCommentView.
         */
        renderTools: function () {
            var toolMarkup = this.model.toolMarkup || this.model.get('toolMarkup');
            //console.log("markup:", toolMarkup);
            if (toolMarkup) {
                var nodes = joint.V(toolMarkup);
                //console.log("el:", joint.V(this.el));
                joint.V(this.el).append(nodes);
            }
            return this;
        }
    });

    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class classDiagramLink
     *  @classdesc Collegamento tra due componenti di un diagramma delle classi UML.
     *  @extends {joint.dia.Link}
     */
    Swedesigner.model.classDiagram.items.classDiagramLink=joint.dia.Link.extend({
        /**
         *  @var {Object} classDiagramLink#defaults Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.classDiagramLink',
            source: {x: 30, y: 30},
            target: {x: 150, y: 120}
        }, joint.dia.Link.prototype.defaults),
        /**
         *  @function classDiagramLink#initialize
         *  @summary Metodo di inizializzazione.
         */
        initialize: function() {
            joint.dia.Link.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function classDiagramLink#getValues
         *  @summary Ritorna i valori del collegamento.
         *  @return {Object} I valori del collegamento.
         */
        getValues: function() {
            return this.get("values");
        },
        /**
         *  @function classDiagramLink#setToValue
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
     *  @module Swedesigner.model.classDiagram.items
     *  @class Generalization
     *  @classdesc Generalizzazione tra due componenti UML.
     *  @extends {Swedesigner.model.classDiagram.items.classDiagramLink}
     */
    Swedesigner.model.classDiagram.items.Generalization=Swedesigner.model.classDiagram.items.classDiagramLink.extend({
        /**
         *  @var {Object} Generalization#defaults Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.Generalization',
            attrs: {'.marker-target': {d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white'}}
        }, Swedesigner.model.classDiagram.items.classDiagramLink.prototype.defaults)
    });

    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class Implementation
     *  @classdesc Implementazione tra due componenti UML.
     *  @extends {Swedesigner.model.classDiagram.items.classDiagramink}
     */
    Swedesigner.model.classDiagram.items.Implementation=Swedesigner.model.classDiagram.items.classDiagramLink.extend({
        /**
         *  @var {Object} Implementation#defaults Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.Implementation',
            attrs: {
                '.marker-target': {d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white'},
                '.connection': {'stroke-dasharray': '3,3'}
            }
        }, Swedesigner.model.classDiagram.items.classDiagramLink.prototype.defaults)
    });

    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class Aggregation
     *  @classdesc Aggregazione tra due componenti UML.
     *  @extends {Swedesigner.model.classDiagram.items.classDiagramLink}
     */
    Swedesigner.model.classDiagram.items.Aggregation=Swedesigner.model.classDiagram.items.classDiagramLink.extend({
        /**
         *  @var {Object} Aggregation#defaults Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.Aggregation',
            attrs: {'.marker-target': {d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'white'}}
        }, Swedesigner.model.classDiagram.items.classDiagramLink.prototype.defaults)
    });

    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class Composition
     *  @classdesc Composizione tra due componenti UML.
     *  @extends {Swedesigner.model.classDiagram.items.classDiagramLink}
     */
    Swedesigner.model.classDiagram.items.Composition=Swedesigner.model.classDiagram.items.classDiagramLink.extend({
        /**
         *  @var {Object} Composition#defaults Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.Composition',
            attrs: {'.marker-target': {d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'black'}}
        }, Swedesigner.model.classDiagram.items.classDiagramLink.prototype.defaults)
    });

    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class Association
     *  @classdesc Associazione tra due componenti UML.
     *  @extends {Swedesigner.model.classDiagram.items.classDiagramLink}
     */
    Swedesigner.model.classDiagram.items.Association=Swedesigner.model.classDiagram.items.classDiagramLink.extend({
        /**
         *  @var {Object} Association#defaults Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.Association',
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
        }, Swedesigner.model.classDiagram.items.classDiagramLink.prototype.defaults),
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
            Swedesigner.model.classDiagram.items.classDiagramLink.prototype.initialize.apply(this, arguments);
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



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    /**
     *  @module client.models
     *  @class Diagram
     *  @classdesc Model per i diagrammi.
     *  @extends {Backbone.model}
     */
    Swedesigner.model.Diagram = Backbone.Model.extend({
        /**
         *  @var {Object} Diagram#graph Joint.js Graph.
         */
        graph: {},
        itemToBeAdded: null,
        diagramType: null,
        /**
         *  @function Diagram#initialize
         *  @summary Metodo di inizializzazione.
         */
        initialize: function(dType) {
            if (dType=='packageDiagram') {
                this.graph = new joint.dia.Graph({}, {cellNamespace: Swedesigner.model.packageDiagram.items});
                console.log(this.graph)
            } else if (dType=='classDiagram') {
                this.graph = new joint.dia.Graph({}, {cellNamespace: Swedesigner.model.classDiagram.items});
            } else if (dType=='bubbleDiagram') {
                this.graph = new joint.dia.Graph({}, {cellNamespace: Swedesigner.model.bubbleDiagram.items});
            } else {
                this.graph=null;
            }
            this.diagramType = dType;
            //let myAdjustVertices = _.partial(this.adjustVerticies, this.graph);
            //this.graph.on('add remove change:source change:target', myAdjustVertices);
        },
        /**
         *  @function Diagram#addItem
         *  @param {Object} item - elemento del diagramma definito in swedesignerItems.
         *  @summary Aggiunge al grafo un elemento passato in input.
         */
        addItem: function(item) {
            this.itemToBeAdded=item;
        },
        addItemToGraph: function() {
            _.each(this.graph.get('cells').models, function(el) {   // Non sono sicuro se funzionerà
                el.set("z", 1);
            });
            this.graph.addCell(this.itemToBeAdded);
            this.trigger('addCell', this.itemToBeAdded);
            this.itemToBeAdded=null;
        },
        /**
         *  @function Diagram#deleteItem
         *  @param {Object} item - elemento del diagramma definito in swedesignerItems.
         *  @summary Elimina dal grafo un elemento passato in input.
         */
        deleteItem: function(item) {
            this.graph.removeCells([item]);
            console.log(this.graph);
            this.trigger('addcell');    // Trigger dell'evento 'addcell' definito su View
        },
        /**
         *  @function Diagram#getCurrentGraph
         *  @returns {Object} Graph del diagramma.
         *  @summary Ritorna il Graph del diagramma.
         */
        getCurrentGraph: function() {
            return this.get("graph");
        },
        /**
         *  @function Diagram#getDiagramType
         *  @returns {Object} Tipo del diagramma.
         *  @summary Ritorna il tipo del diagramma. 
         */
        getDiagramType: function() {
            return this.diagramType;
        },
        /**
         *  @function Diagram#adjustVertices
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







	return Swedesigner;
});
