app.controller('RoomController', function($rootScope, $scope, $filter, operationService) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.roomHeaders = [
    {
      header: 'Room Type',
      fieldType: 'selector',
      lov: false // list of values
    },
    {
      header: 'Name',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'Capacity',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'Responsible sem. 1',
      fieldType: 'selector',
      lov: false // list of values
    },
    {
      header: 'Responsible sem. 2',
      fieldType: 'selector',
      lov: false // list of values
    }
  ];
  $scope.roomLabels = ['type', 'name', 'capacity', 'responsible1', 'responsible2'];
  $scope.roomHeaders.columnNames = $filter('toArray')($scope.roomHeaders, 'header');

  // fetch foreign key column from personnel table
  operationService.get('personnel/fetchPersonnel').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.roomHeaders[3].lov = data.map(function(item) {return item['full_name']+'-'+item['cnp']});
      $scope.roomHeaders[4].lov = data.map(function(item) {return item['full_name']+'-'+item['cnp']});
    };
  });
  // fetch foreign key column from room_type table
  operationService.get('roomType/fetchRoomType').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.roomHeaders[0].lov = data.map(function(item) {return item['type']});
    };
  })

  $scope.fetch = function() {
    operationService.get('room/fetchRoom').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.room = data;
      };
    })
  };
  $scope.fetch();

  $scope.insert = function(room) {
    operationService.post('room/addRoom', room).then(function(data) {
      if (data != 1) {
        console.log("Error Insert: " + data);
        $rootScope.$emit("Insert Error", data);
      } else {
        $scope.fetch();
        $rootScope.$emit("Insert Success");
      }
    });
  };

  $scope.delete = function(room) {
    operationService.post('room/deleteRoom', room).then(function(data) {
      if (data != 1) {
        console.log("Error Delete: " + data);
      } else {
        $scope.fetch();
      }
    });
  }

  $scope.update = function(room) {
    operationService.post('room/updateRoom', room).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
