

var CoderActivity = function() {
	
};

CoderActivity.getBubbleLinks = function(_activity) {
	var bubbleLinks = new Array();
	var count=0;
	for(var i=0; i<_activity.length; i++) {
		if(_activity[i].type == "bubbleDiagram.items.bubbleLink") {
			bubbleLinks[count] = _activity[i];
			count++;
		}
	}
	return bubbleLinks;
}

CoderActivity.getBubbleById = function(bubbleId, _activity) {
	for(var i=0; i<_activity.length; i++) {
		if(_activity[i].id == bubbleId) {
			return _activity[i];
		}
	}
	return null;
}

CoderActivity.getNextBubble = function(bubble,_activity) {
	var bubbleLinks = CoderActivity.getBubbleLinks(_activity);
	for(var i=0; i<bubbleLinks.length; i++) {
		if(bubbleLinks[i].source.id == bubble.id) {
			var nextBubbleId = bubbleLinks[i].target.id;
			var nextBubble = CoderActivity.getBubbleById(nextBubbleId,_activity);
			return nextBubble;
		}
	}
	return null;
}

CoderActivity.getStartBubble = function(bubbleArray, parent) {
	for(var i=0; i<bubbleArray.length; i++) {
		if(bubbleArray[i].type == "bubbleDiagram.items.bubbleStart" && bubbleArray[i].parent==parent) {
			return bubbleArray[i];
		}
	}
	return null;
}

CoderActivity.codeEmbeddedBubbles = function(bubble, _activity) {
	source = "";
	var EmbeddedBubbles = new Array();
	var count = 0;
	if(bubble.embeds != undefined) {
		for(var i=0; i<bubble.embeds.length; i++) {
			EmbeddedBubbles[count] = CoderActivity.getBubbleById(bubble.embeds[i], _activity);
			count++;
		}
		var startBubble = CoderActivity.getStartBubble(EmbeddedBubbles, bubble.id); // oggetto bubble
		if(startBubble) {
			var nextBubble = CoderActivity.getNextBubble(startBubble, _activity);
			while(nextBubble) {
				source += CoderActivity.codeBubble(nextBubble, _activity, bubble.id);
				nextBubble = CoderActivity.getNextBubble(nextBubble, _activity);
			}
		}
	}

	return source;
}

CoderActivity.codeBubble = function(bubble, _activity, parent) {
	var source = "";
	if(bubble.type == "bubbleDiagram.items.bubbleIf") {
		source += "if(" + bubble.values.condition + "){ \n";
		source += CoderActivity.codeEmbeddedBubbles(bubble, _activity);
		source += "}\n";
	}
	else if(bubble.type == "bubbleDiagram.items.bubbleElse") {
		source += "else { \n";
		source += CoderActivity.codeEmbeddedBubbles(bubble, _activity);
		source += "} \n";
	}
	else if(bubble.type == "bubbleDiagram.items.bubbleFor") {
		source += "for(" + bubble.values.initialization + ";" + bubble.values.termination + ";" + bubble.values.increment + ") { \n";
		source += CoderActivity.codeEmbeddedBubbles(bubble, _activity);
		source += "} \n";
	}
	else if(bubble.type == "bubbleDiagram.items.bubbleWhile") {
		source += "while(" + bubble.values.condition + "){ \n";
		source += CoderActivity.codeEmbeddedBubbles(bubble, _activity);
		source += "}\n";
	}
	else if(bubble.type == "bubbleDiagram.items.customBubble") {
		source += bubble.values.bubbleCode + "\n";
		source += CoderActivity.codeEmbeddedBubbles(bubble, _activity);
	}
	else if(bubble.type == "bubbleDiagram.items.bubbleReturn") {
		source += "return " + bubble.values.value + "; \n";
	}

	return source;
}

CoderActivity.codeElementJava = function(_activity) {
	var source = "";
	var startBubble = CoderActivity.getStartBubble(_activity.items); // oggetto bubble
	if(startBubble == null) {
		throw "Nessuna classe iniziale trovata per il metodo "+ _activity.id;
	}
	var nextBubble = CoderActivity.getNextBubble(startBubble,_activity.items);

	while(nextBubble) {
		source += CoderActivity.codeBubble(nextBubble, _activity.items);
		nextBubble = CoderActivity.getNextBubble(nextBubble, _activity.items);
	}

	return source;
};

CoderActivity.codeElementJavascript = function(_activity) {
	var source = "";
	var startBubble = CoderActivity.getStartBubble(_activity); // oggetto bubble
	if(startBubble == null) {
		throw "Nessuna classe iniziale trovata per il metodo ";
	}
	var nextBubble = CoderActivity.getNextBubble(startBubble,_activity);

	while(nextBubble) {
		source += CoderActivity.codeBubble(nextBubble, _activity);
		nextBubble = CoderActivity.getNextBubble(nextBubble, _activity);
	}

	return source;
};

module.exports = CoderActivity;