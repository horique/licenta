app.controller('EquipmentCategoryController', function($rootScope, $scope, $filter, operationService) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.equipmentCategoryHeaders = [
    {
      header: 'Equipment Category',
      fieldType: 'input',
      lov: false // list of values
    }
  ];
  $scope.equipmentCategoryLabels = ['category'];
  $scope.equipmentCategoryHeaders.columnNames = $filter('toArray')($scope.equipmentCategoryHeaders, 'header');

  $scope.fetch = function() {
    operationService.get('equipmentCategory/fetchEquipmentCategory').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.equipmentCategory = data;
      };
    })
  };
  $scope.fetch();

  $scope.insert = function(equipmentCategory) {
    operationService.post('equipmentCategory/addEquipmentCategory', equipmentCategory).then(function(data) {
      if (data != 1) {
        console.log("Error Insert: " + data);
        $rootScope.$emit("Insert Error", data);
      } else {
        $scope.fetch();
        $rootScope.$emit("Insert Success");
      }
    });
  };

  $scope.delete = function(equipmentCategory) {
    operationService.post('equipmentCategory/deleteEquipmentCategory', equipmentCategory).then(function(data) {
      if (data != 1) {
        console.log("Error Delete: " + data);
      } else {
        $scope.fetch();
      }
    });
  }

  $scope.update = function(equipmentCategory) {
    operationService.post('equipmentCategory/updateEquipmentCategory', equipmentCategory).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
