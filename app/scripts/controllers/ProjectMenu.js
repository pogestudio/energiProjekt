'use strict';

angular.module('energiProjektApp')
.controller('ProjectMenuCtrl', function ($rootScope, $scope,Projects) {

	var reloadProjects = function ()
	{
		Projects.getAllForUser().success(function(data) {
			$scope.projects = data;
			if ($scope.projects.length > 0) {
				if (typeof $rootScope.project !== "undefined") {

					for (var i = 0; i < data.length; i++) {
						if(data[i].id == $rootScope.project.id)
						{
							$rootScope.project = data[i];
							$scope.chosenProject = data[i];	
						}
					};
					
				} else {
					$scope.chosenProject = data[0];
					$rootScope.project = $scope.chosenProject
				}
			};
			
		});
	}

	$scope.updateProject = function()
	{
		$rootScope.project = $scope.chosenProject;
	}

	reloadProjects();
});
