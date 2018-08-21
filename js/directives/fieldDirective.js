app.directive('fieldDirective', function() {
  return {
    restrict: 'E',
    scope: {
      fieldType: '@',
      item: '=',
      label: '@',
      lov: '=', // list of values
      form: '='
    },
    templateUrl: 'js/directives/fieldDirective.html'
  };
});
