/**
 *  @file Contiene la classe EditPanelView.
 *  @author Pezzuto Francesco, Sovilla Matteo - KaleidosCode
 */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/views/projectView',
	'text!js/views/templates.html'
], function ($, _, Backbone, joint, projectView, templates) {
    /**
     *  @classdesc Pannello laterale renderizzato dinamicamente al cambiare dell'elemento selezionato nel diagramma corrente.
     *  Visualizza tutte le proprietà dell'oggetto selezionato rendendole disponibili ad eventuali modifiche.
     *  @module client.views
     *  @class EditPanelView
     *  @extends {Backbone.View}
     */
	var EditPanelView = Backbone.View.extend({
        /**
         *  @var {string} EditPanelView#tagname - Il tag HTML popolato dal pannello.
         */
		tagname: 'div',
        /**
         *  @var {jQueryObject} EditPanelView#el - L'elemento del DOM corrispondente a EditPanelView.
         */
		el: $('#editpanel'),
        /**
         *  @var {Object} EditPanelView#currentTemplate - Il template correntemente caricato e renderizzato.
         */
		currentTemplate: {},
        /**
         *  @var {Object} EditPanelView#events - Gli eventi verificabili nel pannello.
         */
		events: {},
        classInfo: '',
        /**
         *  @function EditPanelView#initialize
         *  @summary Inizializzazione della EditPanelView.
         */
		initialize: function() {
            //this.listenTo(projectView.paper, "changed-cell", this.render);
            this.listenTo(projectView.paper, "changed-selected-cell", this.reset);
		},
        /**
         *  @function EditPanelView#reset
         *  @summary Reset del pannello.
         */
        reset: function() {
		    this.render();
		    $("#class-operations, .class-operation-details, .class-operation-parameters, .class-operation-parameter-details, #class-attributes, .class-attribute-details ").css("display","none");
		    $("#interface-operations, .interface-operation-details, .interface-operation-parameters, .interface-operation-parameter-details").css("display","none");
        },
        /**
         *  @function EditPanelView#render
         *  @summary Render del pannello in base all'elemento del paper cliccato.
         */
		render: function() {
            if (projectView.paper.selectedCell) {
                //console.log("(EditPanelView) Hey! I saw your change!");
                this.currentTemplate = _.template($(templates).filter('#' + projectView.paper.selectedCell.get("type").replace(/\./g, "\\.")).html());
                var c = projectView.paper.selectedCell;
                var output = "";
                var v = c.getValues();
                var p = projectView.paper.selectedCell.id;
                if (typeof v !== 'undefined') {
                    v['id'] = p;
                }
                output = this.currentTemplate(v);
                //Se in bubble diagram aggiungere lista variabili;
                if (projectView.model.currentDiagramType === 'bubbleDiagram' && !projectView.paper.selectedCell.isLink()) {
                	output = output + this.classInfo;
                }
                this.$el.html(output);
                if (output === "" || (typeof projectView.paper.selectedCell.getValues() !== 'undefined' && projectView.paper.selectedCell.getValues()._type === 'START')) {
                    this.$el.css("visibility","hidden");
                } else {
                    this.$el.css("visibility","visible");
                }
                this.delegateEvents(_.extend(this.events, {
                    'keypress .edit': 'confirmEdit',
                    'change .edit': 'confirmEdit',
                    'click .exec': 'execCommand',
                    'click .switch': 'switch',
                    'click .unembed': 'unembedCell',
                    'click #save': 'save'
                }));
            } else {
                this.$el.html("");
                this.$el.css("visibility","hidden");
            }
			return this;
		},
        /**
         *  @function EditPanelView#switch
         *  @param {Object} e - Elemento generante l'evento.
         *  @summary Metodo chiamato da evento generato. Switch in profondità del tipo di diagramma.
         */
        switch: function(e) {
            //console.log(e.target.value);
            projectView.switchIn(e.target.value);
            // Creazione della sezione classInfo
            if (projectView.model.currentDiagramType == 'bubbleDiagram') {
                //console.log(projectView.model.members);
                var members = projectView.model.members;
                let app = '';
                for (var i = 0; i < members.attributes.length; i++) {
                    let vis = "";
                    switch (members.attributes[i]._visibility) {
                        case "public":
                            vis = "+";
                            break;
                        case "private":
                            vis = "-";
                            break;
                        case "protected":
                            vis = "#";
                            break;
                        case "package":
                            vis = "~";
                            break;
                    }
                    app = app + '<li>' + vis + ' ' + members.attributes[i]._name + ' : ' + members.attributes[i]._type + '</li>';
                }
                this.classInfo = '<div class="classInfo"><label>Attributi:</label><ul>'+app+'</ul>';
                app = '';
                for (var i = 0; i < members.methods.length; i++) {
                    let vis = "";
                    switch (members.methods[i]._visibility) {
                        case "public":
                            vis = "+";
                            break;
                        case "private":
                            vis = "-";
                            break;
                        case "protected":
                            vis = "#";
                            break;
                        case "package":
                            vis = "~";
                            break;
                    }
                    let params = members.methods[i].parameters.map(function(f) {
                        return f._name + ":" + f._type;
                    }).join(", ");
                    app = app + '<li>' + vis + ' ' + members.methods[i]._name + ' ( ' + params + ' ) : ' + members.methods[i].returnType + '</li>';
                }
                this.classInfo = this.classInfo + '<label>Metodi:</label><ul>'+app+'</ul></div>';
            } else {
                this.classInfo = '';
            }
        },
        /**
         *  @function EditPanelView#save
         *  @param {Object} e - Elemento generante l'evento.
         *  @summary Metodo chiamato da evento generato. Salvataggio di testo.
         */
        save: function(e) {
            //console.log(e.target.id);
            if (e.target.id === 'saveJava') {
                projectView.paper.selectedCell.setToValue($('#bubbleJavaCode').val(), $('#bubbleJavaCode').attr('name'));
            } else if (e.target.id === 'saveJavascript') {
                projectView.paper.selectedCell.setToValue($('#bubbleJSCode').val(), $('#bubbleJSCode').attr('name'));
            } else if (e.target.id === 'saveComment') {
                projectView.paper.selectedCell.setToValue($('#comment').val(), $('#comment').attr('name'));
            }
            var cellView = projectView.paper.findViewByModel(projectView.paper.selectedCell);
            if (!projectView.paper.selectedCell.isLink()) {
                cellView.unhighlight();
                cellView.highlight();
            }
            //console.log(projectView.paper.selectedCell);
        },
        /**
         *  @function EditPanelView#execCommand
         *  @param {Object} e - Elemento generante l'evento.
         *  @summary Metodo chiamato da evento generato. Esegue il metodo definito dal nome dell'elemento generante l'evento sul contenuto selezionato nel pannello.
         */
        execCommand: function (e) {
            if (typeof e.target.name != 'undefined') {
                var tmp = e.target.name.split(".");
                if (tmp[0] === "deleteOperation") {
                    projectView.deleteOperationAt(tmp[1]);
                }
                projectView.paper.selectedCell.executeMethod(tmp[0], Array.prototype.slice.call(tmp, 1));
                this.render();
                var cellView = projectView.paper.findViewByModel(projectView.paper.selectedCell);
                if (!projectView.paper.selectedCell.isLink()) {
                    cellView.unhighlight();
                    cellView.highlight();
                }
                if (tmp[0] === "addOperation" || tmp[0] === "deleteOperation") {
                    $(".class-operation-details, .class-operation-parameters, .class-operation-parameter-details, #class-attributes, .class-attribute-details").css("display", "none");
                    $(".interface-operation-details, .interface-operation-parameters, .interface-operation-parameter-details").css("display", "none");
                } else if (tmp[0] === "addParameter" || tmp[0] === "deleteParameter") {
                    $(".class-operation-details, .class-operation-parameters, .class-operation-parameter-details, #class-attributes, .class-attribute-details").css("display", "none");
                    $(".interface-operation-details, .interface-operation-parameters, .interface-operation-parameter-details").css("display", "none");
                } else if (tmp[0] === "addAttribute" || tmp[0] === "deleteAttribute") {
                    $("#class-operations, .class-operation-details, .class-operation-parameters, .class-operation-parameter-details, .class-attribute-details").css("display", "none");
                };
            }
        },
        /**
         *  @function EditPanelView#unembedCell
         *  @param {Object} e - Elemento generante l'evento.
         *  @summary Metodo chiamato da evento generato. Rimuove la bubble selezionata nel pannello dall'innesto.
         */
        unembedCell: function(e) {
            projectView.unembedCell();
        },
        /**
         *  @function EditPanelView#confirmEdit
         *  @param {Object} e - Elemento generante l'evento.
         *  @summary Metodo chiamato da evento generato. Salvataggio delle modifiche apportate ad una proprietà del contenuto selezionato nel pannello.
         */
        confirmEdit: function(e) {
            if ((e.type === "keypress" && e.which === 13) || e.type === "change") {
                if (e.target.type === "checkbox") {
                    if (projectView.paper.selectedCell !== null) {
                        projectView.paper.selectedCell.setToValue(e.target.checked ? "true" : "false", e.target.name);
                        //this.render();
                    }
                } else {
                    e.target.value = e.target.value.replace(/&(?!amp;)(?!quot;)(?!apos;)/g, '&amp;');
                    e.target.value = e.target.value.replace(/"/g, '&quot;');
                    e.target.value = e.target.value.replace(/'/g, "&apos;");
                    //console.log(e.target.value);
                    if (projectView.paper.selectedCell !== null) {
                        projectView.paper.selectedCell.setToValue(e.target.value, e.target.name);
                        //console.log(projectView.paper.selectedCell);
                        //this.render();
                        var cellView = projectView.paper.findViewByModel(projectView.paper.selectedCell);
                        if (!projectView.paper.selectedCell.isLink()) {
                            cellView.unhighlight();
                            cellView.highlight();
                        }
                    }
                }
            }
        }
	});
	return new EditPanelView;
});
