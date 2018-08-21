app.factory('userService', function($sessionStorage, $rootScope) {
  var userService = {};
  userService.initUser = function() {
    $rootScope.currentUser = {};
  };
  userService.getUser = function() {
    return $rootScope.currentUser.username;
  };
  userService.setUser = function(username) {
    $rootScope.currentUser.username = username;
  };
  userService.getRoles = function() {
    return $rootScope.currentUser.roles;
  };
  userService.setRoles = function(roles) {
    $rootScope.currentUser.roles = roles;
  };
  userService.updateUser = function(username) {
    $rootScope.currentUser.username = username;
    $sessionStorage.currentUser.username = username;
  };
  return userService;
});
