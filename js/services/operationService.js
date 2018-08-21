app.factory('operationService', function($http) {
  return {
    post: function(url, info) {
      return $http.post('/licenta/api/' + url, info)
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
      return $http.get('/licenta/api/' + url)
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
