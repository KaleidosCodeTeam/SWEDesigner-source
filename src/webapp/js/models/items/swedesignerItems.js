/**
 *  @file Contiene le celle jointJS personalizzate Swedesigner.
 *  @author Bonolo Marco, Pezzuto Francesco, Sovilla Matteo - KaleidosCode
 */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint'
], function ($, _, Backbone, joint) {

    var Swedesigner = {};
    Swedesigner.model = {};
    Swedesigner.model.packageDiagram = {};
    Swedesigner.model.classDiagram = {};
    Swedesigner.model.bubbleDiagram = {};

//------------------------------------------------------------------ PACKAGE DIAGRAM ----------------------------------------------------------------
    Swedesigner.model.packageDiagram.items = {};
    /**
     *  @module Swedesigner.model.packageDiagram.items
     *  @class packageDiagram::Base
     *  @classdesc Elemento base generico per diagramma dei package UML.
     *  @extends {joint.shapes.basic.Generic}
     */
    Swedesigner.model.packageDiagram.items.Base = joint.shapes.basic.Generic.extend({
    	/**
         *  @var {string} packageDiagram::Base#toolMarkup - Markup HTML per la rappresentazione grafica.
         */
    	toolMarkup: [
    		'<g class="element-tools">',
            '<g class="element-tool-remove"><circle fill="red" r="11"/>',
            '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>',
            '<title>Remove this element</title>',
            '</g>',
            '</g>'].join(''),
        /**
         *  @var {Object} packageDiagram::Base#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'uml.packageDiagram.Base'
        }, joint.shapes.basic.Generic.prototype.defaults),
        /**
         *  @function packageDiagram::Base#initialize
         *  @summary Inizializzazione di Base: imposta evento al verificarsi del cambio dei valori e chiama il metodo per la renderizzazione dell'item.
         */
        initialize: function() {
            this.on('change:values', function () {
                this.updateRectangles();
                this.trigger('uml-update');
            }, this);
            this.updateRectangles();
            joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function packageDiagram::Base#updateRectangles
         *  @summary Render dell'item.
         *  @abstract
         */
        updateRectangles: function() {},
        /**
         *  @function packageDiagram::Base#getValues
         *  @return {Object} I valori ("values") dell'item.
         *  @summary Ritorna i valori dell'item.
         */
        getValues: function() {
            return this.get("values");
        }
    });
    /**
     *  @module Swedesigner.model.packageDiagram.items
     *  @class packageDiagram::BaseView
     *  @classdesc View per item "packageDiagram::Base".
     *  @extends {joint.dia.ElementView}
     */
    Swedesigner.model.packageDiagram.items.BaseView = joint.dia.ElementView.extend({
    	/**
         *  @function packageDiagram::BaseView#initialize
         *  @summary Inizializzazione di BaseView: chiama il metodo "initialize" della classe "packageDiagram::Base" e imposta un evento alla reazione del model
         *  chiamando sequenzialmente i metodi "update" e "resize".
         */
        initialize: function() {
            joint.dia.ElementView.prototype.initialize.apply(this, arguments);
            this.listenTo(this.model, 'uml-update', function () {
                this.update();
                this.resize();
            });
        },
        /**
         *  @function packageDiagram::BaseView#render
         *  @return {Object} L'oggetto BaseView.
         *  @summary Render dell'item.
         */
        render: function () {
            joint.dia.ElementView.prototype.render.apply(this, arguments);
            this.renderTools();
            this.update();
            return this;
        },
        /**
         *  @function packageDiagram::BaseView#renderTools
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
         *  @var {string} Package#markup - Markup HTML per la rappresentazione grafica.
         */
        markup: [
            '<g class="scalable">',
            '<rect class="uml-package-name-rect"/>',
            '</g>',
            '<text class="uml-package-name-text"/>',
        ].join(''),
        /**
         *  @var {Object} Package#defaults - Attributi di default per l'oggetto Package (tipo, posizione, dimensione, attributi CSS, stato e
         *  contenuto dell'oggetto).
         */
        defaults: _.defaultsDeep({
            type: 'packageDiagram.items.Package',
            position: {x: 200, y: 200},
            size: {width: 100, height: 100},
            attrs: {
                rect: {'width': 200},
                '.uml-package-name-rect': {
                    'fill': '#f9c956',
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
            values: {
                _package: "PackageName",
                _importance: "media"
            }
        }, Swedesigner.model.packageDiagram.items.Base.prototype.defaults),
        /**
         *  @function Package#initialize
         *  @summary Inizializzazione di Package: chiama il metodo "initialize" della classe base e crea l'istanza di Diagram associata al
         *  diagramma delle classi relativo al package.
         */
        initialize: function() {
        	Swedesigner.model.packageDiagram.items.Base.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function Package#getPackageName
         *  @returns {string} Nome del package.
         *  @summary Ritorna il nome del package.
         */
        getPackageName: function() {
            return this.get('values')._package;
        },
        /**
         *  @function Package#updateRectangles
         *  @summary Render del package.
         */
        updateRectangles: function() {
            var attrs = this.get('attrs');
            var rects = [
                { type: 'name', text: this.getValues()._package }
            ];
            var colour = '';
            switch (this.getValues()._importance) {
                case "alta":
                    colour = '#ec2d1f';
                    break;
                case "media":
                    colour = '#f9c956';
                    break;
                case "bassa":
                    colour = 'white';
                    break;
            }
            attrs['.uml-package-name-rect'].fill = colour;
            var rectWidth = this.getValues()._package.length * 5 + 300;
            //console.log('package#updateRectangles');
            //console.log(rectWidth);
            var offsetY = 0;
            _.each(rects, function(rect) {
                var lines = _.isArray(rect.text) ? rect.text : [rect.text];
                var rectHeight = lines.length * 20 + 20;
                attrs['.uml-package-' + rect.type + '-text'].text = lines.join('\n');
                attrs['.uml-package-' + rect.type + '-rect'].height = rectHeight;
                attrs['.uml-package-' + rect.type + '-rect'].width = rectWidth;
                attrs['.uml-package-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';
                offsetY += rectHeight;
            });
        },
        /**
         *  @function Base#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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
     *  @module Swedesigner.model.packageDiagram.items
     *  @class PkgComment
     *  @classdesc Commento per diagramma dei package UML.
     *  @extends {joint.shapes.basic.TextBlock}
     */
    Swedesigner.model.packageDiagram.items.PkgComment = joint.shapes.basic.TextBlock.extend({
        /**
         *  @var {string} PkgComment#toolMarkup - Markup HTML per la rappresentazione grafica.
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
         *  @var {Object} PkgComment#defaults - Attributi di default per l'oggetto PkgComment.
         */
        defaults: _.defaultsDeep({
            type: "packageDiagram.items.PkgComment",
            position: {x: 200, y: 200},
            size: {width: 100, height: 100},
            values: {
                comment: ""
            }
        }, joint.shapes.basic.TextBlock.prototype.defaults),
        /**
         *  @function PkgComment#initialize
         *  @summary Inizializzazione di PkgComment.
         */
        initialize: function() {
            joint.shapes.basic.TextBlock.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function PkgComment#getValues
         *  @returns {Object} Valori dell'item PkgComment (values.comment per accedere al testo del commento).
         *  @summary Ritorna i valori dell'item PkgComment.
         */
        getValues: function() {
            return this.get("values");
        },
        /**
         *  @function PkgComment#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
         */
        setToValue: function(value, path) {
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
         *  @summary Aggiorna il contenuto dell'item PkgComment.
         */
        updateContent: function() {
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
         *  @summary Inizializzazione di PkgCommentView.
         */
        initialize: function () {
            joint.shapes.basic.TextBlockView.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function PkgCommentView#render
         *  @return {Object} L'oggetto PkgCommentView.
         *  @summary Render dell'item PkgCommentView.
         */
        render: function () {
            joint.shapes.basic.TextBlockView.prototype.render.apply(this, arguments);
            this.renderTools();
            this.update();
            return this;
        },
        /**
         *  @function PkgCommentView#renderTools
         *  @return {Object} L'oggetto PkgCommentView.
         *  @summary Assistenza al metodo "render" per la renderizzazione dell'item.
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
     *  @module Swedesigner.model.packageDiagram.items
     *  @class packageDiagramLink
     *  @classdesc Collegamento tra due componenti di un diagramma dei package UML.
     *  @extends {joint.dia.Link}
     */
    Swedesigner.model.packageDiagram.items.packageDiagramLink = joint.dia.Link.extend({
        /**
         *  @var {Object} packageDiagramLink#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'packageDiagram.items.packageDiagramLink',
            source: {x: 30, y: 30},
            target: {x: 150, y: 120},
            attrs: {'.marker-target': {d: 'M 20 0 L 0 10 L 20 20 z', fill: 'grey'}}
        }, joint.dia.Link.prototype.defaults),
        /**
         *  @function packageDiagramLink#initialize
         *  @summary Inizializzazione di PackageDiagramLink.
         */
        initialize: function() {
            joint.dia.Link.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function packageDiagramLink#getValues
         *  @return {Object} I valori del collegamento.
         *  @summary Ritorna i valori del collegamento.
         */
        getValues: function() {
            return this.get("values");
        },
        /**
         *  @function packageDiagramLink#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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
     *  @module Swedesigner.model.packageDiagram.items
     *  @class PkgCommentLink
     *  @classdesc Link tra un commento e un componente UML del diagramma dei package.
     *  @extends {Swedesigner.model.packageDiagram.items.packageDiagramLink}
     */
    Swedesigner.model.packageDiagram.items.PkgCommentLink = Swedesigner.model.packageDiagram.items.packageDiagramLink.extend({
        /**
         *  @var {Object} PkgCommentLink#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'packageDiagram.items.PkgCommentLink',
            attrs: {
            		'.connection': { stroke: 'black', 'stroke-width': 2, 'stroke-dasharray': '5 5' }
			}
        }, Swedesigner.model.packageDiagram.items.packageDiagramLink.prototype.defaults)
    });
    /**
     *  @module Swedesigner.model.packageDiagram.items
     *  @class PkgDependency
     *  @classdesc Dipendenza tra due package UML del diagramma dei package.
     *  @extends {Swedesigner.model.packageDiagram.items.packageDiagramLink}
     */
    Swedesigner.model.packageDiagram.items.PkgDependency = Swedesigner.model.packageDiagram.items.packageDiagramLink.extend({
        /**
         *  @var {Object} PkgDependency#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'packageDiagram.items.PkgDependency',
            attrs: {
            		'.connection': { stroke: 'black', 'stroke-width': 2}
			}
        }, Swedesigner.model.packageDiagram.items.packageDiagramLink.prototype.defaults)
    });

//--------------------------------------------------------------------- CLASS DIAGRAM ----------------------------------------------------------------
    Swedesigner.model.classDiagram.items = {};
    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class classDiagram::Base
     *  @classdesc Elemento base generico per diagramma delle classi UML.
     *  @extends {joint.shapes.basic.Generic}
     */
    Swedesigner.model.classDiagram.items.Base = joint.shapes.basic.Generic.extend({
        /**
         *  @var {string} classDiagram::Base#markup - Markup HTML per la rappresentazione grafica.
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
         *  @var {Object} classDiagram::Base#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'uml.classDiagram.Base'
        }, joint.shapes.basic.Generic.prototype.defaults),
        /**
         *  @function classDiagram::Base#initialize
         *  @summary Inizializzazione di Base: imposta evento al verificarsi del cambio dei valori e chiama il metodo per la renderizzazione dell'item.
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
         *  @function classDiagram::Base#getValues
         *  @return {Object} I valori dell'item.
         *  @summary Ritorna i valori dell'item ("values").
         */
        getValues: function() {
            return this.get('values');
        },
        /**
         *  @function classDiagram::Base#updateRectangles
         *  @summary Render dell'item.
         *  @abstract
         */
        updateRectangles: function() {},
        /**
         *  @function classDiagram::Base#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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
         *  @function classDiagram::Base#executeMethod
         *  @param {function} met - Metodo da essere eseguito.
         *  @summary Esegue il metodo avente il nome passato in input.
         */
        executeMethod: function(met) {
            return this[met] && this[met].apply(this, [].slice.call(arguments, 1));
        }
    });
    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class classDiagram::BaseView
     *  @classdesc View per oggetto "Base".
     *  @extends {joint.dia.ElementView}
     */
    Swedesigner.model.classDiagram.items.BaseView = joint.dia.ElementView.extend({
        /**
         *  @function classDiagram::BaseView#initialize
         *  @summary Inizializzazione di BaseView: chiama il metodo "initialize" della classe classDiagram::Base e imposta un evento alla reazione del model
         *  chiamando sequenzialmente i metodi "update" e "resize".
         */
        initialize: function() {
            joint.dia.ElementView.prototype.initialize.apply(this, arguments);
            this.listenTo(this.model, 'uml-update', function() {
                this.update();
                this.resize();
            });
        },
        /**
         *  @function classDiagram::BaseView#render
         *  @return {Object} L'oggetto BaseView.
         *  @summary Render dell'item.
         */
        render: function() {
            joint.dia.ElementView.prototype.render.apply(this, arguments);
            this.renderTools();
            this.update();
            return this;
        },
        /**
         *  @function classDiagram::BaseView#renderTools
         *  @return {Object} L'oggetto BaseView.
         *  @summary Assistenza al metodo "render" per la renderizzazione dell'item.
         */
        renderTools: function() {
            var toolMarkup = this.model.toolMarkup || this.model.get('toolMarkup');
            //console.log("markup: ", toolMarkup);
            if (toolMarkup) {
                var nodes = joint.V(toolMarkup);
                //console.log("el: ", joint.V(this.el));
                joint.V(this.el).append(nodes);
            }
            return this;
        }
    });
    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class Class
     *  @classdesc Elemento classe per diagramma delle classi UML.
     *  @extends {Swedesigner.model.classDiagram.items.Base}
     */
    Swedesigner.model.classDiagram.items.Class = Swedesigner.model.classDiagram.items.Base.extend({
        /**
         *  @function Class#initialize
         *  @summary Inizializzazione di Class: chiama il metodo "initialize" della classe base.
         */
        initialize: function() {
            Swedesigner.model.classDiagram.items.Base.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @var {string} Class#markup - Markup HTML per la rappresentazione grafica.
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
         *  @var {Object} Class#defaults - Attributi di default per l'oggetto Class (tipo, posizione, dimensione, attributi CSS, stato e contenuto dell'oggetto).
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.items.Class',
            position: {x: 200, y: 200},
            size: {width: 100, height: 100},
            attrs: {
                rect: {'width': 200},
                '.uml-class-name-rect': {
                    'stroke': '#000',
                    'stroke-width': 1,
                    'fill': '#f9c956'
                },
                '.uml-class-attrs-rect': {
                    'stroke': '#000',
                    'stroke-width': 1,
                    'fill': '#f9c956',
                    'expanded': 'true'
                },
                '.uml-class-methods-rect': {
                    'stroke': '#000',
                    'stroke-width': 1,
                    'fill': '#f9c956',
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
                },
            },
            attributesExpanded: true,
            methodsExpanded: true,
            values: {
                _name: "NomeClasse",
            	_visibility: "public",
                _importance: "media",
                isAbstract: "false",
                isInterface : "false",
                constructorList : [],
                attributes: [
                	/*{
    					_name: "",
    					_type: "",
    					_default: "",
    					_visibility: "",
    					isStatic: "",
    					isFinal: ""
    				}*/
                ],
                operations : [
    				/*{
    					_name: "",
    					_visibility: "",
                        id: joint.util.uuid(),
    					returnType: "",
    					isStatic: "",
    					isAbstract: "",
    					isFinal: "",
    					parameters: [
    						{
                                _name: "",
    							_type: "",
    							_default: "",
                                _direction: ""
    						}
    					]
    				}*/
    			],
                // Attributi utili lato client
                isStatic: "false",
                isFinal: "false",
                isFrozen: "false",
                isReadOnly: "false",
                isEnum: "false",
                isGeneric: "false"
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
            var colour = '';
            switch (this.getValues()._importance) {
                case "alta":
                    colour = '#ec2d1f';
                    break;
                case "media":
                    colour = '#f9c956';
                    break;
                case "bassa":
                    colour = 'white';
                    break;
            }
            attrs['.uml-class-name-rect'].fill = colour;
            attrs['.uml-class-attrs-rect'].fill = colour;
            attrs['.uml-class-methods-rect'].fill = colour;
            var rectWidth=this.getWidth();
            var rectHeight=1*15+1;
            attrs['.uml-class-name-text'].text=rects[0].text;
            attrs['.uml-class-name-rect'].height=rectHeight;
            attrs['.uml-class-name-rect'].width=rectWidth;
            attrs['.uml-class-name-rect'].transform='translate(0,'+offsetY+')';
            if (this.getValues().isAbstract==="true") {
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
                    case "package":
                        vis="~";
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
                    case "package":
                        vis="~";
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
                _name: "nuovaOperazione",
                _visibility: "private",
                id: joint.util.uuid(),
                returnType: "",
                isStatic: "false",
                isAbstract: "false",
                isFinal: "false",
                parameters: []
            });
            this.updateRectangles();
            this.trigger("uml-update");
        },
        /**
         *  @function Class#addAttribute
         *  @summary Aggiunge un nuovo attributo alla classe.
         */
        addAttribute: function() {
            this.getValues().attributes.push({
                _name: "nuovoAttributo",
                _type: "",
                _default: "",
                _visibility: "private",
                isStatic: "false",
                isFinal: "false"
            });
            this.updateRectangles();
            this.trigger("uml-update");
        },
        /**
         *  @function Class#addParameter
         *  @param {Number} ind - Indice dell'operazione.
         *  @summary Aggiunge un parametro all'operazione passata in input.
         */
        addParameter: function(ind) {
            this.getValues().operations[ind].parameters.push({
                _name: "nuovoParametro",
                _type: "",
                _default: "",
                _direction: "in"
            });
            this.updateRectangles();
            this.trigger("uml-update");
        },
        /**
         *  @function Class#deleteParameter
         *  @param {Number} ind - Indice dell'operazione.
         *  @summary Rimuove un parametro dall'operazione passata in input.
         */
        deleteParameter: function(met) {
            this.getValues().operations[met[0]].parameters.splice(met[1], 1);
            this.updateRectangles();
            this.trigger("uml-update");
        },
        /**
         *  @function Class#deleteAttribute
         *  @param {Number} ind - Indice dell'attributo.
         *  @summary Rimuove un attributo dalla classe.
         */
        deleteAttribute: function(ind) {
            this.getValues().attributes.splice(ind, 1);
            this.updateRectangles();
            this.trigger("uml-update");
        },
        /**
         *  @function Class#deleteOperation
         *  @param {Number} ind - Indice dell'operazione.
         *  @summary Rimuove un'operazione dalla classe.
         */
        deleteOperation: function(ind) {
            this.getValues().operations.splice(ind, 1);
            this.updateRectangles();
            this.trigger("uml-update");
        },
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
                    case "package":
                        vis="~";
                        break;
                }
                return {'text': vis+e._name+":"+e._type};
            });
            return attrDesc;
        },
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
                    case "package":
                        vis="~";
                        break;
                }
                let params = e.parameters.map(function(f) {
                    return f._name+":"+f._type;
                }).join(",");
                return {
                    'text': vis+" "+e._name+"("+params+")"+":"+e.returnType,
                };
            });
            return opDesc;
        },
        /**
         *  @function Class#getItemDesc
         *  @returns {Object} Informazioni della classe.
         *  @summary Ritorna le informazioni della classe.
         */
        getItemDesc: function() {
            return {
                'text': this.getValues()._name,
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
    Swedesigner.model.classDiagram.items.Interface = Swedesigner.model.classDiagram.items.Base.extend({
        /**
         *  @var {string} Interface#markup - Markup HTML per la rappresentazione grafica.
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
         *  @var {Object} Interface#defaults - Attributi di default per l'oggetto (tipo, posizione, dimensione, attributi CSS, stato e contenuto dell'oggetto).
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.items.Interface',
            position: {x: 200, y: 200},
            size: {width: 100, height: 100},
            attrs: {
                rect: {'width': 200},
                '.uml-class-name-rect': {
                    'stroke': '#000',
                    'stroke-width': 1,
                    'fill': '#f9c956'
                },
                '.uml-class-methods-rect': {
                    'stroke': '#000',
                    'stroke-width': 1,
                    'fill': '#f9c956',
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
                _visibility: "public",
                _importance: "media",
                isInterface : "true",
                operations: [
                	/*{
    					_name : "",
    					_visibility : "",
                        id: joint.util.uuid(),
    					returnType : "",
    					isStatic : "",
    					isAbstract : "",
    					isFinal : "",
    					parameters : [
    						{
                                _name : "",
    							_type : "",
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
         *  @summary Inizializzazione di Interface.
         */
        initialize: function() {
            Swedesigner.model.classDiagram.items.Base.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function Interface#updateRectangles
         *  @summary Render dell'interfaccia.
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
            var colour = '';
            switch (this.getValues()._importance) {
                case "alta":
                    colour = '#ec2d1f';
                    break;
                case "media":
                    colour = '#f9c956';
                    break;
                case "bassa":
                    colour = 'white';
                    break;
            }
            attrs['.uml-class-name-rect'].fill = colour;
            attrs['.uml-class-methods-rect'].fill = colour;
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
                    case "package":
                        vis="~";
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
         *  @summary Aggiunge un'operazione all'interfaccia.
         */
        addOperation: function() {
            this.getValues().operations.push({
                _name: "nuovaOperazione",
                _visibility: "private",
                id: joint.util.uuid(),
                returnType: "",
                isStatic: "false",
                isAbstract: "false",
                isFinal: "false",
                parameters: []
            });
            this.updateRectangles();
            this.trigger("uml-update");
        },
        /**
         *  @function Interface#addParameter
         *  @param {Number} ind - Indice dell'operazione.
         *  @summary Aggiunge un parametro all'operazione passata in input.
         */
        addParameter: function(ind) {
            this.getValues().operations[ind].parameters.push({
                _name: "nuovoParametro",
                _type: "",
                _default: "",
                _direction: "in"
            });
            this.updateRectangles();
            this.trigger("uml-update");
        },
        /**
         *  @function Interface#deleteParameter
         *  @param {Number} met - Indice dell'operazione.
         *  @summary Rimuove uno parametro dall'operazione passata in input.
         */
        deleteParameter: function(met) {
            this.getValues().operations[met[0]].parameters.splice(met[1], 1);
            this.updateRectangles();
            this.trigger("uml-update");
        },
        /**
         *  @function Interface#deleteOperation
         *  @param {Number} met - Indice dell'operazione.
         *  @summary Rimuove un'operazione dall'interfaccia.
         */
        deleteOperation: function(ind) {
            this.getValues().operations.splice(ind, 1);
            this.updateRectangles();
            this.trigger("uml-update");
        },
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
                    case "package":
                        vis="~";
                        break;
                }
                let params=e.parameters.map(function(f) {
                    return f._name+":"+f._type;
                }).join(',');
                return {
                    'text': vis+" "+e._name+"("+params+")"+":"+e.returnType,
                };
            });
            return opDesc;
        },
        /**
         *  @function Interface#getItemDesc
         *  @returns {Object} Interfaccia.
         *  @summary Ritorna le informazioni dell'interfaccia.
         */
        getItemDesc: function() {
            return {
                'text': this.getValues()._name,
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
    Swedesigner.model.classDiagram.items.ClComment = joint.shapes.basic.TextBlock.extend({
        /**
         *  @var {string} ClComment#toolMarkup - Markup HTML per la rappresentazione grafica.
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
         *  @var {Object} ClComment#defaults - Attributi di default per l'oggetto ClComment.
         */
        defaults: _.defaultsDeep({
            type: "classDiagram.items.ClComment",
            position: {x: 200, y: 200},
            size: {width: 100, height: 100},
            values: {
                comment: ""
            }
        }, joint.shapes.basic.TextBlock.prototype.defaults),
        /**
         *  @function ClComment#initialize
         *  @summary Inizializzazione di ClComment.
         */
        initialize: function() {
            joint.shapes.basic.TextBlock.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function ClComment#getValues
         *  @returns {Object} Valori dell'item ClComment (values.comment per accedere al testo del commento).
         *  @summary Ritorna i valori dell'item ClComment.
         */
        getValues: function() {
            return this.get("values");
        },
        /**
         *  @function ClComment#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
         */
        setToValue: function(value, path) {
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
         *  @summary Aggiorna il contenuto dell'item ClComment.
         */
        updateContent: function() {
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
    Swedesigner.model.classDiagram.items.ClCommentView = joint.shapes.basic.TextBlockView.extend({
        /**
         *  @function ClCommentView#initialize
         *  @summary Inizializzazione di ClCommentView.
         */
        initialize: function() {
            joint.shapes.basic.TextBlockView.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function ClCommentView#render
         *  @return {Object} L'oggetto ClCommentView.
         *  @summary Render di ClCommentView.
         */
        render: function() {
            joint.shapes.basic.TextBlockView.prototype.render.apply(this, arguments);
            this.renderTools();
            this.update();
            return this;
        },
        /**
         *  @function ClCommentView#renderTools
         *  @return {Object} L'oggetto ClCommentView.
         *  @summary Assistenza al metodo "render" per la renderizzazione dell'item.
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
        }
    });
    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class classDiagramLink
     *  @classdesc Collegamento tra due componenti di un diagramma delle classi UML.
     *  @extends {joint.dia.Link}
     */
    Swedesigner.model.classDiagram.items.classDiagramLink = joint.dia.Link.extend({
        /**
         *  @var {Object} classDiagramLink#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.items.classDiagramLink',
            source: {x: 30, y: 30},
            target: {x: 150, y: 120}
        }, joint.dia.Link.prototype.defaults),
        /**
         *  @function classDiagramLink#initialize
         *  @summary Inizializzazione di ClassDiagramLink.
         */
        initialize: function() {
            joint.dia.Link.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function classDiagramLink#getValues
         *  @return {Object} I valori del collegamento.
         *  @summary Ritorna i valori del collegamento.
         */
        getValues: function() {
            return this.get("values");
        },
        /**
         *  @function classDiagramLink#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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
     *  @class ClCommentLink
     *  @classdesc Link tra un commento e un componente UML del diagramma delle classi.
     *  @extends {Swedesigner.model.classDiagram.items.classDiagramLink}
     */
    Swedesigner.model.classDiagram.items.ClCommentLink = Swedesigner.model.classDiagram.items.classDiagramLink.extend({
        /**
         *  @var {Object} ClCommentLink#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.items.ClCommentLink',
            attrs: {
            		'.connection': { stroke: 'black', 'stroke-width': 2, 'stroke-dasharray': '5 5' }
			}
        }, Swedesigner.model.classDiagram.items.classDiagramLink.prototype.defaults)
    });
    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class Generalization
     *  @classdesc Generalizzazione tra due componenti UML.
     *  @extends {Swedesigner.model.classDiagram.items.classDiagramLink}
     */
    Swedesigner.model.classDiagram.items.Generalization = Swedesigner.model.classDiagram.items.classDiagramLink.extend({
        /**
         *  @var {Object} Generalization#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.items.Generalization',
            attrs: {'.marker-target': {d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white'}}
        }, Swedesigner.model.classDiagram.items.classDiagramLink.prototype.defaults)
    });
    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class Implementation
     *  @classdesc Implementazione tra due componenti UML.
     *  @extends {Swedesigner.model.classDiagram.items.classDiagramink}
     */
    Swedesigner.model.classDiagram.items.Implementation = Swedesigner.model.classDiagram.items.classDiagramLink.extend({
        /**
         *  @var {Object} Implementation#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.items.Implementation',
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
    Swedesigner.model.classDiagram.items.Aggregation = Swedesigner.model.classDiagram.items.classDiagramLink.extend({
        /**
         *  @var {Object} Aggregation#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.items.Aggregation',
            attrs: {'.marker-target': {d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'white'}}
        }, Swedesigner.model.classDiagram.items.classDiagramLink.prototype.defaults)
    });
    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class Composition
     *  @classdesc Composizione tra due componenti UML.
     *  @extends {Swedesigner.model.classDiagram.items.classDiagramLink}
     */
    Swedesigner.model.classDiagram.items.Composition = Swedesigner.model.classDiagram.items.classDiagramLink.extend({
        /**
         *  @var {Object} Composition#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.items.Composition',
            attrs: {'.marker-target': {d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'black'}}
        }, Swedesigner.model.classDiagram.items.classDiagramLink.prototype.defaults)
    });
    /**
     *  @module Swedesigner.model.classDiagram.items
     *  @class Association
     *  @classdesc Associazione tra due componenti UML.
     *  @extends {Swedesigner.model.classDiagram.items.classDiagramLink}
     */
    Swedesigner.model.classDiagram.items.Association = Swedesigner.model.classDiagram.items.classDiagramLink.extend({
        /**
         *  @var {Object} Association#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'classDiagram.items.Association',
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
         *  @summary Inizializzazione della Association.
         */
        initialize: function() {
            this.updatelabel();
            Swedesigner.model.classDiagram.items.classDiagramLink.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function Association#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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

//--------------------------------------------------------------------- BUBBLE DIAGRAM ----------------------------------------------------------------
    Swedesigner.model.bubbleDiagram.items = {};
    /**
     *  @module Swedesigner.model.bubbleDiagram.items
     *  @class bubbleDiagram::Base
     *  @classdesc Elemento base generico per il diagramma delle bubble.
     *  @extends {joint.shapes.basic.Generic}
     */
    Swedesigner.model.bubbleDiagram.items.Base = joint.shapes.basic.Generic.extend({
        /**
         *  @var {string} bubbleDiagram::Base#toolMarkup - Markup HTML per la rappresentazione grafica.
         */
        toolMarkup: [
            '<g class="element-tools">',
            '<g class="element-tool-remove"><circle fill="red" r="11"/>',
            '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>',
            '<title>Remove this element</title>',
            '</g>',
            '</g>'].join(''),
        /**
         *  @var {Object} bubbleDiagram::Base#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'uml.bubbleDiagram.Base'
        }, joint.shapes.basic.Generic.prototype.defaults),
        /**
         *  @function bubbleDiagram::Base#initialize
         *  @summary Inizializzazione di Base: imposta evento al verificarsi del cambio dei valori e chiama il metodo per la renderizzazione dell'item.
         */
        initialize: function() {
            this.on('change:values', function () {
                this.updateRectangles();
                this.trigger('uml-update');
            }, this);
            this.updateRectangles();
            joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function bubbleDiagram::Base#updateRectangles
         *  @summary Render dell'item.
         *  @abstract
         */
        updateRectangles: function() {},
        /**
         *  @function bubbleDiagram::Base#getValues
         *  @return {Object} I valori dell'item ("values").
         *  @summary Ritorna i valori dell'item.
         */
        getValues: function() {
            return this.get("values");
        },
    });
	/**
     *  @module Swedesigner.model.bubbleDiagram.items
     *  @class bubbleDiagram::BaseView
     *  @classdesc Elemento view base generico per il diagramma delle bubble.
     *  @extends {joint.dia.ElementView}
     */
    Swedesigner.model.bubbleDiagram.items.BaseView = joint.dia.ElementView.extend({
        /**
         *  @function bubbleDiagram::BaseView#initialize
         *  @summary Inizializzazione di BaseView: chiama il metodo "initialize" della classe bubbleDiagram::Base e imposta un evento alla reazione del
         *  model chiamando sequenzialmente i metodi "update" e "resize".
         */
        initialize: function() {
            joint.dia.ElementView.prototype.initialize.apply(this, arguments);
            this.listenTo(this.model, 'uml-update', function () {
                this.update();
                this.resize();
            });
        },
        /**
         *  @function bubbleDiagram::BaseView#render
         *  @return {Object} L'oggetto BaseView.
         *  @summary Renderizzazione dell'item.
         */
        render: function() {
            joint.dia.ElementView.prototype.render.apply(this, arguments);
            this.renderTools();
            this.update();
            return this;
        },
        /**
         *  @function bubbleDiagram::BaseView#renderTools
         *  @return {Object} L'oggetto BaseView.
         *  @summary Assistenza al metodo "render" per la renderizzazione dell'item.
         */
        renderTools: function() {
            var toolMarkup = this.model.toolMarkup || this.model.get('toolMarkup');
            if (toolMarkup) {
                var nodes = joint.V(toolMarkup);
                joint.V(this.el).append(nodes);
            }
            return this;
        }
    });
    /**
     *  @module Swedesigner.model.bubbleDiagram.items
     *  @class customBubble
     *  @classdesc Elemento custom bubble per il diagramma delle bubble.
     *  @extends {Swedesigner.model.bubbleDiagram.items.Base}
     */
    Swedesigner.model.bubbleDiagram.items.customBubble = Swedesigner.model.bubbleDiagram.items.Base.extend({
        /**
         *  @var {string} customBubble#markup - Markup HTML per la rappresentazione grafica.
         */
        markup: [
            '<g class="rotatable">',
            '<g class="scalable">',
            '<rect class="bubble" />',
            '</g>',
            '<text class="bubble-type-text" /><text class="bubble-name-text" />',
            '</g>',
        ].join(''),
        /**
         *  @var {Object} customBubble#defaults - Attributi di default per l'oggetto customBubble (tipo, posizione, dimensione,
         *  attributi CSS, stato e contenuto dell'oggetto).
         */
        defaults: _.defaultsDeep({
            type: 'bubbleDiagram.items.customBubble',
            position: {x: 200, y: 200},
		    size: { width: 200, height: 70 },
		    attrs: {
		    	rect: {width: 200},
		        '.bubble': {
		            fill: '#ff5733',
		            stroke: '#000000',
                    rx: 10,
                    ry: 4
		        },
		        '.bubble-type-text': {
		        	'ref': '.bubble',
                    'ref-y': .2,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 18,
                    'font-family': 'Roboto'
		        },
		        '.bubble-name-text': {
		            'ref': '.bubble',
                    'ref-y': .5,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 11,
                    'font-family': 'Monospace'
		        }
		    },
            values: {
            	_type: 'CUSTOM',
            	bubbleJavaCode: '',
                bubbleJSCode: '',
            	comment : 'customBubble'
            }
        }, Swedesigner.model.bubbleDiagram.items.Base.prototype.defaults),
        /**
         *  @function customBubble#initialize
         *  @summary Inizializzazione di customBubble: chiama il metodo "initialize" della classe base e crea l'istanza dell'oggetto customBubble.
         */
        initialize: function() {
        	Swedesigner.model.bubbleDiagram.items.Base.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function customBubble#updateRectangles
         *  @summary Render della custom bubble.
         */
        updateRectangles: function() {
            var attrs = this.get('attrs');
            var rects = [
                { type: 'name', text: this.getValues().comment },
                { type: 'type', text: this.getValues()._type }
            ];
            //var offsetY = 0;
            _.each(rects, function(rect) {
                var lines = _.isArray(rect.text) ? rect.text : [rect.text];
                var rectHeight = lines.length * 20 + 20;
                attrs['.bubble-' + rect.type + '-text'].text = lines.join('\n');
            	attrs['.bubble'].height = rectHeight;
            	//attrs['.bubble'].transform = 'translate(0,' + offsetY + ')';
                //offsetY += rectHeight;
            });
        },
        /**
         *  @function customBubble#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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
     *  @module Swedesigner.model.bubbleDiagram.items
     *  @class bubbleIf
     *  @classdesc Rappresenta un'istruzione condizionale.
     *  @extends {Swedesigner.model.bubbleDiagram.items.Base}
     */
    Swedesigner.model.bubbleDiagram.items.bubbleIf = Swedesigner.model.bubbleDiagram.items.Base.extend({
        /**
         *  @var {string} bubbleIf#markup - Markup HTML per la rappresentazione grafica.
         */
        markup: [
            '<g class="rotatable">',
            '<g class="scalable">',
            '<rect class="bubble" />',
            '</g>',
            '<text class="bubble-type-text" /><text class="bubble-name-text" />',
            '</g>',
        ].join(''),
        /**
         *  @var {Object} bubbleIf#defaults - Attributi di default per l'oggetto bubbleIf (tipo, posizione, dimensione,
         *  attributi CSS, stato e contenuto dell'oggetto).
         */
        defaults: _.defaultsDeep({
            type: 'bubbleDiagram.items.bubbleIf',
		    position: {x: 200, y: 200},
		    size: { width: 200, height: 70 },
		    attrs: {
		    	rect: {width: 200},
		        '.bubble': {
		            fill: '#33ff57',
		            stroke: '#000000',
                    rx: 10,
                    ry: 4
		        },
		        '.bubble-type-text': {
		        	'ref': '.bubble',
                    'ref-y': .2,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 18,
                    'font-family': 'Roboto'
		        },
		        '.bubble-name-text': {
		            'ref': '.bubble',
                    'ref-y': .5,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 11,
                    'font-family': 'Monospace'
		        }
		    },
            values: {
            	_type: 'IF',
            	condition: '',
            	comment : 'bubbleIf'
            }
        }, Swedesigner.model.bubbleDiagram.items.Base.prototype.defaults),
        /**
         *  @function bubbleIf#initialize
         *  @summary Inizializzazione di bubbleIf: chiama il metodo "initialize" della classe base e crea l'istanza dell'oggetto bubbleIf.
         */
        initialize: function() {
        	Swedesigner.model.bubbleDiagram.items.Base.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function bubbleIf#updateRectangles
         *  @summary Render della bubbleIf.
         */
        updateRectangles: function() {
            var attrs = this.get('attrs');
            var rects = [
                { type: 'name', text: this.getValues().comment },
                { type: 'type', text: this.getValues()._type }
            ];
            //var offsetY = 0;
            _.each(rects, function(rect) {
                var lines = _.isArray(rect.text) ? rect.text : [rect.text];
                var rectHeight = lines.length * 20 + 20;
                attrs['.bubble-' + rect.type + '-text'].text = lines.join('\n');
                attrs['.bubble'].height = rectHeight;
                //attrs['.bubble'].transform = 'translate(0,' + offsetY + ')';
                //offsetY += rectHeight;
            });
        },
        /**
         *  @function bubbleIf#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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
     *  @module Swedesigner.model.bubbleDiagram.items
     *  @class bubbleElse
     *  @classdesc Rappresenta il ramo 'else' di un'istruzione condizionale.
     *  @extends {Swedesigner.model.bubbleDiagram.items.Base}
     */
    Swedesigner.model.bubbleDiagram.items.bubbleElse = Swedesigner.model.bubbleDiagram.items.Base.extend({
        /**
         *  @var {string} bubbleElse#markup - Markup HTML per la rappresentazione grafica.
         */
        markup: [
            '<g class="rotatable">',
            '<g class="scalable">',
            '<rect class="bubble" />',
            '</g>',
            '<text class="bubble-type-text" /><text class="bubble-name-text" />',
            '</g>',
        ].join(''),
        /**
         *  @var {Object} bubbleElse#defaults - Attributi di default per l'oggetto bubbleElse (tipo, posizione, dimensione,
         *  attributi CSS, stato e contenuto dell'oggetto).
         */
        defaults: _.defaultsDeep({
            type: 'bubbleDiagram.items.bubbleElse',
		    position: {x: 200, y: 200},
		    size: { width: 200, height: 70 },
		    attrs: {
		    	rect: {width: 200},
		        '.bubble': {
		            fill: '#33ff57',
		            stroke: '#000000',
                    rx: 10,
                    ry: 4
		        },
		        '.bubble-type-text': {
		        	'ref': '.bubble',
                    'ref-y': .2,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 18,
                    'font-family': 'Roboto'
		        },
		        '.bubble-name-text': {
		            'ref': '.bubble',
                    'ref-y': .5,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 11,
                    'font-family': 'Monospace'
		        }
		    },
            values: {
            	_type: 'ELSE',
            	comment : 'bubbleElse'
            }
        }, Swedesigner.model.bubbleDiagram.items.Base.prototype.defaults),
        /**
         *  @function bubbleElse#initialize
         *  @summary Inizializzazione di bubbleElse: chiama il metodo "initialize" della classe base e crea l'istanza dell'oggetto bubbleElse.
         */
        initialize: function() {
        	Swedesigner.model.bubbleDiagram.items.Base.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function bubbleElse#updateRectangles
         *  @summary Render della bubbleElse.
         */
        updateRectangles: function() {
            var attrs = this.get('attrs');
            var rects = [
                { type: 'name', text: this.getValues().comment },
                { type: 'type', text: this.getValues()._type }
            ];
            //var offsetY = 0;
            _.each(rects, function(rect) {
                var lines = _.isArray(rect.text) ? rect.text : [rect.text];
                var rectHeight = lines.length * 20 + 20;
                attrs['.bubble-' + rect.type + '-text'].text = lines.join('\n');
                attrs['.bubble'].height = rectHeight;
                //attrs['.bubble'].transform = 'translate(0,' + offsetY + ')';
                //offsetY += rectHeight;
            });
        },
        /**
         *  @function bubbleElse#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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
     *  @module Swedesigner.model.bubbleDiagram.items
     *  @class bubbleFor
     *  @classdesc Rappresenta un'iterazione lungo una sequenza di istruzioni.
     *  @extends {Swedesigner.model.bubbleDiagram.items.Base}
     */
    Swedesigner.model.bubbleDiagram.items.bubbleFor = Swedesigner.model.bubbleDiagram.items.Base.extend({
        /**
         *  @var {string} bubbleFor#markup - Markup HTML per la rappresentazione grafica.
         */
        markup: [
            '<g class="rotatable">',
            '<g class="scalable">',
            '<rect class="bubble" />',
            '</g>',
            '<text class="bubble-type-text" /><text class="bubble-name-text" />',
            '</g>',
        ].join(''),
        /**
         *  @var {Object} bubbleFor#defaults - Attributi di default per l'oggetto bubbleFor (tipo, posizione, dimensione,
         *  attributi CSS, stato e contenuto dell'oggetto).
         */
        defaults: _.defaultsDeep({
            type: 'bubbleDiagram.items.bubbleFor',
		    position: {x: 200, y: 200},
		    size: { width: 200, height: 70 },
		    attrs: {
		    	rect: {width: 200},
		        '.bubble': {
		            fill: '#ffbd33',
		            stroke: '#000000',
                    rx: 10,
                    ry: 4
		        },
		        '.bubble-type-text': {
		        	'ref': '.bubble',
                    'ref-y': .2,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 18,
                    'font-family': 'Roboto'
		        },
		        '.bubble-name-text': {
		            'ref': '.bubble',
                    'ref-y': .5,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 11,
                    'font-family': 'Monospace'
		        }
		    },
            values: {
            	_type: 'FOR',
            	initialization: '',
            	termination: '',
            	increment: '',
            	comment : 'bubbleFor'
            }
        }, Swedesigner.model.bubbleDiagram.items.Base.prototype.defaults),
        /**
         *  @function bubbleFor#initialize
         *  @summary Inizializzazione di bubbleFor: chiama il metodo "initialize" della classe base e crea l'istanza dell'oggetto bubbleFor.
         */
        initialize: function() {
        	Swedesigner.model.bubbleDiagram.items.Base.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function bubbleFor#updateRectangles
         *  @summary Render della bubbleFor.
         */
        updateRectangles: function() {
            var attrs = this.get('attrs');
            var rects = [
                { type: 'name', text: this.getValues().comment },
                { type: 'type', text: this.getValues()._type }
            ];
            //var offsetY = 0;
            _.each(rects, function(rect) {
                var lines = _.isArray(rect.text) ? rect.text : [rect.text];
                var rectHeight = lines.length * 20 + 20;
                attrs['.bubble-' + rect.type + '-text'].text = lines.join('\n');
                attrs['.bubble'].height = rectHeight;
                //attrs['.bubble'].transform = 'translate(0,' + offsetY + ')';
                //offsetY += rectHeight;
            });
        },
        /**
         *  @function bubbleFor#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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
     *  @module Swedesigner.model.bubbleDiagram.items
     *  @class bubbleReturn
     *  @classdesc Rappresenta un'istruzione per uscire da un metodo e ritornare degli argomenti al chiamante.
     *  @extends {Swedesigner.model.bubbleDiagram.items.Base}
     */
    Swedesigner.model.bubbleDiagram.items.bubbleReturn = Swedesigner.model.bubbleDiagram.items.Base.extend({
        /**
         *  @var {string} bubbleReturn#markup - Markup HTML per la rappresentazione grafica.
         */
        markup: [
            '<g class="rotatable">',
            '<g class="scalable">',
            '<rect class="bubble" />',
            '</g>',
            '<text class="bubble-type-text" /><text class="bubble-name-text" />',
            '</g>',
        ].join(''),
        /**
         *  @var {Object} bubbleReturn#defaults - Attributi di default per l'oggetto bubbleReturn (tipo, posizione, dimensione,
         *  attributi CSS, stato e contenuto dell'oggetto).
         */
        defaults: _.defaultsDeep({
            type: 'bubbleDiagram.items.bubbleReturn',
		    position: {x: 200, y: 200},
		    size: { width: 200, height: 70 },
		    attrs: {
		    	rect: {width: 200},
		        '.bubble': {
		            fill: '#33ffbd',
		            stroke: '#000000',
                    rx: 10,
                    ry: 4
		        },
		        '.bubble-type-text': {
		        	'ref': '.bubble',
                    'ref-y': .2,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 18,
                    'font-family': 'Roboto'
		        },
		        '.bubble-name-text': {
		            'ref': '.bubble',
                    'ref-y': .5,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 11,
                    'font-family': 'Monospace'
		        }
		    },
            values: {
            	_type: 'RETURN',
            	value: '',
            	comment : 'bubbleReturn'
            }
        }, Swedesigner.model.bubbleDiagram.items.Base.prototype.defaults),
        /**
         *  @function bubbleReturn#initialize
         *  @summary Inizializzazione di bubbleReturn: chiama il metodo "initialize" della classe base e crea l'istanza dell'oggetto bubbleReturn.
         */
        initialize: function() {
        	Swedesigner.model.bubbleDiagram.items.Base.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function bubbleReturn#updateRectangles
         *  @summary Render della bubbleReturn.
         */
        updateRectangles: function() {
            var attrs = this.get('attrs');
            var rects = [
                { type: 'name', text: this.getValues().comment },
                { type: 'type', text: this.getValues()._type }
            ];
            //var offsetY = 0;
            _.each(rects, function(rect) {
                var lines = _.isArray(rect.text) ? rect.text : [rect.text];
                var rectHeight = lines.length * 20 + 20;
                attrs['.bubble-' + rect.type + '-text'].text = lines.join('\n');
                attrs['.bubble'].height = rectHeight;
                //attrs['.bubble'].transform = 'translate(0,' + offsetY + ')';
                //offsetY += rectHeight;
            });
        },
        /**
         *  @function bubbleReturn#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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
     *  @module Swedesigner.model.bubbleDiagram.items
     *  @class bubbleStart
     *  @classdesc Rappresenta la prima istruzione di un metodo.
     *  @extends {Swedesigner.model.bubbleDiagram.items.Base}
     */
    Swedesigner.model.bubbleDiagram.items.bubbleStart = Swedesigner.model.bubbleDiagram.items.Base.extend({
        /**
         *  @var {string} bubbleStart#markup - Markup HTML per la rappresentazione grafica.
         */
        markup: [
            '<g class="rotatable">',
            '<g class="scalable">',
            '<rect class="bubble" />',
            '</g>',
            '<text class="bubble-type-text" /><text class="bubble-name-text" />',
            '</g>',
        ].join(''),
        /**
         *  @var {Object} bubbleStart#defaults - Attributi di default per l'oggetto bubbleStart (tipo, posizione, dimensione,
         *  attributi CSS, stato e contenuto dell'oggetto).
         */
        defaults: _.defaultsDeep({
            type: 'bubbleDiagram.items.bubbleStart',
            position: {x: 200, y: 200},
		    size: { width: 50, height: 50 },
		    attrs: {
		    	rect: {width: 40},
                '.bubble': {
                    fill: '#ff8000',
                    stroke: '#000000',
                    rx: 20,
                    ry: 20
                },
                '.bubble-type-text': {
                    'ref': '.bubble',
                    'ref-y': .5,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 12,
                    'font-family': 'Roboto',
                    'font-weight': 'bold'
                },
                '.bubble-name-text': {
                    'ref': '.bubble',
                    'ref-y': .5,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 11,
                    'font-family': 'Monospace'
                }
            },
            values: {
                _type: 'START',
                value: ''
            }
        }, Swedesigner.model.bubbleDiagram.items.Base.prototype.defaults),
        /**
         *  @function bubbleStart#initialize
         *  @summary Inizializzazione di bubbleStart: chiama il metodo "initialize" della classe base e crea l'istanza dell'oggetto bubbleStart.
         */
        initialize: function() {
            Swedesigner.model.bubbleDiagram.items.Base.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function bubbleStart#updateRectangles
         *  @summary Render della bubbleStart.
         */
        updateRectangles: function() {
            var attrs = this.get('attrs');
            var rects = [
                { type: 'name', text: this.getValues().comment },
                { type: 'type', text: this.getValues()._type }
            ];
            //var offsetY = 0;
            _.each(rects, function(rect) {
                var lines = _.isArray(rect.text) ? rect.text : [rect.text];
                var rectHeight = lines.length * 20 + 20;
                attrs['.bubble-' + rect.type + '-text'].text = lines.join('\n');
                attrs['.bubble'].height = rectHeight;
                //attrs['.bubble'].transform = 'translate(0,' + offsetY + ')';
                //offsetY += rectHeight;
            });
        },
    });
    /**
     *  @module Swedesigner.model.bubbleDiagram.items
     *  @class bubbleWhile
     *  @classdesc Rappresenta un loop con controllo di condizione lungo una sequenza di istruzioni.
     *  @extends {Swedesigner.model.bubbleDiagram.items.Base}
     */
    Swedesigner.model.bubbleDiagram.items.bubbleWhile = Swedesigner.model.bubbleDiagram.items.Base.extend({
        /**
         *  @var {string} bubbleWhile#markup - Markup HTML per la rappresentazione grafica.
         */
        markup: [
            '<g class="rotatable">',
            '<g class="scalable">',
            '<rect class="bubble" />',
            '</g>',
            '<text class="bubble-type-text" /><text class="bubble-name-text" />',
            '</g>',
        ].join(''),
        /**
         *  @var {Object} bubbleWhile#defaults - Attributi di default per l'oggetto bubbleWhile (tipo, posizione, dimensione,
         *  attributi CSS, stato e contenuto dell'oggetto).
         */
        defaults: _.defaultsDeep({
            type: 'bubbleDiagram.items.bubbleWhile',
		    position: {x: 200, y: 200},
		    size: { width: 200, height: 70 },
		    attrs: {
		    	rect: {width: 200},
		        '.bubble': {
		            fill: '#ffbd33',
		            stroke: '#000000',
                    rx: 10,
                    ry: 4
		        },
		        '.bubble-type-text': {
		        	'ref': '.bubble',
                    'ref-y': .2,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 18,
                    'font-family': 'Roboto'
		        },
		        '.bubble-name-text': {
		            'ref': '.bubble',
                    'ref-y': .5,
                    'ref-x': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'fill': '#222222',
                    'font-size': 11,
                    'font-family': 'Monospace'
		        }
		    },
            values: {
            	_type: 'WHILE',
            	condition: '',
            	comment : 'bubbleWhile'
            }
        }, Swedesigner.model.bubbleDiagram.items.Base.prototype.defaults),
        /**
         *  @function bubbleWhile#initialize
         *  @summary Inizializzazione di bubbleWhile: chiama il metodo "initialize" della classe base e crea l'istanza dell'oggetto bubbleWhile.
         */
        initialize: function() {
        	Swedesigner.model.bubbleDiagram.items.Base.prototype.initialize.apply(this, arguments);
        	console.log("I'm the bubbleWhile Initialize");
        },
        /**
         *  @function bubbleWhile#updateRectangles
         *  @summary Render della bubbleWhile.
         */
        updateRectangles: function() {
            var attrs = this.get('attrs');
            var rects = [
                { type: 'name', text: this.getValues().comment },
                { type: 'type', text: this.getValues()._type }
            ];
            //var offsetY = 0;
            _.each(rects, function(rect) {
                var lines = _.isArray(rect.text) ? rect.text : [rect.text];
                var rectHeight = lines.length * 20 + 20;
                attrs['.bubble-' + rect.type + '-text'].text = lines.join('\n');
                attrs['.bubble'].height = rectHeight;
                //attrs['.bubble'].transform = 'translate(0,' + offsetY + ')';
                //offsetY += rectHeight;
            });
        },
        /**
         *  @function bubbleWhile#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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
     *  @module Swedesigner.model.bubbleDiagram.items
     *  @class bubbleDiagramLink
     *  @classdesc Collegamento tra due componenti di un diagramma delle bubble.
     *  @extends {joint.dia.Link}
     */
    Swedesigner.model.bubbleDiagram.items.bubbleDiagramLink = joint.dia.Link.extend({
        /**
         *  @var {Object} bubbleDiagramLink#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'bubbleDiagram.items.bubbleDiagramLink',
            source: {x: 30, y: 30},
            target: {x: 150, y: 120}
        }, joint.dia.Link.prototype.defaults),
        /**
         *  @function bubbleDiagramLink#initialize
         *  @summary Inizializzazione di bubbleDiagramLink.
         */
        initialize: function() {
            joint.dia.Link.prototype.initialize.apply(this, arguments);
        },
        /**
         *  @function bubbleDiagramLink#getValues
         *  @return {Object} I valori del collegamento.
         *  @summary Ritorna i valori del collegamento.
         */
        getValues: function() {
            return this.get("values");
        },
        /**
         *  @function bubbleDiagramLink#setToValue
         *  @param {Object} value - Valore da assegnare.
         *  @param {string} path - Percorso al membro.
         *  @summary Imposta "values.path" a "value".
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
     *  @module Swedesigner.model.bubbleDiagram.items
     *  @class bubbleLink
     *  @classdesc Link tra due elementi del diagramma delle bubble.
     *  @extends {Swedesigner.model.bubbleDiagram.items.bubbleDiagramLink}
     */
    Swedesigner.model.bubbleDiagram.items.bubbleLink = Swedesigner.model.bubbleDiagram.items.bubbleDiagramLink.extend({
        /**
         *  @var {Object} bubbleLink#defaults - Attributi di default per l'oggetto.
         */
        defaults: _.defaultsDeep({
            type: 'bubbleDiagram.items.bubbleLink',
            attrs: {
            		'.connection': { stroke: 'black', 'stroke-width': 2/*, 'stroke-dasharray': '5 5'*/ },
            		'.marker-target': {d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white'}
			}
        }, Swedesigner.model.bubbleDiagram.items.bubbleDiagramLink.prototype.defaults)
    });
	return Swedesigner;
});
