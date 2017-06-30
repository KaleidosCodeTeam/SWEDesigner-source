define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/views/projectView',
	'text!js/views/templates.html'
	/* ecc. */
], function ($, _, Backbone, joint, projectView, templates) {
	var editPanelView = Backbone.View.extend({
		tagname: 'div',
		el: {},
		currentTemplate: {},
		events: {},
		initialize: function() {
			this.$el = $('#editpanel');
            // this.listenTo(projectView.paper, "changed-cell", this.render);
            this.listenTo(projectView.paper, "changed-selected-cell", this.reset);
		},
        reset: function() {
		    this.render();
		    $("#class-operations, .class-operation-details, .class-operation-parameters, .class-operation-parameter-details, #class-attributes, .class-attribute-details ").css("display","none");
        },
		render: function() {
            if (projectView.paper.selectedCell) {
                console.log("(editPanelView) Hey! I saw your change!");
                //console.log(templates);
                this.currentTemplate = _.template($(templates).filter('#' + projectView.paper.selectedCell.get("type").replace(/\./g, "\\.")).html());
                var c = projectView.paper.selectedCell;
                var output = "";
                var v = c.getValues();
                var p = projectView.paper.selectedCell.id;
                v['id'] = p;
                output = this.currentTemplate(v);
                this.$el.html(output);
                //console.log(output);
                this.delegateEvents(_.extend(this.events, {	// Funzioni definite qui, che chiamano metodi di ProjectView
                    'keypress .edit': 'confirmEdit',
                    'change .edit': 'confirmEdit',
                    'click .exec': 'execCommand',
                    'click .switch': 'switch',
                    'click .unembed': 'unembedCell'
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
		},
        toggle: function (e) {
            e.preventDefault();
            var elem = $(e.target).next();
            elem.toggle('slow');
        },

        switch: function (e) {
            //console.log(e.target.value);
            projectView.switchIn(e.target.value);
        },

        /**
         * Re-paints the `#details` div after a 'Switchgraph' event
         * has been fired by the `ProjectView` object.
         * @name DetailsView#visib
         * @function
         */
        /*visib: function () {
            if (projectView.paper.selectedCell) {
                this.$el.html(projectView.paper.selectedCell.getMethods());
            }
        },*/

        /**
         * Execute a method of the model passing its
         * name as a string.
         * @param e the method name
         */
        execCommand: function (e) {
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
                $(".class-operation-parameter-details, #class-attributes, .class-attribute-details").css("display", "none");
                $(".interface-operation-parameter-details").css("display", "none");
            } else if (tmp[0] === "addAttribute" || tmp[0] === "deleteAttribute") {
                $("#class-operations, .class-operation-details, .class-operation-parameters, .class-operation-parameter-details, .class-attribute-details").css("display", "none");
            };
        },

        unembedCell: function(e) {
            projectView.unembedCell();
        },

        /**
         * Confirms the edits performed in a given field
         * inside the `#details` div and updates the
         * corresponding cell of the diagram.
         * @name DetailsView#confirmEdit
         * @function
         * @param {event} e the action event
         * @private
         */
        confirmEdit: function (e) {
            if ((e.type === "keypress" && e.which === 13) || e.type === "change") {
                if (e.target.type === "checkbox") {
                    projectView.paper.selectedCell.setToValue(e.target.checked ? "true" : "false", e.target.name);
                    this.render();
                } else {
                    console.log(projectView.paper.selectedCell);
                    projectView.paper.selectedCell.setToValue(e.target.value, e.target.name);
                    console.log(projectView.paper.selectedCell);
                    this.render();
                }
            }
        }
	});
	return new editPanelView;
});
