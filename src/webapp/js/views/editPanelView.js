define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/views/projectView',
	'text!js/views/templates.html'
	/** ecc. */
], function ($, _, Backbone, joint, ProjectView, templates) {
	var EditPanelView = Backbone.View.extend({
		tagname: 'div',
		el: $('#editpanel'),//{},//'editpanel',
		currentTemplate: {},
		events: {},
        paper: {},
		initialize: function(options) {
            //console.log('Initializing editPanelView...');
			//this.$el = $('#editpanel');
            paper=options.paper;
            this.listenTo(paper, "changed-cell", this.render);
			//options.parent;
			//options.model;
		},
		render: function() {
            if (paper.selectedCell) {
                console.log("(editPanelView) Hey! I saw your change!");
                //console.log(templates);
                this.currentTemplate = _.template($(templates).filter('#' + paper.selectedCell.get("type").replace(/\./g, "\\.")).html());
                var c = paper.selectedCell;
                var output = "";
                output=this.currentTemplate(c.getValues());
                this.$el.html(output);
                this.delegateEvents(_.extend(this.events, {	// Funzioni definite qui, che chiamano metodi di ProjectView
                    'keypress .edit': 'confirmEdit',
                    'change .edit': 'confirmEdit',
                    'click .exec': 'execCommand',
                    'click .switch': 'switch'
                }));
                /*if (ProjectView.getCurrentDiagramType() == "activity") {
                    var split = function (val) {
                        return val.split(/(,\s* | \s*)/);
                    };
                    var extractLast = function (term) {
                        return split(term).pop();
                    };

                    $('input.edit').autocomplete({
                        minLength: 0,
                        source: function (request, response) {
                            console.log(ProjectView.visibleElements);
                            response($.ui.autocomplete.filter(
                                ProjectView.visibleElements, extractLast(request.term)));
                        },

                        focus: function () {
                            return false;
                        },

                        select: function (event, ui) {
                            var terms = split(this.value);
                            terms.pop();
                            terms.push(ui.item.value);
                            terms.push("");
                            this.value = terms.join("");
                            return false;
                        }
                    });

                    _.each($('input.edit'),function (el) {
                        $(el).data('ui-autocomplete')._renderItem = function (ul, item) {
                            return $('<li class="ui-menu-item-with-icon"></li>')
                                .data("item.autocomplete", item)
                                .append('<a><span class="' + item.icon + '-item-icon"></span>' + item.label + '</a>')
                                .appendTo(ul);
                        }
                    });
                }*/
            } else {
                this.$el.html("");
            }
			return this;
		}
	});
	return EditPanelView;
});
