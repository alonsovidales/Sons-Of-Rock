var UltraDiv = (function(inClasses, inEl) {
	var divEl = null;
	var shown = true;
	var currentPos = {x: 0, y:0};

	var my = {
		addClass: function(inClass) {
			divEl.classList.add(inClass);
		},

		removeClass: function(inClass) {
			divEl.classList.remove(inClass);
		},

		getEl: function() {
			return divEl;
		},

		appendChild: function(inEl) {
			divEl.appendChild(inEl);
		},

		append: function(inEl) {
			divEl.appendChild(inEl.getEl());
		},

		html: function(inText) {
			if (inText !== undefined) {
				divEl.innerHTML = inText;
			} else {
				return divEl.innerHTML;
			}
		},

		attr: function(inAttrName, invalue) {
			if (invalue === undefined) {
				return divEl.getAttribute(inAttrName);
			}

			divEl.setAttribute(inAttrName, invalue);

			return true;
		},

		show: function() {
			shown = true;
			divEl.classList.remove('hd');
		},

		toggle: function() {
			if (shown) {
				this.hide();
			} else {
				this.show();
			}
		},
		
		hide: function() {
			shown = false;
			divEl.classList.add('hd');
		},

		addStyle: function(inName, inValue) {
			divEl.style.setProperty(inName, inValue);
		},

		getPos: function() {
			return currentPos;
		},

		setPos: function(inPos) {
			currentPos = inPos;
			this.addStyle('top', inPos.y + 'px');
			this.addStyle('left', inPos.x + 'px');
		},
		
		destroy: function() {
			divEl.parentNode.removeChild(divEl);
		}
	};

	var constructor = function() {
		if (inEl !== undefined) {
			divEl = document.createElement(inEl);
		} else {
			divEl = document.createElement('div');
		}

		for (className in inClasses) {
			if (inClasses.hasOwnProperty(className)) {
				divEl.classList.add(inClasses[className]);
			}
		}

		return my;
	};

	return constructor();
});
