app.controller('StatusLogController', function($rootScope, $scope, $filter, $sessionStorage, operationService) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.statusLogHeaders = [
    {
      header: 'ID Unit',
      fieldType: 'selector',
      lov: false // list of values
    },
    {
      header: 'Responsible',
      fieldType: 'selector',
      lov: false // list of values
    },
    {
      header: 'Status',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'Message',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'Date Added',
      fieldType: 'date',
      lov: false // list of values
    },
    {
      header: 'Added By',
      fieldType: 'auto',
      lov: false // list of values
    }
  ];
  $scope.statusLogLabels = ['room_equipments_id', 'responsible', 'status', 'message', 'date_added', 'added_by'];
  $scope.statusLogHeaders.columnNames = $filter('toArray')($scope.statusLogHeaders, 'header');

  // fetch foreign key column from personnel table
  operationService.get('personnel/fetchPersonnel').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.statusLogHeaders[1].lov = data.map(function(item) {return item['full_name'] + '-' + item['cnp']});
    };
  })
  // fetch foreign key column from room_equipments table
  operationService.get('roomEquipments/fetchRoomEquipments').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.statusLogHeaders[0].lov = data.map(function(item) {return item['id']});
    };
  })

  $scope.fetch = function() {
    operationService.get('statusLog/fetchStatusLog').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.statusLog = $filter('convertToDataObject')(data);
      };
    })
  };
  $scope.fetch();

  $scope.insert = function(statusLog) {
    statusLog.user = $sessionStorage.currentUser.username;
    operationService.post('statusLog/addStatusLog', statusLog).then(function(data) {
      if (data != 1) {
        console.log("Error Insert: " + data);
        $rootScope.$emit("Insert Error", data);
      } else {
        $scope.fetch();
        $rootScope.$emit("Insert Success");
      }
    });
  };

  $scope.delete = function(statusLog) {
    operationService.post('statusLog/deleteStatusLog', statusLog).then(function(data) {
      if (data != 1) {
        console.log("Error Delete: " + data);
      } else {
        $scope.fetch();
      }
    });
  }

  $scope.update = function(statusLog) {
    operationService.post('statusLog/updateStatusLog', statusLog).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
