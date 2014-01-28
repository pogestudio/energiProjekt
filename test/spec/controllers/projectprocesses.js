'use strict';

describe('Controller: ProjectsuppprocessessCtrl', function () {

  // load the controller's module
  beforeEach(module('energiProjektApp'));

  var ProjectsuppprocessessCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectsuppprocessessCtrl = $controller('ProjectProcessessCtrl', {
      $scope: scope
    });
  }));

  /*it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });*/
});
