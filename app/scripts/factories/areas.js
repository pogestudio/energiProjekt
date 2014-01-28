'use strict';

angular.module('energiProjektApp')
.factory('Areas', function($http,SharedProperties) {
  var address = SharedProperties.getServerAddress();
  return {
    create: function(params) {
    	//console.log('calling area create with data::: ' + JSON.stringify(params));
      return $http.post(address + '/areas/store', params);
    },
    getAllForProject: function(projectId) {
      //console.log('calling get all areas for proj');
      return $http.get(address + '/areas/' + projectId);
    },
    delete: function(areaId) {
      //console.log('want to delete areaId : ' + areaId);
      return $http.delete(address + '/areas/' + areaId);
    },
  }
});