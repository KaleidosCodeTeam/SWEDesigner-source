/*
 *  @file Contiene i test per gli oggetti di SwedesignerItems.
 *  @author Bonolo Marco - KaleidosCode
 */
define ([
    'jquery',
    'underscore',
    'backbone',
    'joint'
], function ($, _, Backbone, joint) {
    var Test = Backbone.Model.extend({
    	assert: function(condition, message, el) {
			var li = document.createElement('li'); 
    		li.className = condition ? 'pass' : 'fail'; 
			li.appendChild(document.createTextNode(message));
			var output = document.getElementById(el.id);
			output.appendChild(li);
    	},
    	assertProperties: function (object, properties, description, el) {
			var have = true;
			for (var property of properties)
				if (!Object.keys(object).includes(property))
					have = false;
			this.assert(have, description, el);
		}
    });
	return new Test;
});
