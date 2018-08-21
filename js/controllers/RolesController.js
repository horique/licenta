app.controller('RolesController', function($rootScope, $scope, $filter, operationService) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.rolesHeaders = [
    {
      header: 'Role',
      fieldType: 'input',
      lov: false // list of values
    }
  ];
  $scope.rolesLabels = ['role'];
  $scope.rolesHeaders.columnNames = $filter('toArray')($scope.rolesHeaders, 'header');

  $scope.fetch = function() {
    operationService.get('roles/fetchRoles').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.roles = data;
      };
    })
  };
  $scope.fetch();

  $scope.insert = function(roles) {
    operationService.post('roles/addRoles', roles).then(function(data) {
      if (data != 1) {
        console.log("Error Insert: " + data);
        $rootScope.$emit("Insert Error", data);
      } else {
        $scope.fetch();
        $rootScope.$emit("Insert Success");
      }
    });
  };

  $scope.delete = function(roles) {
    operationService.post('roles/deleteRoles', roles).then(function(data) {
      if (data != 1) {
        console.log("Error Delete: " + data);
      } else {
        $scope.fetch();
      }
    });
  }

  $scope.update = function(roles) {
    operationService.post('roles/updateRoles', roles).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
