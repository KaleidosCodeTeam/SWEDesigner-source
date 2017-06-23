/**
 * Created by Socs on 23/06/2017.
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
], function ($, _, Backbone, joint) {
    var project = Backbone.Model.extend({
        packages: {
            packagesArray: [],
            dependenciesArray: []
        },
        classes: {
            classesArray: [],
            relationshipsArray: [],
        },
        operations: [],
        initialize: function() {},
        deleteBubbleDiagram: function(id) {
            this.operations.splice(this.getIndexFromId(id),1);
        },
        getIndexFromId: function(id) {
            return this.operations.findIndex((x) => x.id === id);
        }
    });
    return new project;
}