var config = {
	appTitle: 'Sons of Rock',
	mainMenu: {
		song: '78Az0Z1vNJgqv9QSB0ULLV'
	},

	concert: {
		backgrounds: [
			'background_1.png',
			'background_2.png',
			'background_3.png']
	},

	guitar: {
		width: 300,
		height: 550,
		stepPx: 10,
		stepTime: 15,
		ropes: 5,
		topBottRelation: 2.9,
		topBottFretRel: 2.4,
		topPos: 70,
		noteWidth: 60,
		noteHeight: 26,
		fretDesp: 49,
		fretHeight: 30,
		fretWidth: 67,
		fretFireWidthHeight: 100,
		fretSeparator: 8,
		fretTime: 351,
		timeToEnd: 2000,
		necks: [
			'neckback_1.png',
			'neckback_2.png',
			'neckback_3.png']
	},

	controls: {
		frets: {
			81: 0,
			87: 1,
			69: 2,
			82: 3,
			84: 4
		},
		trigger: 77
	},

	audience: {
		height: 248,
		width: 278
	},

	rockmeter: {
		status: [
			'low',
			'med',
			'hi'],
		notesToChange: 30
	},

	scoreboard: {
		correctNote: 20,
		lostNote: -10,
		inCorrectNote: -20,
		scoreLen: 6
	}
};
