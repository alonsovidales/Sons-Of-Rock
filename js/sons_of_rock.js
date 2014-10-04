var SonsOfRock = (function() {
	return {
		bootstrap: function() {
			SfApi.bootstrap();

			var mainMenu = new MainMenu();
			mainMenu.bootstrap();
			//new Concert('7yvmRjwBhncESjVWn8Es7w');
		}
	};
})();
