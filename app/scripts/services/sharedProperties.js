'use strict';

angular.module('energiProjektApp')
.service('SharedProperties', function () {
	var objectValue = {
		ownerId: '',
		updateId:'',
	};

	var prodAdress = '/index.php';
	var devAdress = 'http://localhost';
	var address = prodAdress;
	return {
		getSharedProperties: function() {
			return objectValue;
		},
		getServerAddress: function() {
			return address;
		},
	};
});