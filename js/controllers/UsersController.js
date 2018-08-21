app.controller('UsersController', function($rootScope, $scope, $filter, operationService) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.usersHeaders = [
    {
      header: 'Username',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'Last Name',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'First Name',
      fieldType: 'input',
      lov: false // list of values
    }
  ];
  $scope.usersLabels = ['username', 'surname', 'firstname'];
  $scope.usersHeaders.columnNames = $filter('toArray')($scope.usersHeaders, 'header');

  $scope.fetch = function() {
    operationService.get('users/fetchUsers').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.users = data;
      };
    })
  };
  $scope.fetch();

  $scope.register = function(user, form, error) {
    operationService.post('authenticate/register', user).then(function(data) {
      if (data != 1) {
        console.log("Error register: " + data);
        error.value = true;
        delete user.password;
      } else {
        angular.forEach(user, function(value, property) {
          delete user[property];
        });
        form.$setPristine();
        $scope.fetch();
        error.value = false;
      }
    })
  };

  $scope.delete = function(users) {
    if(confirm('Are you sure you want to delete selected account?')) {
      operationService.post('userManage/deleteUser', users).then(function(data) {
        if (data != 1) {
          console.log("Error Delete: " + data);
        } else {
          $scope.fetch();
        }
      });
    }
  };

  $scope.update = function(users) {
    operationService.post('users/updateUser', users).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
