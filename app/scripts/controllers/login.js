'use strict';

angular.module('energiProjektApp')
.controller('LoginCtrl',function($scope, $rootScope, $http, $location, Auth) 
{
  $scope.password = '';

  $rootScope.user = {'email': 'first@email.com'};
  //$scope.password = 'password';

  $scope.$on('authLoaded', function() {
    console.log('authLoaded is done. username: ' + $rootScope.user.username);
    $location.path( "/" );
  });
  
  
  $scope.logoutUser = function() {
    Auth.logout().success(function(data) {
      console.log("You have been logged out.");
      $rootScope.user = {};
    });
  }

  $scope.loginUser = function() {
    Auth.login({
      email: $rootScope.email,
      password: $scope.password
    }).success(function(data) {
      $scope.password = '';
      if (data.error) {
        console.log('error in login: ' + data.error);
      } else {
        $scope.password = '';
        $rootScope.user = data;
        $rootScope.username = $scope.user.username;
        //console.log('loginsuccess' + JSON.stringify($scope.user));
        $scope.$broadcast("authLoaded");
      }
    });
  }

  $scope.registerUser = function() {
    Auth.register({
      serie_id: $scope.main.serieId,
      email: $scope.newUser.email,
      password: $scope.newUser.password,
      terms: $scope.newUser.terms,
      name: $scope.newUser.name,
    }).success(function(data) {
      if (data.error) {
        toastr.error(data.error);
      }

      if (data.success) {
        toastr.success("Welcome to " + $scope.main.serie.name + "!");
        $scope.loadAuth();
        $scope.newUser = {};
        //Popup.close();
      }
    });
  }
  
  //$scope.loadAuth();
  //$scope.loginUser();
  //$scope.loadSerie();


});