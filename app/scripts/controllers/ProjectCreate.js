'use strict';

angular.module('energiProjektApp')
.controller('ProjectCreateCtrl', function ($rootScope, $location, $scope, Projects) {
	$scope.project = {};
	$scope.project.area = 0;

	$scope.createProject = function() {
		Projects.create($scope.project).success(function(data) {
			console.log("Successfully created project! " + JSON.stringify(data));
			$rootScope.projectId = data.id;
			$location.path( "/projects/menu" );

		});
	}
});
