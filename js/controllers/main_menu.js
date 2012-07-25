var MainMenu = (function() {
	var mainDiv = null;
	var menuDiv = null;
	var userInfo = null;

	var newOptionDiv = function(inText, inCallBack) {
		var menuOpt = new UltraDiv(['option']);
		menuOpt.html('<a href="javascript:void(0);" class="menu_link">' + inText + '</a>');
		menuOpt.getEl().addEventListener('click', inCallBack);

		return menuOpt;
	};

	return {
		bootstrap: function() {
			console.log('MainMenu');
			mainDiv = document.getElementById('main_canvas');
			mainDiv.innerHTML = '';
			mainDiv.classList.add('main_menu');

			menuDiv = new UltraDiv(['menu']);

			var menuTitle = new UltraDiv(['title']);
			menuTitle.html(config.appTitle);

			menuDiv.append(menuTitle);

			userInfo = SessionController.getUserInfo();

			var userInfoDiv = new UltraDiv(['user_info']);
			userInfoDiv.html('Welcome <span id="menu-user-name">' + userInfo.name + "</span>");

			menuDiv.append(userInfoDiv);

			menuDiv.append(newOptionDiv('Quick Play', function() {
				var songsList = new SongsList();
			}));

			menuDiv.append(newOptionDiv('Multi Player', function() {
				console.log('Clicked Multi player');
			}));

			menuDiv.append(newOptionDiv('Change User Info', function() {
				SessionController.collectUserInfo();
			}));

			menuDiv.append(newOptionDiv('Credits', function() {
				console.log('Clicked Credits');
			}));

			mainDiv.appendChild(menuDiv.getEl());

			SfApi.playTrack(config.mainMenu.song);
		}
	};
});
