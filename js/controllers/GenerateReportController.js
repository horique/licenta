app.controller('GenerateReportController', function($scope, $window, $timeout, $filter, operationService) {
  $scope.tableList = [
    {
      tableName: 'equipment',
      label: 'Equipment',
      pathToApi: 'equipment/fetchEquipment',
      tableColumns:  ['id', 'category', 'name', 'total', 'created_at', 'updated_at'],
      columnLabels:  ['Id', 'Category', 'Name', 'Total', 'Created At', 'Updated At']
    },
    {
      tableName: 'equipment_category',
      label: 'Equipment Category',
      pathToApi: 'equipmentCategory/fetchEquipmentCategory',
      tableColumns:  ['id', 'category', 'created_at', 'updated_at'],
      columnLabels:  ['Id', 'Category', 'Created At', 'Updated At']
    },
    {
      tableName: 'personnel',
      label: 'Personnel',
      pathToApi: 'personnel/fetchPersonnel',
      tableColumns: ['id', 'category', 'cnp', 'full_name', 'surname', 'firstname', 'email', 'telephone', 'job', 'created_at', 'updated_at'],
      columnLabels: ['Id', 'Category', 'C.N.P.', 'Full Name', 'Surname', 'Firstname', 'E-mail', 'Telephone', 'Job', 'Created At', 'Updated At']
    },
    {
      tableName: 'personnel_category',
      label: 'Personnel Category',
      pathToApi: 'personnelCategory/fetchPersonnelCategory',
      tableColumns: ['id', 'category', 'created_at', 'updated_at'],
      columnLabels: ['Id', 'Category', 'Created At', 'Updated At']
    },
    {
      tableName: 'room',
      label: 'Room',
      pathToApi: 'room/fetchRoom',
      tableColumns: ['id', 'type', 'responsible1', 'responsible2', 'name', 'capacity', 'created_at', 'updated_at'],
      columnLabels: ['Id', 'Type', 'Responsible Sem. 1', 'Responsible Sem. 2', 'Name', 'Capacity', 'Created At', 'Updated At']
    },
    {
      tableName: 'room_equipments',
      label: 'Room Equipments',
      pathToApi: 'roomEquipments/fetchRoomEquipments',
      tableColumns: ['id', 'room_name', 'equipment_name', 'owner_name', 'current_status', 'created_at', 'updated_at'],
      columnLabels: ['Id', 'Room Name', 'Equipment Name', 'Owner', 'Current Status', 'Created At', 'Updated At']
    },
    {
      tableName: 'room_subjects',
      label: 'Room Subjects',
      pathToApi: 'roomSubjects/fetchRoomSubjects',
      tableColumns: ['id', 'name', 'semester', 'subject', 'created_at', 'updated_at'],
      columnLabels: ['Id', 'Name', 'Semester', 'Subject', 'Created At', 'Updated At']
    },
    {
      tableName: 'room_type',
      label: 'Room Type',
      pathToApi: 'roomType/fetchRoomType',
      tableColumns: ['id', 'type', 'created_at', 'updated_at'],
      columnLabels: ['Id', 'Type', 'Created At', 'Updated At']
    },
    {
      tableName: 'status_log',
      label: 'Status Log',
      pathToApi: 'statusLog/fetchStatusLog',
      tableColumns: ['id', 'room_equipments_id', 'responsible', 'status', 'message', 'date_added', 'created_at', 'updated_at'],
      columnLabels: ['Id', 'Equipment Unit Id', 'Responsible', 'Status', 'Message', 'Date Added', 'Created At', 'Updated At']
    }
  ]
  $scope.model = {};
  $scope.report = {};

  $scope.applyFilter = function() {
    $scope.multipleFilter = {};
    if ($scope.filterData && !angular.equals({}, $scope.filterData)) {
      for (i = 0; i < $scope.filterData.filterList.length; i++) {
        $scope.multipleFilter[$scope.filterData.filterList[i].tableColumnName] = $scope.filterData.filterList[i].content;
      };
    };
  };

  $scope.checkValue = function(value) {
    var pos = $scope.model.columnList.indexOf(value);
    if(pos !== -1) {
      $scope.model.columnList.splice(pos, 1);
    } else {
      $scope.model.columnList.push(value);
    }
  };

  $scope.fetchTable = function(pathToApi) {
    operationService.get(pathToApi).then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.report.data = data;
      };
    })
  };

  // opens the html-to-pdf page in new window
  $scope.viewPDF = function() {
    var element = {};
    $scope.applyFilter();
    $timeout( function() {
      element.html = $('#tobeexported').html();
      var pdfPreview = $window.open("", "PDF Preview");
      pdfPreview.document.write('<html><head><title>PDF Preview</title><link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.css"></head><body>');
      pdfPreview.document.write(element.html);
    }, 1000 );
  };

  // calls pdfShift api to generate pdf and saves it locally, and adds path-to-pdf to reports table
  $scope.generatePDF = function() {
    $scope.loading = 'Creating PDF...';
    $scope.date_created = new Date();
    $timeout( function(){
      var element = {};
      element.html = $('#tobeexported').html();
      element.date = $filter('date')($scope.date_created, 'yyyy-MM-dd_HH-mm');
      element.table_name = $scope.model.tableName;
      element.file_name = $scope.model.tableName + '_' + element.date + '.pdf';
      operationService.post('report/generatePDF', element).then(function(data) {
        if (data != 1) {
          console.log("Error Insert: " + data);
        } else {
          console.log("PDF generated successfuly");
          $scope.loading = false;
        }
      });
    }, 1000 );
  }
});
