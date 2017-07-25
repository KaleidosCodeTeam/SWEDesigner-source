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
                //console.log(output);
                this.$el.html(output);
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
            console.log(projectView.paper.selectedCell);
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
                    projectView.paper.selectedCell.setToValue(e.target.checked ? "true" : "false", e.target.name);
                    //this.render();
                } else {
                    //console.log(projectView.paper.selectedCell);
                    projectView.paper.selectedCell.setToValue(e.target.value, e.target.name);
                    //console.log(projectView.paper.selectedCell);
                    //this.render();
                }
            }
        }
	});
	return new EditPanelView;
});
