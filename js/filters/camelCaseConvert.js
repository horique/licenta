app.filter('camelCaseConvert', function() {
  return function(str) {
    if (str && str.includes('_')) {
      var pos = str.indexOf('_');
      return str.replace(/_./g, str.charAt(pos + 1).toUpperCase());
    };
    return str;
  }
});
