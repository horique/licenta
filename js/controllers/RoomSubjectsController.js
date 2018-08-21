app.controller('RoomSubjectsController', function($rootScope, $scope, $filter, operationService) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.roomSubjectsHeaders = [
    {
      header: 'Room Name',
      fieldType: 'selector',
      lov: false // list of values
    },
    {
      header: 'Semester',
      fieldType: 'selector',
      lov: [1, 2] // list of values
    },
    {
      header: 'Subject',
      fieldType: 'input',
      lov: false // list of valuess
    }
  ];
  $scope.roomSubjectsLabels = ['name', 'semester', 'subject'];
  $scope.roomSubjectsHeaders.columnNames = $filter('toArray')($scope.roomSubjectsHeaders, 'header');

  // fetch foreign key column from equipment_category table
  operationService.get('room/fetchRoom').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.roomSubjectsHeaders[0].lov = data.map(function(item) {return item['name']});
    };
  })

  $scope.fetch = function() {
    operationService.get('roomSubjects/fetchRoomSubjects').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.roomSubjects = data;
      };
    })
  };
  $scope.fetch();

  $scope.insert = function(roomSubjects) {
    operationService.post('roomSubjects/addRoomSubjects', roomSubjects).then(function(data) {
      if (data != 1) {
        console.log("Error Insert: " + data);
        $rootScope.$emit("Insert Error", data);
      } else {
        $scope.fetch();
        $rootScope.$emit("Insert Success");
      }
    });
  };

  $scope.delete = function(roomSubjects) {
    operationService.post('roomSubjects/deleteRoomSubjects', roomSubjects).then(function(data) {
      if (data != 1) {
        console.log("Error Delete: " + data);
      } else {
        $scope.fetch();
      }
    });
  }

  $scope.update = function(roomSubjects) {
    operationService.post('roomSubjects/updateRoomSubjects', roomSubjects).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
