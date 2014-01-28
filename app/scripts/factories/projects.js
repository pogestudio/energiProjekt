'use strict';

var address = 'http://localhost';

angular.module('energiProjektApp')
.factory('Projects', function($http,SharedProperties) {
  var address = SharedProperties.getServerAddress();
  return {
    create: function(params) {
    	//console.log('calling proj create with data::: ' + JSON.stringify(params));
      return $http.post(address + '/projects/store', params);
    },
    getAllForUser: function() {
    	//console.log('calling get all proj');
      return $http.get(address + '/projects');
    },
  }
});