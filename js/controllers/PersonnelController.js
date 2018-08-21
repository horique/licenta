app.controller('PersonnelController', function($rootScope, $scope, $filter, operationService) {
  // sets table column header name and column field type, and provides a list of values if type is selector
  $scope.personnelHeaders = [
    {
      header: 'Personnel Category',
      fieldType: 'selector',
      lov: false // list of values
    },
    {
      header: 'C.N.P.',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'Surname',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'Firstname',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'E-mail',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'Telephone',
      fieldType: 'input',
      lov: false // list of values
    },
    {
      header: 'Job',
      fieldType: 'input',
      lov: false // list of values
    },
  ];
  $scope.personnelLabels = ['category', 'cnp', 'surname', 'firstname', 'email', 'telephone', 'job'];
  $scope.personnelHeaders.columnNames = $filter('toArray')($scope.personnelHeaders, 'header');

  // fetch foreign key column from personnel_category table
  operationService.get('personnelCategory/fetchPersonnelCategory').then(function(data) {
    if (typeof data === 'string') {
      console.log("Error Fetch: " + data);
    } else {
      $scope.personnelHeaders[0].lov = data.map(function(item) {return item['category']});
    };
  });

  $scope.fetch = function() {
    operationService.get('personnel/fetchPersonnel').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.personnel = data;
      };
    })
  };
  $scope.fetch();

  $scope.insert = function(personnel) {
    operationService.post('personnel/addPersonnel', personnel).then(function(data) {
      if (data != 1) {
        console.log("Error Insert: " + data);
        $rootScope.$emit("Insert Error", data);
      } else {
        $scope.fetch();
        $rootScope.$emit("Insert Success");
      }
    });
  };

  $scope.delete = function(personnel) {
    operationService.post('personnel/deletePersonnel', personnel).then(function(data) {
      if (data != 1) {
        console.log("Error Delete: " + data);
      } else {
        $scope.fetch();
      }
    });
  }

  $scope.update = function(personnel) {
    operationService.post('personnel/updatePersonnel', personnel).then(function(data) {
      if (data != 1) {
        console.log("Error Update: " + data);
        $rootScope.$emit("Update Error", data);
      } else {
        $scope.fetch();
      }
    });
  }
});
