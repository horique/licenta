var app = angular.module('appLicenta', ['ngRoute', 'ngStorage']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeController',
        templateUrl: 'views/home.html',
      authorizedRoles: ['administrator', 'report_supervisor', 'personnel']
    })
    .when('/register', {
      controller: 'RegisterController',
      templateUrl: 'views/register.html'
    })
    .when('/login', {
      controller: 'LoginController',
      templateUrl: 'views/login.html'
    })
    .when('/account_options', {
      controller: 'AccountOptionsController',
      templateUrl: 'views/accountOptions.html',
      authorizedRoles: ['administrator', 'report_supervisor', 'personnel']
    })
    .when('/comment_section', {
      controller: 'CommentController',
      templateUrl: 'views/commentSection.html',
      authorizedRoles: ['administrator', 'report_supervisor', 'personnel']
    })
    .when('/generate_report', {
      controller: 'GenerateReportController',
      templateUrl: 'views/generateReport.html',
      authorizedRoles: ['administrator', 'report_supervisor']
    })
    .when('/display_reports', {
      controller: 'DisplayReportsController',
      templateUrl: 'views/displayReports.html',
      authorizedRoles: ['administrator', 'personnel']
    })
    .when('/equipment_category', {
      controller: 'EquipmentCategoryController',
      templateUrl: 'views/equipmentCategory.html',
      authorizedRoles: ['administrator']
    })
    .when('/equipment', {
      controller: 'EquipmentController',
      templateUrl: 'views/equipment.html',
      authorizedRoles: ['administrator']
    })
    .when('/room_type', {
      controller: 'RoomTypeController',
      templateUrl: 'views/roomType.html',
      authorizedRoles: ['administrator']
    })
    .when('/room', {
      controller: 'RoomController',
      templateUrl: 'views/room.html',
      authorizedRoles: ['administrator']
    })
    .when('/room_subjects', {
      controller: 'RoomSubjectsController',
      templateUrl: 'views/roomSubjects.html',
      authorizedRoles: ['administrator']
    })
    .when('/room_equipments', {
      controller: 'RoomEquipmentsController',
      templateUrl: 'views/roomEquipments.html',
      authorizedRoles: ['administrator']
    })
    .when('/status_log', {
      controller: 'StatusLogController',
      templateUrl: 'views/statusLog.html',
      authorizedRoles: ['administrator']
    })
    .when('/personnel_category', {
      controller: 'PersonnelCategoryController',
      templateUrl: 'views/personnelCategory.html',
      authorizedRoles: ['administrator']
    })
    .when('/personnel', {
      controller: 'PersonnelController',
      templateUrl: 'views/personnel.html',
      authorizedRoles: ['administrator']
    })
    .when('/users', {
      controller: 'UsersController',
      templateUrl: 'views/users.html',
      authorizedRoles: ['administrator']
    })
    .when('/user_roles', {
      controller: 'UserRolesController',
      templateUrl: 'views/userRoles.html',
      authorizedRoles: ['administrator']
    })
    .when('/roles', {
      controller: 'RolesController',
      templateUrl: 'views/roles.html',
      authorizedRoles: ['administrator']
    })
    .otherwise({
      redirectTo: '/'
    })
});

app.config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
  $provide.factory('unauthorisedInterceptor', ['$q', function ($q) {
    return {
      'responseError': function (rejection) {
      if (rejection.status === 401 || rejection.status === 400) {
        window.location.href = '/licenta/#!/login';
      }
      return $q.reject(rejection);
      }
    };
  }]);
  $httpProvider.interceptors.push('unauthorisedInterceptor');
}]);

app.run(function($rootScope, $http, $location, $route, $sessionStorage, authenticationService, userService) {
    // keep user logged in after page refresh
    userService.initUser();
    if ($sessionStorage.currentUser) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.currentUser.token;
      userService.setUser($sessionStorage.currentUser.username);
      userService.setRoles($sessionStorage.currentUser.roles);
    } else {
      userService.setUser(false);
      userService.setRoles(false);
    }

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      if (!$sessionStorage.currentUser) {
        if (next.hasOwnProperty('$$route') && next.$$route.hasOwnProperty('authorizedRoles')) {
          $location.path('/login');
        };
      }
      // redirect to login if logged in but don't have authorized user and trying to access a restricted page
      else {
        if (next.hasOwnProperty('$$route') && next.$$route.hasOwnProperty('authorizedRoles') && !authenticationService.isAuthorized($sessionStorage.currentUser.roles, next.authorizedRoles)) {
          $location.path('/login');
        }
      };
    });
});
