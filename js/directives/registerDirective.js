app.directive('registerDirective', function() {
  return {
    restrict: 'E',
    scope: {
      register: '&'
    },
    templateUrl: 'js/directives/register.html',
    link: function(scope, element, attrs) {
      scope.userModel = {};
      scope.error = {};
    }
  };
});
