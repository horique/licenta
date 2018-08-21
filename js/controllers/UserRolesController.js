app.controller('UserRolesController', function($rootScope, $scope, $filter, operationService) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.userRolesHeaders = [
    {
      header: 'Username',
      fieldType: 'selector',
      lov: false // list of values
    },
    {
      header: 'User Role',
      fieldType: 'selector',
      lov: false // list of values
    }
  ];
  $scope.userRolesLabels = ['username', 'role'];
  $scope.userRolesHeaders.columnNames = $filter('toArray')($scope.userRolesHeaders, 'header');

  // fetch foreign key column from user table
  operationService.get('users/fetchUsers').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.userRolesHeaders[0].lov = data.map(function(item) {return item['username']});
    };
  });

  // fetch foreign key column from role table
  operationService.get('roles/fetchRoles').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.userRolesHeaders[1].lov = data.map(function(item) {return item['role']});
    };
  });

  $scope.fetch = function() {
    operationService.get('userRoles/fetchUserRoles').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.userRoles = data;
      };
    })
  };
  $scope.fetch();

  $scope.insert = function(userRoles) {
    operationService.post('userRoles/addUserRole', userRoles).then(function(data) {
      if (data != 1) {
        console.log("Error Insert: " + data);
        $rootScope.$emit("Insert Error", data);
      } else {
        $scope.fetch();
        $rootScope.$emit("Insert Success");
      }
    });
  };

  $scope.delete = function(userRoles) {
    operationService.post('userRoles/deleteUserRole', userRoles).then(function(data) {
      if (data != 1) {
        console.log("Error Delete: " + data);
      } else {
        $scope.fetch();
      }
    });
  }

  $scope.update = function(userRoles) {
    operationService.post('userRoles/updateuserRoles', userRoles).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
