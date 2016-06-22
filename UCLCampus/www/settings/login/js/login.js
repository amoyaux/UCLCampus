angular.module('ionicApp').controller('LoginController', function($scope, $rootScope, $state, $ionicPopup, AuthService) {
  console.log("login");
  $scope.data = {};
  $rootScope.currentTab=1;
  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('app.home', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})
