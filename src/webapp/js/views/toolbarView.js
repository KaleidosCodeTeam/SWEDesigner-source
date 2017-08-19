/**
 *  @file Contiene la classe ToolbarView.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/items/swedesignerItems',
    'js/models/toolbarModel',
    'js/models/projectModel'
], function($, _, Backbone, joint, Swedesigner, toolbarModel, projectModel) {
	/**
     *  @classdesc Toolbar degli elementi realizzabili nel diagramma correntemente visualizzato.
     *  @module client.views
     *  @class ToolbarView
     *  @extends {Backbone.View}
     */
	var ToolbarView = Backbone.View.extend({
		/**
         *  @var {jQueryObject} ToolbarView#el - L'elemento del DOM corrispondente a ToolbarView.
         */
		el: $('.toolbar'),
		/**
         *  @var {Object} ToolbarView#events - Gli eventi verificabili nella toolbar.
         */
		events: {
			'click .toolbarbutton': 'addElement'
		},
		/**
         *  @function ToolbarView#initialize
         *  @summary Inizializzazione della ToolbarView.
         */
		initialize: function() {
			this.model = toolbarModel;
			this.listenTo(projectModel,'switchgraph',this.render);
            $('#toggle_minimize').click(function(){
                if($("#toggle_minimize").html() === '<img src="css/ico/riduci.png" height="10px" width="20px">') {
                    $('#toolbar').addClass("toolbarbutton_minimized");
                    $("#toggle_minimize").html('<img src="css/ico/espandi.png" height="10px" width="20px">');
                    $('#toggle_container').css('left',$('#toolbar').width()+6);
                } else if ($("#toggle_minimize").html() === '<img src="css/ico/espandi.png" height="10px" width="20px">') {
                    $('#toolbar').removeClass("toolbarbutton_minimized");
                    $("#toggle_minimize").html('<img src="css/ico/riduci.png" height="10px" width="20px">');
                    $('#toggle_container').css('left',$('#toolbar').width()+6);
                }
            });
			this.render();
		},
		/**
         *  @function ToolbarView#render
         *  @summary Render della toolbar in base al diagramma correntemente visualizzato.
         */
		render: function() {
			var currentDiagram = toolbarModel.getCurrentDiagram();
			//console.log(currentDiagram);
			_.each(this.$el.children(), function(diagram) {
				if($(diagram).attr('class') === currentDiagram)
					$(diagram).show();
				else
					$(diagram).hide();
			});
            $('#toggle_container').css('left',$('#toolbar').width()+6);
		},
		/**
         *  @function ToolbarView#addElement
         *  @param {Object} event - Elemento generante l'evento.
         *  @summary Aggiunge un elemento al diagramma alla selezione di uno strumento invocando il rispettivo metodo di ToolbarModel.
         */
		addElement: function(event) {
			//console.log(event.currentTarget);
			toolbarModel.addElement(event.currentTarget.id);
		}
	});
	return new ToolbarView;
});
