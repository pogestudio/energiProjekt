'use strict';

describe('Controller: ProcesscreateCtrl', function () {

  // load the controller's module
  beforeEach(module('energiProjektApp'));

  var ProcesscreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProcesscreateCtrl = $controller('ProcessCreateCtrl', {
      $scope: scope
    });
  }));

  /*it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });*/
});
