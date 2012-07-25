var SessionController = (function() {
	var userInfo = null;

	var save = function(inKey, inValue) {
		localStorage.setItem(inKey, JSON.stringify(inValue));
	};

	var load = function(inKey) {
		var value = localStorage.getItem(inKey);
		if (value != null) {
			return JSON.parse(value);
		}

		return false;
	};

	var my = {
		collectUserInfo: function() {
			var userInfoForm = '\
				<div class="user-info-form">\
					User Info\
					<div class="field-name">\
						Name\
						<input type="text" id="user-name-field" />\
					</div>\
					<div class="field-name">\
						E-mail\
						<input type="text" id="user-email-field" />\
					</div>\
					<div class="field-submit">\
						<input type="button" id="user-submit" value="Save" />\
					</div>\
				</div>';

			var popup = new PopUp(userInfoForm, 400, 160);

			if ((userInfo = load('sf_session_userInfo')) !== false) {
				document.getElementById('user-name-field').value = userInfo.name;
				document.getElementById('user-email-field').value = userInfo.email;
			}

			document.getElementById('user-submit').addEventListener('click', function() {
				var userInfo = {
					name: document.getElementById('user-name-field').value,
					email: document.getElementById('user-email-field').value
				};


				if ((userInfo.name !== '') && (userInfo.email !== '')) {
					// Update the user name
					document.getElementById('menu-user-name').innerHTML = userInfo.name;
					save('sf_session_userInfo', userInfo);
					popup.close();
				}
			});
		},

		getUserInfo: function() {
			if ((userInfo = load('sf_session_userInfo')) === false) {
				my.collectUserInfo();
			}

			return userInfo;
		}
	};

	return my;
})();
