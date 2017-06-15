define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	//'js/views/', riferimento alla view principale del progetto
	/** ecc. */
], function ($, _, Backbone, joint) {
	var EditPanelView = Backbone.View.extend({
		tagname: 'div',
		el: {},//'editpanel',
		currentTemplate: {},
		events: {},
		initialize: function(options) {
			//options.parent;
			//options.model;
		},
		render: function() {
			//console.log("i'm detailsview and i saw your change");
            if (ProjectView.paper.selectedCell) {
                //console.log(templates);
                //this.currentTemplate = _.template($('#' + ProjectView.paper.selectedCell.get("type").replace(/\./g, "\\.")).html());
                this.currentTemplate = _.template($(templates).filter('#' + ProjectView.paper.selectedCell.get("type").replace(/\./g, "\\.")).html());
                var c = ProjectView.paper.selectedCell;
                var output = "";
                output = this.currentTemplate(c.getValues());
                this.$el.html(output);
                componentHandler.upgradeDom(); //refresh material design
                this.delegateEvents(_.extend(this.events, {
                    'keypress .edit': 'confirmEdit',
                    'change .edit': 'confirmEdit',
                    'click .add': 'execCommand',
                    'click .switch': 'switch',
                    'click .togglable': 'toggle'
                }));
                if (ProjectView.getCurrentDiagramType() == "activity") {
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
                }
            } else {
                this.$el.html("");
            }
			return this;
		}
	});
	return EditPanelView;
});