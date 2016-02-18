var BackdropFilter = function(element) {
	var that = this; 
	
	that.element = element;
	$(that.element).attr("data-html2canvas-ignore",true);
	that.assignEvents();
	that.init();
	that.draw();
};

BackdropFilter.prototype.assignEvents = function() {
	var that = this; 
	
	$(that.element).draggable({
		drag: function() {
			that.draw();
		},
		stop: function() {
			that.draw();
		}
	});
	
};

BackdropFilter.prototype.getCoords = function() {
	var that = this; 
	
	that.x1 = $(that.element).offset().left;
	that.y1 = $(that.element).offset().top; 
	that.x2 = $(that.element).offset().left + $(that.element).width();
	that.y2 = $(that.element).offset().top + $(that.element).height();
};

BackdropFilter.prototype.init = function() {
	var that = this; 
	
	that.getCoords();
	
	var x3 = Math.min(that.x1, that.x2);
    var x4 = Math.max(that.x1, that.x2);
    var y3 = Math.min(that.y1, that.y2);
    var y4 = Math.max(that.y1, that.y2);
    
    var backdropArea = document.createElement("div");
    backdropArea.style.position = "absolute";
    backdropArea.style.display = "block";
    backdropArea.style.zIndex = -1;
	$(that.element).append(backdropArea);
	
	$(that.element).css({
		"overflow": "hidden",
		"clip": "rect(0, auto, auto, 0)",
		"position": "absolute"
	});
	
	that.backdropArea = backdropArea;
    
	html2canvas(document.body).then(function(canvas) {
		var newCanvas = document.createElement("canvas");
		var context = newCanvas.getContext("2d");
		newCanvas.setAttribute("width", (x4 - x3) + "px"); 
		newCanvas.setAttribute("height", (y4 - y3) + "px"); 
		
		var image = new Image();

		image.onload = function() {
			var sourceX = x3;
			var sourceY = y3;
			var sourceWidth = window.innerWidth;
			var sourceHeight = window.innerHeight;
			var destWidth = window.innerWidth;
			var destHeight = window.innerHeight;
			var destX = 0;
			var destY = 0;
			
			context.drawImage(
				image, 
				sourceX, 
				sourceY, 
				sourceWidth, 
				sourceHeight, 
				destX, 
				destY, 
				destWidth, 
				destHeight
			);
		};
		image.src = canvas.toDataURL();
		
		$(that.backdropArea).css({
			background: "url('" + image.src + "')",
			"-webkit-filter": "blur(2px)",
			"-moz-filter": "blur(2px)",
			"-o-filter": "blur(2px)",
			"-ms-filter": "blur(2px)",
			"filter": "blur(2px)",
			"width": (window.innerWidth) + "px",
			"height": (window.innerHeight) + "px",
			"overflow": "hidden",
			"position": "fixed",
			"top": "0px",
			"left": "0px"
		});

	});
};

BackdropFilter.prototype.draw = function() {
	var that = this; 
	
//	that.getCoords();
//	var x3 = Math.min(that.x1, that.x2);
//    var y3 = Math.min(that.y1, that.y2);
//	
//	$(that.backdropArea).css({
//		left: "-" + parseInt(x3) + "px",
//		top: "-" + parseInt(y3) + "px"
//	});
};