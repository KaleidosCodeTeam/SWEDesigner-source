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
            relationshipsArray: []
        },
        operations: [],

        initialize: function() {},

        deleteClassesOf: function(id) {
            for (var cl in this.classes.classesArray) {
                if (this.classes.classesArray[cl].id === id) {
                    this.deleteOperationsOf(cl.id);
                    this.classes.classesArray.splice(this.classes.classesArray.indexOf(cl),1);
                }
            }
            for (var rl in this.classes.relationshipsArray) {
                if (this.classes.classesArray[rl].id === id) {
                    this.classes.relationshipsArray.splice(this.classes.relationshipsArray.indexOf(rl),1);
                }
            }
        },

        deleteOperationsOf: function(id) {
            for (var op in this.operations) {
                if (this.operations[op].id === id) {
                    this.operations.splice(this.operations.indexOf(op),1);
                }
            }
        },

        getOperationIndex: function(id) {
            return this.operations.findIndex((x) => x.id == id);
        },

        getClassIndex: function(id) {
            return this.classes.classesArray.findIndex((x) => x.id == id);
        }
    });
    return new project;
});