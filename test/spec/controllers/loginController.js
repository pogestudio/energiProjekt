'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('energiProjektApp'));

  var LogincontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogincontrollerCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('password should be empty', function () {
    expect(scope.password).toEqual('');
  });
});
