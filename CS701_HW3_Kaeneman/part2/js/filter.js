angular.module('filterApp')
 .filter('tokenize', function () {
	return function (value, delimiter) {
		if (angular.isString(value)) {
			if (delimiter) {
				var splitChars = value.split('');
				return splitChars.join(delimiter);
			}
			else {
				var splitChars = value.split('');
				return splitChars.join(',');
			}
		} else {
			return value;
		}
	};
 });

