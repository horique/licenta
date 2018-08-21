app.controller('RoomTypeController', function($rootScope, $scope, $filter, operationService) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.roomTypeHeaders = [
    {
      header: 'Room Type',
      fieldType: 'input',
      lov: false // list of values
    }
  ];
  $scope.roomTypeLabels = ['type'];
  $scope.roomTypeHeaders.columnNames = $filter('toArray')($scope.roomTypeHeaders, 'header');

  $scope.fetch = function() {
    operationService.get('roomType/fetchRoomType').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.roomType = data;
      };
    })
  };
  $scope.fetch();

  $scope.insert = function(roomType) {
    operationService.post('roomType/addRoomType', roomType).then(function(data) {
      if (data != 1) {
        console.log("Error Insert: " + data);
        $rootScope.$emit("Insert Error", data);
      } else {
        $scope.fetch();
        $rootScope.$emit("Insert Success");
      }
    });
  };

  $scope.delete = function(roomType) {
    operationService.post('roomType/deleteRoomType', roomType).then(function(data) {
      if (data != 1) {
        console.log("Error Delete: " + data);
      } else {
        $scope.fetch();
      }
    });
  }

  $scope.update = function(roomType) {
    operationService.post('roomType/updateRoomType', roomType).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
