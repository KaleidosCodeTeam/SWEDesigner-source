define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/views/projectView',
	'text!js/views/templates'
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
                //console.log(templates);
                //console.log(paper.selectedCell.getValues());
                //this.currentTemplate = _.template($('#' + ProjectView.paper.selectedCell.get("type").replace(/\./g, "\\.")).html());
                this.currentTemplate = _.template($(templates).filter('#' + paper.selectedCell.get("type").replace(/\./g, "\.")).html());
                console.log("(editPanelView) Hey! I saw your change! From templates.html: " + _.template($(templates).filter('#' + paper.selectedCell.get("type").replace(/\./g, "\."))));
                console.log('#' + paper.selectedCell.get("type").replace(/\./g, "\."));
                //this.currentTemplate = _.template('<div id="panel-package" class="col-lg-2 panel-swedesigner">        <h4>Package</h4>        <div class="form-group">            <label for="package-name">Nome:</label>            <input type="text" class="edit form-control" value="<%= _package %>" id="package-name" />        </div>        <div class="form-group">            <label for="package-rank">Importanza:</label>            <select class="form-control edit" name="_importance" id="package-rank">                <option value="alta" <% if(_importance=="alta") { %> selected <% } %>>alta</option>                <option value="media" <%if(_importance=="media"){%> selected <%}%>>media</option>                <option value="bassa" <%if(_importance=="bassa"){%> selected <%}%>>bassa</option>            </select>        </div>        <!-- INSERITO PULSANTE PER ANDARE AL DIAGRAMMA DELLE CLASSI -->        <button class="switch" name="switch" value="<%= _package %>">Vai al diagramma delle classi</button>        <!--<button class="btn btn-danger btn-block" name="deletePackage>">Elimina package</button> NON DOVREBBE SERVIRE SE USIAMO L\'ELIMINAZIONE DALL\'ICONA GRAFICA DI JOINT -->    </div>');
                //console.log("(editPanelView) Hey! I saw your change! " + _.template(['<div id="panel-package" class="col-lg-2 panel-swedesigner">',
                  //                                                                      '<h4>Package</h4>',
                    //                                                                    '<div class="form-group">',
                      //                                                                  '<label for="package-name">Nome:</label>',
                        //                                                                '<input type="text" class="edit form-control" value="<%= _package %>" id="package-name" />',
                          //                                                              '</div>        <div class="form-group">',
                            //                                                            '<label for="package-rank">Importanza:</label>',
                              //                                                          '<select class="form-control edit" name="_importance" id="package-rank">',
                                //                                                        '<option value="alta" <% if(_importance=="alta") { %> selected <% } %>>alta</option>',
                                  //                                                      '</select>        </div>',
                                    //                                                    '</div>'].join('')));
                var c = paper.selectedCell;
                console.log(c)
                var output = "";
                var v={ _package: c.get('_package'), _importance: c.get('_importance')};
                console.log(v)
                this.currentTemplate=_.template('<div><input type="text" class="edit form-control" value="<%= _package %>"/> <%=_importance%></div>');
                output=this.currentTemplate(v);
                //this.currentTemplate=_.template("<div><%=_package%> <%=_importance%></div>");
                //output=this.currentTemplate(v);
                this.$el.html(output);







                //componentHandler.upgradeDom(); //refresh material design
                /*this.delegateEvents(_.extend(this.events, {	// Funzioni definite qui, che chiamano metodi di ProjectView
                    'keypress .edit': 'confirmEdit',
                    'change .edit': 'confirmEdit',
                    'click .exec': 'execCommand',
                    'click .switch': 'switch'
                }));*/
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
