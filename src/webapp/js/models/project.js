define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/items/swedesignerItems'
], function ($, _, Backbone, joint, Swedesigner) {
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

        deleteClassesDiagramOfPkg: function(id) {
            // Individuo il diagramma delle classi associato al package
            var cl = this.getClassIndex(id);
            // Scorro tutte le classi del diagramma
            for (var i in this.classes.classesArray[cl].items) {
                // Scorro tutte le operazioni del diagramma delle classi 
                for (var op in this.classes.classesArray[cl].items[i].getValues().operations) {
                    // Elimino il diagramma associato a ciascuna operazione
                    this.deleteOperationDiagram(this.classes.classesArray[cl].items[i].getValues().operations[op].id);
                }
            }
            // Elimino il diagramma delle classi
            this.classes.classesArray.splice(this.classes.classesArray.indexOf(cl),1);
            // Elimino le relazioni appartenenti al diagramma
            for (var rl in this.classes.relationshipsArray) {
                if (this.classes.relationshipsArray[rl].id === id) {
                    this.classes.relationshipsArray.splice(this.classes.relationshipsArray.indexOf(rl),1);
                }
            }
        },

        deleteOperationDiagram: function(id) {
            this.operations.splice(this.getOperationIndex(id), 1);
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