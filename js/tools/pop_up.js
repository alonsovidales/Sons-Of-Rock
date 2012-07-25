var PopUp = (function(inHtmlContent, inWidth, inHeight) {
	var backgroundMask = null;
	var popUpDiv = null;

	var my = {
		close: function() {
			backgroundMask.destroy();
			popUpDiv.destroy();
		}
	};

	var constructor = function() {
		var bodyEl = document.getElementsByTagName('body')[0];

		backgroundMask = new UltraDiv(['popup_overlay']);
		bodyEl.appendChild(backgroundMask.getEl());

		popUpDiv = new UltraDiv(['popup']);
		popUpDiv.html(inHtmlContent);
		popUpDiv.addStyle('width', inWidth + 'px');
		popUpDiv.addStyle('height', inHeight + 'px');
		popUpDiv.addStyle('top', ((window.innerHeight / 2) - (inHeight / 2)) + 'px');
		popUpDiv.addStyle('left', ((window.innerWidth / 2) - (inWidth / 2)) + 'px');

		bodyEl.appendChild(popUpDiv.getEl());

		return my;
	};

	return constructor();
});
