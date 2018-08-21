app.directive('filterArrayDirective', function() {
  return {
    restrict: 'E',
    scope: {
      action: '@',
      filterData: '=',
      columnLabels: '=',
      columns: '=',
      order: '@',
      content: '@'
    },
    templateUrl: 'js/directives/filterArray.html'
  };
});
