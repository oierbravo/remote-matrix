'use strict';

describe('Controller: MatrixCtrl', function () {

  // load the controller's module
  beforeEach(module('remoteMatrixApp'));

  var MatrixCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MatrixCtrl = $controller('MatrixCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MatrixCtrl.awesomeThings.length).toBe(3);
  });
});
