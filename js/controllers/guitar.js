var Guitar = (function(inSongId, inScoreBoard) {
	var mainDiv = null;
	var guitarNeck = null;
	var frets = [];
	var fretsStatus = [];
	var ropes = [];
	var currentNotes = [];
	var loops = 0;
	var noteInTriggerRange = null;
	var timers = [];

	var moveNote = function(inNote) {
		var currPos = currentNotes[inNote].note.getPos();

		if (currPos.y >= (config.guitar.topPos + config.guitar.height)) {
			currentNotes[inNote].note.destroy();
			delete currentNotes[inNote];

			inScoreBoard.addScore(config.scoreboard.lostNote);
			return false;
		}

		var ratio = 1 - ((currPos.y - config.guitar.topPos) / config.guitar.height);
		var xDesp = ((config.guitar.fretDesp * (currPos.y - config.guitar.topPos)) / config.guitar.height) * (currentNotes[inNote].rope - 2);

		var width = (((config.guitar.noteWidth - 30) * (1 - ratio)) + 30);
		currentNotes[inNote].note.addStyle('width', width + 'px');

		currentNotes[inNote].note.setPos({
			x: currentNotes[inNote].initX + xDesp - (width / 2),
			y: currPos.y + config.guitar.stepPx});
	};

	var addNote = function(inRope) {
		var newNote = {
			initX: (window.innerWidth / 2) + ((inRope - 2) * ((config.guitar.fretWidth + config.guitar.fretSeparator) / config.guitar.topBottFretRel)),
			rope: inRope,
			note: new UltraDiv(['note', 'rope_' + inRope], 'img')};

		newNote.note.addStyle('width', '5px');
		newNote.note.attr('src', 'sp://sons-of-rock/img/guitar/notes/note_' + (inRope + 1) + '.png');
		mainDiv.appendChild(newNote.note.getEl());
		currentNotes.push(newNote);

		newNote.note.setPos({
			x: newNote.initX,
			y: config.guitar.topPos});
	};

	var moveNotes = function() {
		for (note in currentNotes) {
			moveNote(note);
		}

		loops++;

		timers.push(setTimeout(moveNotes, config.guitar.stepTime));
	};

	var addNoteToQueue = function(inRope, inTime) {
		timers.push(setTimeout(function() {
			addNote(parseInt(inRope, 10))
		}, inTime));
	};

	var stopAll = function() {
		for (timer in timers) {
			clearInterval(timers[timer]);
		}
	};

	var gameEnd = function() {
		stopAll();

		endGameHtml = '\
			<div class="game_end">\
				You Rocks!<br />\
				Score: ' + inScoreBoard.getScore() + '\
				<input type="button" value="Continue" id="game_end_cont_butt" />\
			</div>';

		var popup = new PopUp(endGameHtml, 220, 95);

		document.getElementById('game_end_cont_butt').addEventListener('click', function() {
			popup.close();
			var mainMenu = new MainMenu();
			mainMenu.bootstrap();
		});
	};

	var playSong = function(inSongId) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "sp://sons-of-rock/songs/" + inSongId + ".json", false);

		xhr.addEventListener('load', function(e) {
			var maxFret = 0;

			songInfo = JSON.parse(this.response);
			for (song in songInfo) {
				if (songInfo.hasOwnProperty(song)) {
					part = parseInt(songInfo[song].part, 10);
					fret = parseInt(songInfo[song].fret, 10);

					if (fret > maxFret) {
						maxFret = fret;
					}

					addNoteToQueue(songInfo[song].rope, ((fret + (part * 0.5)) * config.guitar.fretTime) + (totalSongsList[inSongId].delay * 1000));
				}
			}

			timers.push(setTimeout(gameEnd, (maxFret * config.guitar.fretTime) + config.guitar.timeToEnd));

			SfApi.playTrack(inSongId);

			initTime = new Date().getTime();
			setTimeout(moveNotes, totalSongsList[inSongId].delay * 1000);
		});

		xhr.send();
	};

	var createNeck = function() {
		guitarNeck = new UltraDiv(['guitar_neck']);
		guitarNeck.setPos({
			x: (window.innerWidth / 2) - (config.guitar.width / 2),
			y: config.guitar.topPos});
		//var neckBackground = config.guitar.necks[Math.floor((Math.random() * 100) % config.guitar.necks.length)];
		var neckBackground = config.guitar.necks[0];
		guitarNeck.addStyle('background-image', "url('sp://sons-of-rock/img/guitar/necks/" +  neckBackground + "')");

		mainDiv.appendChild(guitarNeck.getEl());
	};

	var addRopes = function() {
		for (var ropeCount = 0; ropeCount < config.guitar.ropes; ropeCount++) {
			ropes[ropeCount] = new UltraDiv(['rope', 'color_' + ropeCount]);

			ropes[ropeCount].setPos({
				x: (window.innerWidth / 2) - (((config.guitar.width / 2) - ((config.guitar.fretWidth + config.guitar.fretSeparator) * ropeCount)) / (config.guitar.topBottRelation / 2)),
				y: config.guitar.topPos - 3});

			mainDiv.appendChild(ropes[ropeCount].getEl());
		}
	};

	var addFrets = function() {
		for (var fretCount = 0; fretCount < config.guitar.ropes; fretCount++) {
			frets[fretCount] = new UltraDiv(['frets', 'fret_' + fretCount]);
			frets[fretCount].setPos({
				x: (window.innerWidth / 2) - (config.guitar.width / 2) + ((config.guitar.fretWidth + config.guitar.fretSeparator) * fretCount) - (config.guitar.fretWidth / 2),
				y: config.guitar.topPos + config.guitar.height - (config.guitar.fretWidth / 2)});

			mainDiv.appendChild(frets[fretCount].getEl());
		}

		noteInTriggerRange = config.guitar.height + config.guitar.topPos - (config.guitar.fretHeight * 3);
	};

	var pressFret = function(inFret) {
		frets[inFret].addClass('pressed');
		fretsStatus[inFret] = true;
	};

	var unPressFret = function(inFret) {
		frets[inFret].removeClass('pressed');
		fretsStatus[inFret] = false;
	};

	var fretTrigger = function(inFret) {
		var pos = frets[inFret].getPos();
		pos.y -= 10;
		frets[inFret].setPos(pos);

		timers.push(setTimeout(function() {
			var pos = frets[inFret].getPos();
			pos.y += 10;
			frets[inFret].setPos(pos);
		}, 100));
	};

	var showNoteOnFire = function(inNote) {
		var notePos = inNote.note.getPos();
		var fretFire = new UltraDiv(['note_fire']);

		inScoreBoard.addScore(config.scoreboard.correctNote);
		mainDiv.appendChild(fretFire.getEl());

		notePos.x -= ((config.guitar.fretFireWidthHeight - config.guitar.fretWidth) / 2) + 4;
		notePos.y -= (config.guitar.fretFireWidthHeight - config.guitar.fretWidth) + 30;
		fretFire.setPos(notePos);
		mainDiv.appendChild(fretFire.getEl());

		timers.push(setTimeout(function() {
			fretFire.destroy();
			inNote.note.destroy();
		}, 100));
	};

	var checkNotes = function() {
		for (var fretCount = 0; fretCount < config.guitar.ropes; fretCount++) {
			if (fretsStatus[fretCount]) {
				fretTrigger(fretCount);
			}
		}

		for (note in currentNotes) {
			if ((currentNotes[note].note.getPos().y > noteInTriggerRange) && fretsStatus[currentNotes[note].rope]) {
				var oldNote = currentNotes[note];

				showNoteOnFire(oldNote);

				delete currentNotes[note];
			}
		}
	};

	var addControls = function() {
		document.addEventListener('keydown', function(inEvent) {
			if (config.controls.frets[inEvent.keyCode] != undefined) {
				pressFret(config.controls.frets[inEvent.keyCode]);
			} else if (config.controls.trigger == inEvent.keyCode) {
				checkNotes();
			}
		});

		document.addEventListener('keyup', function(inEvent) {
			if (config.controls.frets[inEvent.keyCode] != undefined) {
				unPressFret(config.controls.frets[inEvent.keyCode]);
			}
		});

	};

	var initialAnimation = function() {
	};

	var my = {};

	var constructor = function() {
		mainDiv = document.getElementById('main_canvas');

		createNeck();
		addFrets();
		addRopes();
		addControls();
		initialAnimation();
		playSong(inSongId);

		return my;
	};

	return constructor();
});
