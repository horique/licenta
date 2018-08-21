app.controller('MainController', function($scope) {
  window.onscroll = function() {scrollFunction()};
  var scrollFunction = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("topBtn").style.display = "block";
    } else {
      document.getElementById("topBtn").style.display = "none";
    };
  };
  // When the user clicks on the button, scroll to the top of the document
  $scope.topFunction = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
});
