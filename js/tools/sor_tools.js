var SorTools = (function() {
	/**
	  * Adds a zero at the left if the number is lees than 10
	  *
	  * @param inNumber <int>: the number to be padded
	  *
	  * @return <mixed>:
	  *     - str: if the number is less than 10
	  *     - int: if the number is not modiffied
	  */
	var padToTwo = function(inNumber) {
		if (inNumber < 10) {
			return '0' + inNumber;
		}

		return inNumber;
	};

	return {
		/**
		  * Calculates the representation on mm:ss of the input
		  * in seconds
		  *
		  * @param inTime <int>: The number of seconds to calculate
		  *
		  * @return <str>: The string representation with mm:ss format
		  */
		formatTrackTime: function(inTime) {
			var time = inTime / 1000;
			return padToTwo(Math.round(time / 60), 2) + ':' + padToTwo(Math.floor(time % 60), 2);
		}
	};
})();
