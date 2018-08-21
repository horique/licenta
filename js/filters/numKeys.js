app.filter('numkeys', function() {
  return function(object) {
    var count = 0;
    angular.forEach(object, function (value, key) {
      if ((typeof value !== 'undefined') && (value !== false)) {
          count++;
      }
    });
    return count;
  }
});
