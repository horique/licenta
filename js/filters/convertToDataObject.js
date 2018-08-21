app.filter('convertToDataObject', function($filter) {
  return function(object) {
    var timestampRegex = /((((19|20)([2468][048]|[13579][26]|0[48])|2000)-02-29|((19|20)[0-9]{2}-(0[4678]|1[02])-(0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}-(0[1359]|11)-(0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}-02-(0[1-9]|1[0-9]|2[0-8])))\s([01][0-9]|2[0-3]):([012345][0-9]):([012345][0-9]))/;
    for (i = 0; i < object.length; i++) {
      angular.forEach(object[i], function(value, key) {
        if (typeof value === "string" && value.match(timestampRegex)) {
          object[i][key] = new Date(value);
        }
      });
    };
    return object;
  }
});
