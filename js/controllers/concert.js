var Concert = (function(inSongId) {
	var topLeftLight = null;
	var topRightLight = null;
	var guitar = null;
	var scoreboard = null;
	var rockMeter = null;

	var createStage = function() {
		mainDiv = document.getElementById('main_canvas');
		mainDiv.classList.add('concert_background');

		mainDiv.innerHTML = '';

		var backgroundImage = document.createElement('img');
		//backgroundImage.setAttribute('src', 'sp://sons-of-rock/img/stage/background/' + config.concert.backgrounds[Math.floor((Math.random() * 100) % config.concert.backgrounds.length)]);
		backgroundImage.setAttribute('src', 'sp://sons-of-rock/img/stage/background/' + config.concert.backgrounds[1]);
		backgroundImage.setAttribute('width', window.innerWidth);
		backgroundImage.setAttribute('height', window.innerHeight);
		mainDiv.appendChild(backgroundImage);

		// Remove all the classes of the main div
		for (className in mainDiv.classList) {
			if (mainDiv.classList.hasOwnProperty(className)) {
				mainDiv.classList.remove(mainDiv.classList[className]);
			}
		}

		// Add the top focuses
		topLeftLight = new TopLight(false, {
			x: 40,
			y: 20 });
		mainDiv.appendChild(topLeftLight.getEl());

		topRightLight = new TopLight(true, {
			x: window.innerWidth - 280,
			y: 20 });

		new Audience();

		mainDiv.appendChild(topRightLight.getEl());
	};

	var my = {};

	var constructor = function() {
		createStage();
		rockMeter = new RockMeter();
		scoreboard = new Scoreboard(rockMeter);
		guitar = new Guitar(inSongId, scoreboard);

		return my;
	};

	return constructor();
});
