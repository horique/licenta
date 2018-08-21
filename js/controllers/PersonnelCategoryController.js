app.controller('PersonnelCategoryController', function($rootScope, $scope, $filter, operationService) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.personnelCategoryHeaders = [
    {
      header: 'Personnel Category',
      fieldType: 'input',
      lov: false // list of values
    }
  ];
  $scope.personnelCategoryLabels = ['category'];
  $scope.personnelCategoryHeaders.columnNames = $filter('toArray')($scope.personnelCategoryHeaders, 'header');

  $scope.fetch = function() {
    operationService.get('personnelCategory/fetchPersonnelCategory').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.personnelCategory = data;
      };
    })
  };
  $scope.fetch();

  $scope.insert = function(personnelCategory) {
    operationService.post('personnelCategory/addPersonnelCategory', personnelCategory).then(function(data) {
      if (data != 1) {
        console.log("Error Insert: " + data);
        $rootScope.$emit("Insert Error", data);
      } else {
        $scope.fetch();
        $rootScope.$emit("Insert Success");
      }
    });
  };

  $scope.delete = function(personnelCategory) {
    operationService.post('personnelCategory/deletePersonnelCategory', personnelCategory).then(function(data) {
      if (data != 1) {
        console.log("Error Delete: " + data);
      } else {
        $scope.fetch();
      }
    });
  }

  $scope.update = function(personnelCategory) {
    operationService.post('personnelCategory/updatePersonnelCategory', personnelCategory).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
