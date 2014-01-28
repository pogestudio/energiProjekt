'use strict';

angular.module('energiProjektApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
  ])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/area/create', {
    templateUrl: 'views/area/create.html',
    controller: 'AreaCreateCtrl'
  })
  .when('/project/create', {
    templateUrl: 'views/project/create.html',
    controller: 'ProjectCreateCtrl'
  })
  .when('/project/menu', {
    templateUrl: 'views/project/menu.html',
    controller: 'ProjectMenuCtrl'
  })
  .when('/project/general', {
    templateUrl: 'views/project/general.html',
    controller: 'ProjectGeneralCtrl'
  })
  .when('/project/billing', {
    templateUrl: 'views/project/billing.html',
    controller: 'ProjectBillingCtrl'
  })
  .when('/process/create', {
    templateUrl: 'views/processes/create.html',
    controller: 'ProcessCreateCtrl'
  })
  .when('/process/production', {
    templateUrl: 'views/processes/list.html',
    controller: 'ProjectProcessesCtrl'
  })
  .when('/process/support', {
    templateUrl: 'views/processes/list.html',
    controller: 'ProjectProcessesCtrl'
  })
  .when('/project/results', {
    templateUrl: 'views/project/results.html',
    controller: 'ProjectResultsCtrl'
  })
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}).run(function($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      console.log("We're in route change");
      if ( $rootScope.user == null || $rootScope.user.username == '') {
        $rootScope.user = {'username': '', 'email':''};
        // no logged user, we should be going to #login
        if ( next.templateUrl == "views/login.html" ) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( "/login" );
        }
      }         
    });
  });