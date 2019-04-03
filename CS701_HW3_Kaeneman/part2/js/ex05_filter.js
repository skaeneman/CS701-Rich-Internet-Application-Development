angular.module('filterApp')
 .filter('underscore', function () {
	return function (value, coalesce) {
		if (angular.isString(value)) {
			if (coalesce) {
				return value.replace(/\s+/g, ",");
			}
			else {
				return value.replace(/\s/g, ",");
			}
		} else {
			return value;
		}
	};
 });

