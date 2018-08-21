app.directive('tableDirective', function($rootScope) {
  return {
    restrict: 'E',
    scope: {
      headers: '=',
      labels: '=',
      info: '=',
      insert: '&',
      update: '&',
      delete: '&'
    },
    templateUrl: 'js/directives/tableDirective.html',
    link: function(scope, element, attrs) {
      scope.dataToAdd = {};
      scope.filterData = {};
      if ('delete' in attrs) {
        scope.deleteBtn = 1;
      };
      if ('update' in attrs) {
        scope.updateBtn = 1;
      };
      if ('insert' in attrs) {
        scope.insertBtn = 1;
      };
      // on click on table headers changes the sorting order on clicked column to ascending or descending
      scope.changeOrder = function(clickedColumn) {
        scope.reverse = scope.sortBy === clickedColumn? !scope.reverse  : false;
        scope.sortBy = clickedColumn;
      }
      // catch insert success/ error events sent on the rootScope from parent controller
      scope.insertSuccessEvent =  $rootScope.$on('Insert Success', function() {
        scope.dataToAdd = {};
      });
      scope.insertErrorEvent = $rootScope.$on('Insert Error', function(event, data) {
        console.log("Error Insert: " + data);
      });
      // catch update error event sent on the rootScope from parent controller
      scope.updateErrorEvent = $rootScope.$on('Update Error', function(event, data) {
        console.log("Error Update: " + data);
      });

      // on page change destroys rootScope events
      scope.$on('$destroy', function() {
        scope.insertSuccessEvent();
        scope.insertErrorEvent();
        scope.updateErrorEvent();
        console.log('Unsubscribing events');
      });
    }
  };
});
