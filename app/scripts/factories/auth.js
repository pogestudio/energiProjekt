'use strict';

angular.module('energiProjektApp')
  .factory('Auth', function($http,SharedProperties) {
    var address = SharedProperties.getServerAddress();
  return {
    logout: function() {
      return $http.get(address + '/user/logout');
    },
    login: function(inputs) {
              console.log('trying to login     ' + JSON.stringify(inputs));
      return $http.post(address + '/user/login', inputs);
    }
  }
});