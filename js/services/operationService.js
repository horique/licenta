app.factory('operationService', function($http) {
  return {
    post: function(url, info) {
      return $http.post('api/' + url, info)
      .then(function(data) {
        console.log(url + ' Success!');
        return data.data;
      },
      function(err){
        console.log(url + ' Error!');
        console.log(err);
      })
    },
    get: function(url) {
      return $http.get('api/' + url)
      .then(function(data) {
        console.log(url + ' Success!');
        return data.data;
      },
      function(err){
        console.log(url + ' Error!');
        console.log(err);
      })
    }
  }
});
