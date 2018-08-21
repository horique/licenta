app.controller('RoomEquipmentsController', function($rootScope, $scope, $filter, operationService) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.roomEquipmentsHeaders = [
    {
      header: 'Room Name',
      fieldType: 'selector',
      lov: false // list of values
    },
    {
      header: 'Equipment Name',
      fieldType: 'selector',
      lov: false // list of values
    },
    {
      header: 'Owner',
      fieldType: 'selector',
      lov: false // list of values
    },
    {
      header: 'Current Status',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'ID Unit',
      fieldType: 'auto',
      lov: false // list of values
    },
  ];
  $scope.roomEquipmentsLabels = ['room_name', 'equipment_name', 'owner_name', `current_status`, 'id'];
  $scope.roomEquipmentsHeaders.columnNames = $filter('toArray')($scope.roomEquipmentsHeaders, 'header');

  // fetch foreign key column from room table
  operationService.get('room/fetchRoom').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.roomEquipmentsHeaders[0].lov = data.map(function(item) {return item['name']});
    };
  })
  // fetch foreign key column from equipment table
  operationService.get('equipment/fetchEquipment').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.roomEquipmentsHeaders[1].lov = data.map(function(item) {return item['name']});
    };
  })
  // fetch foreign key column from personnel table
  operationService.get('personnel/fetchPersonnel').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.roomEquipmentsHeaders[2].lov = data.map(function(item) {return item['full_name'] + '-' + item['cnp']});
    };
  })

  $scope.fetch = function() {
    operationService.get('roomEquipments/fetchRoomEquipments').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.roomEquipments = data;
      };
    })
  };
  $scope.fetch();

  $scope.insert = function(roomEquipments) {
    operationService.post('roomEquipments/addRoomEquipments', roomEquipments).then(function(data) {
      if (data != 1) {
        console.log("Error Insert: " + data);
        $rootScope.$emit("Insert Error", data);
      } else {
        $scope.fetch();
        $rootScope.$emit("Insert Success");
      }
    });
  };

  $scope.delete = function(roomEquipments) {
    operationService.post('roomEquipments/deleteRoomEquipments', roomEquipments).then(function(data) {
      if (data != 1) {
        console.log("Error Delete: " + data);
      } else {
        $scope.fetch();
      }
    });
  }

  $scope.update = function(roomEquipments) {
    operationService.post('roomEquipments/updateRoomEquipments', roomEquipments).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
