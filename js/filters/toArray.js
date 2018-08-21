app.filter('toArray', function() {
  return function (object, property) {
      return object.map(function (item) {return item[property];});
  };
});
