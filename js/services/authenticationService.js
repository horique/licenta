app.factory('authenticationService', function($http, $sessionStorage, userService) {
  return {
    login: function(username, password, callback) {
      return $http.post('api/authenticate/login', {username: username, password: password})
      .then(function(response) {
        // login successful if there's a token in the response
        if (response.data.token) {
          // store username and token in local storage to keep user logged in between page refreshes
          $sessionStorage.currentUser = { username: username, roles: response.data.role, token: response.data.token };
          userService.setUser($sessionStorage.currentUser.username);
          userService.setRoles($sessionStorage.currentUser.roles);
          // add jwt token to auth header for all requests made by the $http service
          $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
          // execute callback with true to indicate successful login
          callback(true);
        } else {
          // execute callback with false to indicate failed login
          callback(false);
        }
      },
      function(err){
        console.log('Auth Error!');
        console.log(err);
      })
    },
    logout: function() {
      // remove user from local storage and clear http auth header
      delete $sessionStorage.currentUser;
      $http.defaults.headers.common.Authorization = '';
      userService.setUser(false);
      userService.setRoles(false);
    },
    isAuthorized: function(currentRoles, authorizedRoles) {
      if (authorizedRoles === 'undefined') {
        return false;
      };
      // check if requested route permits navigation for currentRoles
      for (i = 0; i < currentRoles.length; i++) {
        if (authorizedRoles.indexOf(currentRoles[i]) !== -1) {
          return true;
        };
      };
      return false;
    }
  };
});
