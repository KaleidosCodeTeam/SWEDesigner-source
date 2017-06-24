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
            dependenciesArray: [],
            pkgCommentsArray: []
        },
        classes: {
            classesArray: [],
            relationshipsArray: [],
            clCommentsArray: []
        },
        operations: [],
        bubbles: [],
        initialize: function() {},

        deleteClassesOf: function(id) {
            for (var cl in this.classes.classesArray) {
                if (cl.parentId === id) {
                    this.deleteOperationsOf(cl.id);
                    this.classes.classesArray.splice(this.classesArray.indexOf(cl),1);
                }
            }
            for (var rl in this.classes.relationshipsArray) {
                if (rl.parentId ===id) {
                    this.classes.relationshipsArray.splice(this.relationshipsArray.indexOf(rl),1);
                }
            }
        },

        deleteOperationsOf: function(id) {
            for (var op in this.operations) {
                if (op.parentId === id) {
                    this.operations.splice(this.operations.indexOf(op),1);
                }
            }
        }
    });
    return new project;
});