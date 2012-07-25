var Audience = (function() {
	var mainDiv = null;
	var audiences = [];
	var moveToRight = true;

	var moveAudience = function() {
		var movePixels = 20;
		if (moveToRight) {
			movePixels = -20;
		}

		for (audience in audiences) {
			var currPos = audiences[audience].getPos();
			audiences[audience].setPos({
				x: currPos.x + movePixels,
				y: currPos.y});

			movePixels = movePixels * -1;
		}

		moveToRight = !moveToRight;

		setTimeout(moveAudience, Math.random() * 1000 + 500);
	};

	var my = {};

	var constructor = function() {
		mainDiv = document.getElementById('main_canvas');

		for (var count = 0; (config.audience.width * count) < window.innerWidth; count++) {
			var elem = new UltraDiv(['audience']);
			elem.setPos({
				x: (count * config.audience.width),
				y: window.innerHeight - config.audience.height});
			mainDiv.appendChild(elem.getEl());
			audiences.push(elem);
		}

		moveAudience();

		return my;
	};

	return constructor();
});
