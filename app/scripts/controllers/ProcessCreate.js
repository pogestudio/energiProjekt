'use strict';

angular.module('energiProjektApp')
.controller('ProcessCreateCtrl', function ($rootScope,$scope,$location,Areas,Processes) {

	$scope.process = {'title' : '', 'uptime_per_week':'', 'processtype_id':'', 'power':'', 'quantity':'', 'area_id':''};
	$scope.areas = [];
	$scope.processType = "production";
	$scope.pageTitle = "Lägg till produktionsprocess";

	var supportProcesses = [];
	var productionProcesses = [];
	$scope.processTypes = productionProcesses;

	var getAreas = function ()
	{
		Areas.getAllForProject($rootScope.project.id).success(function(data){

			$scope.areas = data['rooms'].concat(data['buildings']);

			if ($scope.areas.length > 0) {
				$scope.process.area_id = $scope.areas[0].id;
				//console.log('got more than 0 areas. ownerArea is now...')
			}
			$scope.buildingExists = ($scope.areas.length > 0);
		});
	}

	var getProcessTypes = function ()
	{
		Processes.getProcessTypesForProject($scope.project.id).success(function(data){
			supportProcesses = [];
			productionProcesses = [];

			for (var i = data.length - 1; i >= 0; i--) {
				if (data[i].type == 'production') {
					productionProcesses.push(data[i]);
				} else {
					supportProcesses.push(data[i]);
				}
			};

			$scope.changeType($scope.processType); //update currentv alue

		});
	}

	$scope.submitForm = function () {
		$scope.createProcess(); //put logic here if we want to update something instead
	}

	$scope.createProcess = function () {

		var processData = {
			'title' : $scope.process.title,
			'uptime_per_week' : $scope.process.uptime_per_week,
			'power' : $scope.process.power,
			'quantity' : $scope.process.quantity,
			'processtype_id' : $scope.process.processtype_id,
			'area_id' : $scope.process.area_id,
		};

		Processes.create(processData).success(function(data){
			$location.path("/process/" + $scope.processType);
		});
	}

	$scope.changeType = function(type) {
		if (type == 'production') {
			$scope.processTypes = productionProcesses;
			if (productionProcesses.length > 0) {
				$scope.process.processtype_id = productionProcesses[0].id;
			}
		} else {
			$scope.processTypes = supportProcesses;
			if (supportProcesses.length > 0) {
				$scope.process.processtype_id = supportProcesses[0].id;
			};
		}
	}

	getAreas();
	getProcessTypes();

});
