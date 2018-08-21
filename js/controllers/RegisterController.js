app.controller('RegisterController', function($scope, $location, operationService, authenticationService) {
  $scope.user = {};
  $scope.init = function() {
    // reset login status
    authenticationService.logout();
  };
  $scope.init();

  $scope.register = function(user, form, error) {
    operationService.post('authenticate/register', user).then(function(data) {
      if (data != 1) {
        console.log("Error register: " + data);
        error.value = true;
        delete user.password;
      } else {
        $location.path('/login');
      }
    })
  };
});
