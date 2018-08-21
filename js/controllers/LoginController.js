app.controller('LoginController', function($scope, $location, authenticationService) {
  $scope.user = {};
  $scope.init = function() {
    // reset login status
    authenticationService.logout();
  };
  $scope.init();

  $scope.login = function() {
    authenticationService.login($scope.user.username, $scope.user.password, function(result) {
      if (result === true) {
        $location.path('/');
        console.log("Login Successful");
      } else {
        $scope.error = true;
        $scope.user = {};
        delete $scope.loginForm;
        console.log("Login Failed");
      };
    });
  };
});
