'use strict';

angular.module('energiProjektApp')
.controller('AreaCreateCtrl', function ($rootScope,$scope,$location,Areas) {
	$scope.area = {'title' : '', 'description':'', 'ownerArea':''};
	$scope.buildings = [];
	$scope.isRoom = "false";
	$scope.buildingExists = false;

	var getRooms = function ()
	{
		Areas.getAllForProject($rootScope.project.id).success(function(data){
			$scope.buildingExists = false;
			//console.log('got some results for areas :: ' + JSON.stringify(data));
			$scope.buildings = data['buildings'];
			if ($scope.buildings.length > 0) {
				$scope.area.ownerArea = $scope.buildings[0].id;
				$scope.buildingExists = true;
				//console.log('got more than 0 buildings. ownerArea is now...')
			}
		});
	}

	$scope.createArea = function () {

		var isBuilding = false;
		if ($scope.isRoom == "false" || $scope.isRoom == false) {
			$scope.area.ownerArea = null;
			isBuilding = true;
		}

		var areaData = {
			'title' : $scope.area.title,
			'description' : $scope.area.description,
			'owner_building_id' : $scope.area.ownerArea,
			'isBuilding' : isBuilding,
			'project_id' : $rootScope.project.id,
		};

		Areas.create(areaData).success(function(data){
			$location.path("/project/general");
		});
	}



	getRooms();

});
