app.filter('convertToReadable', function($filter) {
  return function(str) {
    if (str) {
      var pos = str.indexOf('_');
      return $filter('capitalize')(str.replace(/_./, ' ' + str.charAt(pos + 1).toUpperCase()));
    };
    return str;
  }
});
