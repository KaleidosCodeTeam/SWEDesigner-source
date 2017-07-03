/**
 *  @file Contiene la classe Project.
 *  @author Pezzuto Francesco, Sovilla Matteo - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint'
], function ($, _, Backbone, joint) {
    /**
     *  @classdesc Contenitore di tutti gli elementi del progetto correntemente aperto nella Single Page Application.
     *  @module
     *  @class Project
     *  @extends {Backbone.Model}
     */
    var Project = Backbone.Model.extend({
        /**
         *  @var {Object} Project#packages - Contiene: packagesArray (array contentente i package item del diagramma dei package)
         *  e dependenciesArray (array contenente i link del diagramma dei package).
         */
        packages: {
            packagesArray: [],
            dependenciesArray: []
        },
        /**
         *  @var {Object} Project#classes - Contiene: classesArray (array contentente diagrammi delle classi;
         *  in ogni indice è presente un oggetto {id: idPackagePadre, items: [arrayClassiDelDiagramma]}) e dependenciesArray
         *  (array contenente i link del corrispondente diagramma delle classi; in ogni indice è presente un oggetto
         *  {id: idPackagePadre, items: [arrayLinkDelDiagramma]}).
         */
        classes: {
            classesArray: [],
            relationshipsArray: []
        },
        /**
         *  @var {Object[]} Project#operations - Contiene un array di oggetti; in ogni indice è presente un oggetto
         *  {id: idDell'operazione, items: [arrayBubbleDelDiagramma]}).
         */
        operations: [],
        /**
         *  @function Project#deleteClassesDiagramOfPkg
         *  @param {string} id - Identificativo del package.
         *  @summary Elimina il diagramma delle classi associato al package e tutti i diagrammi delle bubble associati alle operazioni delle relative classi.
         */
        deleteClassesDiagramOfPkg: function(id) {
            // Individuo il diagramma delle classi associato al package
            var cl = this.getClassIndex(id);
            if (cl != -1) {
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
	        }
        },
        /**
         *  @function Project#deleteOperationDiagram
         *  @param {string} id - Identificativo dell'operazione.
         *  @summary Elimina il diagramma delle bubble associato all'operazione.
         */
        deleteOperationDiagram: function(id) {
            this.operations.splice(this.getOperationIndex(id), 1);
        },
        /**
         *  @function Project#getOperationIndex
         *  @param {string} id - Identificativo dell'operazione.
         *  @return Indice dell'array operations del diagramma delle bubble associato all'operazione (-1 se non trovato).
         *  @summary Cerca ed eventualmente ritorna l'indice dell'array operations del diagramma delle bubble associato all'operazione.
         */
        getOperationIndex: function(id) {
            return this.operations.findIndex((x) => x.id == id);
        },
        /**
         *  @function Project#getClassIndex
         *  @param {string} id - Identificativo del package.
         *  @return Indice dell'array classesArray del diagramma delle classi associato al package (-1 se non trovato).
         *  @summary Cerca ed eventualmente ritorna l'indice dell'array classesArray del diagramma delle classi associato al package.
         */
        getClassIndex: function(id) {
            return this.classes.classesArray.findIndex((x) => x.id == id);
        }
    });
    return new Project;
});
