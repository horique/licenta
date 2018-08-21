app.controller('DisplayReportsController', function($scope, $window, $sce, operationService) {
  $scope.reportHeaders = ['Date Created', 'Table Name', 'PDF Name'];
  $scope.reportColumns = ['created_at', 'table_name', 'file_name'];

  $scope.fetchReports = function() {
    operationService.get('report/fetchReports').then(function(data) {
      if (typeof data === 'string') {
        console.log("Error Fetch: " + data);
      } else {
        $scope.reports = data;
      };
    })
  };
  $scope.fetchReports();

  $scope.viewPDF = function(index) {
    $window.open('storage/' + $scope.reports[index].file_name, '_blank');
    $window.focus();
  };

  $scope.deletePDF = function(index) {
    if (confirm('Are you sure you want to delete the pdf?')) {
      operationService.post('report/deletePDF', $scope.reports[index]).then(function(data) {
        if (data != 1) {
          console.log("Error Delete: " + data);
        } else {
          $scope.fetchReports();
        }
      });
    }
  };

  $scope.changeOrder = function(clickedColumn) {
    $scope.reverse = $scope.sortBy === clickedColumn? !$scope.reverse  : false;
    $scope.sortBy = clickedColumn;
  }
});
