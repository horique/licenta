<!doctype html>
<html>
  <head>
    <base href="/">
    <!-- Include the core AngularJS library -->
    <script src="js/shared/angular.js"></script>
    <!-- Include the AngularJS libraries -->
    <script src="js/shared/angular-route.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.6/ngStorage.min.js"></script>
    <!--  Bootstrap 4 -->
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <!--  CSS -->
    <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  <body ng-app="appLicenta">
    <div class="main-container" ng-controller="MainController">
      <div ng-include="'views/navbar.html'"></div>
      <h1 class="title">Application</h1>
      <div ng-view></div>
      <div ng-include="'views/footer.html'"></div>
    </div>
    <!-- Modules -->
    <script src="js/app.js"></script>

    <!-- Controllers -->
    <script src="js/controllers/MainController.js"></script>
    <script src="js/controllers/HomeController.js"></script>
    <script src="js/controllers/NavbarController.js"></script>
    <script src="js/controllers/RegisterController.js"></script>
    <script src="js/controllers/AccountOptionsController.js"></script>
    <script src="js/controllers/LoginController.js"></script>
    <script src="js/controllers/CommentController.js"></script>
    <script src="js/controllers/GenerateReportController.js"></script>
    <script src="js/controllers/DisplayReportsController.js"></script>
    <script src="js/controllers/EquipmentCategoryController.js"></script>
    <script src="js/controllers/EquipmentController.js"></script>
    <script src="js/controllers/RoomTypeController.js"></script>
    <script src="js/controllers/RoomController.js"></script>
    <script src="js/controllers/RoomSubjectsController.js"></script>
    <script src="js/controllers/RoomEquipmentsController.js"></script>
    <script src="js/controllers/StatusLogController.js"></script>
    <script src="js/controllers/PersonnelCategoryController.js"></script>
    <script src="js/controllers/PersonnelController.js"></script>
    <script src="js/controllers/RolesController.js"></script>
    <script src="js/controllers/UsersController.js"></script>
    <script src="js/controllers/UserRolesController.js"></script>

    <!-- Directives -->
    <script src="js/directives/tableDirective.js"></script>
    <script src="js/directives/fieldDirective.js"></script>
    <script src="js/directives/filterArrayDirective.js"></script>
    <script src="js/directives/multipleFilterDirective.js"></script>
    <script src="js/directives/registerDirective.js"></script>

    <!-- Services -->
    <script src="js/services/operationService.js"></script>
    <script src="js/services/authenticationService.js"></script>
    <script src="js/services/userService.js"></script>

    <!-- Filters -->
    <script src="js/filters/numKeys.js"></script>
    <script src="js/filters/camelCaseConvert.js"></script>
    <script src="js/filters/convertToReadable.js"></script>
    <script src="js/filters/convertToDataObject.js"></script>
    <script src="js/filters/capitalize.js"></script>
    <script src="js/filters/toArray.js"></script>

    <!-- Bootstrap 4 -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
