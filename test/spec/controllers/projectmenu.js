'use strict';

describe('Controller: ProjectmenuCtrl', function () {

  // load the controller's module
  beforeEach(module('energiProjektApp'));

  var ProjectmenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectmenuCtrl = $controller('ProjectMenuCtrl', {
      $scope: scope
    });
  }));

  /*it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });*/
});
