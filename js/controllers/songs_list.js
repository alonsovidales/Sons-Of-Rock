var SongsList = (function() {
	var userInfo = null;
	var currentTrack = null;
	var trackInfoContent = null;

	var getStarsHtml = function(inCalification) {
		var html = '<div class="stars_box">';
		for (var count = 0; count < 5; count++) {
			if (inCalification <= count) {
				html += '<div class="star no_selected"></div>';
			} else {
				html += '<div class="star selected"></div>';
			}
		}

		html += '</div>';

		return html;
	};

	var showTrackInfo = function(inTrackId) {
		if (currentTrack != inTrackId) {
			SfApi.playTrack(inTrackId);

			SfApi.getTrackInfo(inTrackId, function(inInfo) {
				console.log(inInfo.data);

				trackInfoContent.html('\
					<div class="track_title">' + inInfo.data.name + '</div>\
					' + getStarsHtml(totalSongsList[inTrackId].dificult) + '\
					<div class="track_info_text"><b>Dutarion:</b> ' + SorTools.formatTrackTime(inInfo.data.duration) + ' min.</div>\
					<div class="track_info_text"><b>Popularity:</b> ' + inInfo.data.popularity + '</div>\
					<img src="' + inInfo.data.album.cover + '" class="album_cover" />');

				var albumInfo = new UltraDiv(['album_info']);
				albumInfoHtml = '\
					<b>Album:</b> ' +  inInfo.data.album.name + '<br />\
					<b>Year:</b> ' +  inInfo.data.album.year + '<br />\
					<b>Artist:</b> ' + inInfo.data.album.artist.name;

				albumInfo.html(albumInfoHtml);
				trackInfoContent.append(albumInfo);
			});

			currentTrack = inTrackId;
		}
	};

	var addSongToList = function(inSongsListUel, inSongToAdd) {
		SfApi.getTrackInfo(inSongToAdd.id, function(inInfo) {
			var userInfoDiv = new UltraDiv(['song_resume']);

			userInfoDiv.attr('track_id', inSongToAdd.id);

			var titleDiv = new UltraDiv(['title']);
			var durationStr = '[' + SorTools.formatTrackTime(inInfo.data.duration) + ']';

			titleDiv.html(durationStr + ' ' + inInfo.data.name);
			userInfoDiv.append(titleDiv);

			for (artist in inInfo.data.artists) {
				var artistDiv = new UltraDiv(['artist']);
				artistDiv.html(inInfo.data.artists[artist].name);
				userInfoDiv.append(artistDiv);
			}

			inSongsListUel.append(userInfoDiv);

			userInfoDiv.getEl().addEventListener('click', function() {
				new Concert(inSongToAdd.id);
			});

			userInfoDiv.getEl().addEventListener('mouseover', function() {
				showTrackInfo(this.getAttribute('track_id'));
			});
		});
	};

	var my = {};

	var construct = function() {
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

		mainDiv.appendChild(menuDiv.getEl());

		var trackInfo = new UltraDiv(['track_info']);

		var trackInfoTitle = new UltraDiv(['title']);
		trackInfoTitle.html("Track Info");
		trackInfo.append(trackInfoTitle);

		trackInfoContent = new UltraDiv(['track_info_content']);
		trackInfo.append(trackInfoContent);
		mainDiv.appendChild(trackInfo.getEl());

		var playList = new UltraDiv(['play_list']);
		playList.addStyle('height', (window.innerHeight - 40) + '.px');

		var playListTitle = new UltraDiv(['title']);
		playListTitle.html('Play List');
		playList.append(playListTitle);

		for (song in totalSongsList) {
			if (totalSongsList.hasOwnProperty(song)) {
				addSongToList(playList, totalSongsList[song]);
			}
		}

		mainDiv.appendChild(playList.getEl());

		var playList = new UltraDiv(['advertise_list']);
		playList.html('\
			<a href="http://spotify.com" target="_blank">\
				<img src="sp://sons-of-rock/img/ads/spotify.jpg" border="0" />\
			</a>');
		mainDiv.appendChild(playList.getEl());

		return my;
	};

	return construct();
});
