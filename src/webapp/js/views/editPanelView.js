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
        parentView: {},
		initialize: function(options) {
            //console.log('Initializing editPanelView...');
			//this.$el = $('#editpanel');
            this.parentView=options.parent;
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
                var v=c.getValues();
                console.log(paper.selectedCell.get('cid'));
                var p=paper.model.getCell(paper.selectedCell.get('cid'));
                v['id']=p;
                output=this.currentTemplate(v);
                this.$el.html(output);
                //console.log(output);
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
		},
        toggle: function (e) {
            e.preventDefault();
            var elem = $(e.target).next();
            elem.toggle('slow');
        },

        switch: function (e) {
            console.log(e.target.value);
            this.parentView.views.projectView.switch(e.target.value);
        },

        /**
         * Re-paints the `#details` div after a 'Switchgraph' event
         * has been fired by the `ProjectView` object.
         * @name DetailsView#visib
         * @function
         */
        visib: function () {

            if (ProjectView.paper.selectedCell)
                this.$el.html(ProjectView.paper.selectedCell.getMethods());
        },

        /**
         * Execute a method of the model passing its
         * name as a string.
         * @param e the method name
         */
        execCommand: function (e) {
            var tmp = e.target.name.split(".");
            if (tmp[0] == "deleteMethod") {
                paper.deleteMethodAt(tmp[1]);
            }
            paper.selectedCell.executeMethod(tmp[0], Array.prototype.slice.call(tmp, 1));
            this.render();
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
            if ((e.type == "keypress" && e.which == 13) || e.type == "change") {
                if (e.target.type == "checkbox") {
                    paper.selectedCell.setToValue(e.target.checked ? "true" : "false", e.target.name);
                } else {
                    console.log(paper.selectedCell)
                    paper.selectedCell.setToValue(e.target.value, e.target.name);
                    console.log(paper.selectedCell)
                }
            }
        }
	});
	return EditPanelView;
});
