'use strict';

angular.module('energiProjektApp')
  .controller('ProjectGeneralCtrl', function ($rootScope,$scope,Areas) {
  	$scope.rooms = [];
  	$scope.buildings = [];

  	var updateRoomsAndBuildings = function ()
  	{
  		Areas.getAllForProject($rootScope.project.id).success(function(data){
			$scope.buildings = data['buildings'];
			$scope.rooms = data['rooms'];
  		});
  	}

  	$scope.deleteArea = function (area)
  	{
  		var id = area.id;
  		Areas.delete(id).success(function(data){
  			updateRoomsAndBuildings();
  		});
  	}

  	updateRoomsAndBuildings();

  });
