app.controller('AccountOptionsController', function($scope, $location, $window, operationService, userService) {
  $scope.fetch = function() {
    var currentUser = {};
    currentUser.username = userService.getUser();
    operationService.post('userManage/fetchUser', currentUser).then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.user = data[0];
      };
    })
  };
  $scope.fetch();

  $scope.update = function(user) {
    user.oldUser = userService.getUser();
    operationService.post('userManage/updateUser', user).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $scope.error = true;
        $scope.success = false;
        delete $scope.user.password;
        delete $scope.user.confirmPassword;
      } else {
        $scope.error = false;
        $scope.success = true;
        userService.updateUser($scope.user.username);
        delete $scope.updateForm;
        $scope.fetch();
      }
    });
  }

  $scope.delete = function(user) {
    if (confirm('Are you sure you want to delete your account?')) {
      operationService.post('userManage/deleteUser', user).then(function(data) {
        if (data != 1) {
          console.log("Error Delete: " + data);
        } else {
          $location.path('/login');
        }
      });
    };
  }
});
