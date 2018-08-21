app.controller('HomeController', function($scope, $http, $sessionStorage) {
  console.log($sessionStorage.currentUser.username);
  console.log($sessionStorage.currentUser.roles);
});
