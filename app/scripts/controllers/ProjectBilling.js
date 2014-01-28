'use strict';

angular.module('energiProjektApp')
.controller('ProjectBillingCtrl', function ($rootScope,$scope,$location,EnergyTypes) {
  	//get all filled in energytypes
  	$scope.availableUnits = ["MWh", "m3"];
  	$scope.energyTypes = {};
  	var oldArray = null;
  	EnergyTypes.getAllForProject($rootScope.project.id).success(function(data) {
  		data.reverse(); //reverse, since the newest will be last. better if the most recently changed is on top!
  		$scope.energyTypes = data;

  		//console.log("Successfully got some energyTypes! " + JSON.stringify(data));
  	});

  	$scope.saveValues = function()
  	{
  		var arrayToSend = { 'project_id' : $rootScope.project.id, 'data' : $scope.energyTypes };
  		EnergyTypes.saveParameters(arrayToSend).success(function(data){
        $location.path( "/project/menu" );
      });
  	}
  });
