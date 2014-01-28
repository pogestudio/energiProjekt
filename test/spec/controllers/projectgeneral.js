'use strict';

describe('Controller: ProjectgeneralCtrl', function () {

  // load the controller's module
  beforeEach(module('energiProjektApp'));

  var ProjectgeneralCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectgeneralCtrl = $controller('ProjectGeneralCtrl', {
      $scope: scope
    });
  }));

  /*it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });*/
});
