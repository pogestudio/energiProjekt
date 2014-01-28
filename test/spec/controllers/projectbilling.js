'use strict';

describe('Controller: ProjectbillingCtrl', function () {

  // load the controller's module
  beforeEach(module('energiProjektApp'));

  var ProjectbillingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectbillingCtrl = $controller('ProjectBillingCtrl', {
      $scope: scope
    });
  }));

  /*it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });*/
});
