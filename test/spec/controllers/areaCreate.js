'use strict';

describe('Controller: AreacreateCtrl', function () {

  // load the controller's module
  beforeEach(module('energiProjektApp'));

  var AreacreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AreacreateCtrl = $controller('AreaCreateCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.buildingExists).toBe(false);
  // });
});
