var TopLight = (function(inMirrored, inPos) {
	var manLightEl = null;
	var mainDiv = null;
	var lights = {};

	var blinkLight = function(inLight) {
		lights[inLight].toggle();

		setTimeout(function() {
			blinkLight(inLight);
		}, Math.random() * 1000 + 2000);
	};

	var switchOnLight = function(inLight) {
		lights[inLight] = new UltraDiv(['top_light_light']);

		mainDiv.appendChild(lights[inLight].getEl());

		if (inMirrored) {
			lights[inLight].setPos({
				x: inPos.x + (63 * inLight) - 29,
				y: inPos.y + (15 * inLight) - 12});
		} else {
			lights[inLight].setPos({
				x: inPos.x + (63 * inLight) - 29,
				y: inPos.y - (15 * inLight) + 12});
		}

		blinkLight(inLight);
	};

	var my = {
		getEl: function() {
			return manLightEl.getEl();
		},

		stop: function() {
		}
	};

	var constructor = function() {
		mainDiv = document.getElementById('main_canvas');
		if (inMirrored) {
			manLightEl = new UltraDiv(['top_light', 'right']);
		} else {
			manLightEl = new UltraDiv(['top_light']);
		}

		manLightEl.setPos(inPos);

		switchOnLight(0);
		switchOnLight(1);
		switchOnLight(2);

		return my;
	};

	return constructor();
});
