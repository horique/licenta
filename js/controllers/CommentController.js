app.controller('CommentController', function($scope, $filter, operationService, userService) {
  $scope.pageActive = 'views/commentAdd.html';
  $scope.commentHeaders = [
    {
      columnName: 'room_name',
      label: 'Room Name',
      lov: false
    },
    {
      columnName: 'equipment_name',
      label: 'Equipment Name',
      lov: false
    },
    {
      columnName: 'equipment_unit_id',
      label: 'Equipment Unit Id',
      lov: false
    },
    {
      columnName: 'responsible',
      label: 'Responsible',
      lov: false
    },
    {
      columnName: 'status',
      label: 'Status',
      lov: false
    },
    {
      columnName: 'date_added',
      label: 'Date Added',
      lov: false
    },
    {
      columnName: 'added_by',
      label: 'Added By',
      lov: false
    },
    {
      columnName: 'message',
      label: 'Messasge',
      lov: false
    }
  ]
  $scope.commentModel = {};

  // fetch room names
  operationService.get('room/fetchRoom').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.commentHeaders[0].lov = data.map(function(item) {return item['name']});
    };
  });
  // fetch personnel names+cnp
  operationService.get('personnel/fetchPersonnel').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.commentHeaders[3].lov = data.map(function(item) {return item['full_name']+'-'+item['cnp']});
    };
  });

  $scope.fetchCommentList = function() {
    operationService.post('comment/fetchCommentList').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.commentList = data;
        for (i = 0; i < $scope.commentList.length; i++) {
          $scope.commentList[i].date_added = Date.parse($scope.commentList[i].date_added);
        };
        $scope.columnLabels = $filter('toArray')($scope.commentHeaders, 'label');
        $scope.columnNames = $filter('toArray')($scope.commentHeaders, 'columnName');
      }
    });
  };

  $scope.lookUp = function(lookUpBy, commentModel) {
    operationService.post('comment/lookUP' + $scope.commentHeaders[lookUpBy].columnName, commentModel).then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.commentHeaders[lookUpBy].lov = data.map(function(item) {return item[$scope.commentHeaders[lookUpBy].columnName]});
        delete $scope.commentModel.equipment_unit_id;
      };
    })
  };

  $scope.addComment = function(commentModel) {
    commentModel.added_by = userService.getUser();
    operationService.post('comment/addComment', commentModel).then(function(data) {
      if (data != 1) {
        console.log("Error add message: " + data);
      } else {
        console.log("Success add message");
        $scope.commentModel = {};
      }
    });
  };
});
