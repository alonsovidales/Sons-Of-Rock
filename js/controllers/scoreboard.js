var Scoreboard = (function(inRockMeter) {
	var score = 0;
	var scoreboard = null;
	var mainDiv = null;

	var updateScore = function() {
		var scoreText = document.getElementById('current_score');
		var scorePad = '' + score;

		while (scorePad.length < config.scoreboard.scoreLen) {
			scorePad = '0' + scorePad;
		}

		scoreText.innerHTML = scorePad;
	};


	var my = {
		getScore: function() {
			return score;
		},

		addScore: function(inScore) {
			score += inScore;

			if (score < 0) {
				score = 0;
			}

			if (inScore > 0) {
				inRockMeter.correctNote();
			} else {
				inRockMeter.mistake();
			}

			updateScore();
		}};

	var constructor = function() {
		mainDiv = document.getElementById('main_canvas');
		scoreboard = new UltraDiv(['scoreboard']);
		scoreboard.html('Score: <span id="current_score">000000</span>');
		mainDiv.appendChild(scoreboard.getEl());

		return my;
	};

	return constructor();
});
