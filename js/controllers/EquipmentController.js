app.controller('EquipmentController', function($rootScope, $scope, $filter, operationService, $timeout) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.equipmentHeaders = [
    {
      header: 'Equipment Category',
      fieldType: 'selector',
      lov: false // list of values
    },
    {
      header: 'Equipment Name',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'Total',
      fieldType: 'input',
      lov: false // list of values
    }
  ];
  $scope.equipmentLabels = ['category', 'name', 'total'];
  $scope.equipmentHeaders.columnNames = $filter('toArray')($scope.equipmentHeaders, 'header');

  // fetch foreign key column from equipment_category table
  operationService.get('equipmentCategory/fetchEquipmentCategory').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.equipmentHeaders[0].lov = data.map(function(item) {return item['category']});
    };
  });

  $scope.fetch = function() {
    operationService.get('equipment/fetchEquipment').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.equipment = data;
      };
    })
  };
  $scope.fetch();

  $scope.insert = function(equipment) {
    operationService.post('equipment/addEquipment', equipment).then(function(data) {
      if (data != 1) {
        console.log("Error Insert: " + data);
        $rootScope.$emit("Insert Error", data);
      } else {
        $scope.fetch();
        $rootScope.$emit("Insert Success");
      }
    });
  };

  $scope.delete = function(equipment) {
    operationService.post('equipment/deleteEquipment', equipment).then(function(data) {
      if (data != 1) {
        console.log("Error Delete: " + data);
      } else {
        $scope.fetch();
      }
    });
  }

  $scope.update = function(equipment) {
    operationService.post('equipment/updateEquipment', equipment).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
