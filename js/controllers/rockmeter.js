var RockMeter = (function() {
	var mainDiv = null;
	var rockmeterDiv = null;
	var notesToChange = 0;
	var currentStat = 0;

	var checkChange = function() {
		if (notesToChange > config.rockmeter.notesToChange) {
			if (config.rockmeter.status[currentStat + 1] !== undefined) {
				currentStat++;
				rockmeterDiv.addClass(config.rockmeter.status[currentStat]);

				notesToChange = 0;
			} else {
				notesToChange--;
			}
		}

		if (notesToChange < 0) {
			if (config.rockmeter.status[currentStat - 1] !== undefined) {
				rockmeterDiv.removeClass(config.rockmeter.status[currentStat]);
				currentStat--;

				notesToChange = (config.rockmeter.notesToChange - 1);
			} else {
				notesToChange++;
			}
		}
	};

	var my = {
		correctNote: function() {
			notesToChange++;
			checkChange();
		},

		mistake: function() {
			notesToChange--;
			checkChange();
		}};

	var constructor = function() {
		mainDiv = document.getElementById('main_canvas');
		rockmeterDiv = new UltraDiv(['rockmeter', 'low']);
		mainDiv.appendChild(rockmeterDiv.getEl());

		return my;
	};

	return constructor();
});
