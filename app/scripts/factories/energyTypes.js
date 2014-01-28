'use strict';

angular.module('energiProjektApp')
.factory('EnergyTypes', function($http,SharedProperties) {
  var address = SharedProperties.getServerAddress();
  return {
    saveParameters: function(params) {
    	
      var newAddress = address + '/energytypes/storeMany';
//      console.log('calling proj create with data::: ' + JSON.stringify(params) + ' for address:::: ' + newAddress);
      return $http.post(newAddress, params);
    },
    getAllForProject: function(projectId) {
  //  	console.log('calling get all energyTypes for projectId ' + projectId);
      return $http.get(address + '/energytypes/' + projectId);
    },
  }
});