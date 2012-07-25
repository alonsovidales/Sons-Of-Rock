var SfApi = (function() {
	var spApi = null;
	var models = null;

	return {
		playTrack: function(inSongId) {
			models.player.play("spotify:track:" + inSongId);
		},

		stopPlay: function() {
		},

		getAlbumInfo: function(inAlbumId, inCallback) {
			return new models.Album.fromURI("spotify:album:" + inAlbumId, function(album) {
				inCallback(album);
			});
		},

		getTrackInfo: function(inSongId, inCallback) {
			return new models.Track.fromURI("spotify:track:" + inSongId, function(track) {
				inCallback(track);
			});
		},

		getCurrentTrackPos: function() {
		},

		bootstrap: function() {
			spApi = getSpotifyApi(1);
			models = spApi.require("sp://import/scripts/api/models");
		}
	};
})();
