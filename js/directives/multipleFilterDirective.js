app.directive('multipleFilterDirective', function() {
  return {
    restrict: 'E',
    scope: {
      filterData: '=',
      columns: '=',
      columnLabels: '='
    },
    templateUrl: 'js/directives/multipleFilter.html',
    link: function(scope, element, attrs) {
      // reset the array andcopy the columns from parent so changes won't be reflected
      var init = function() {
        scope.filterData.filterList = [];
        scope.lov = angular.copy(scope.columns);
        scope.labels = angular.copy(scope.columnLabels);
      };
      init();

      scope.addFilter = function() {
        var index = scope.lov.indexOf(scope.filterData.column);
        scope.filterData.filterList.push({'column': scope.labels[index], 'tableColumnName': scope.filterData.column, 'content': scope.filterData.content});
        scope.lov[index] = null;
        scope.labels[index] = null;
        delete scope.filterData.column;
        delete scope.filterData.content;
      };

      scope.removeFilter = function(repeatIndex, value) {
        var valIndex = scope.columnLabels.indexOf(value);
        scope.lov[valIndex] = scope.columns[valIndex];
        scope.labels[valIndex] = value;
        scope.filterData.filterList.splice(repeatIndex, 1);
      };
    }
  };
});
