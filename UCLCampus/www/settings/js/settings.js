angular.module('ionicApp').controller('SettingsController', function($scope, $ionicSideMenuDelegate, $translate, $state, CampusFactory, AuthService) {
  $scope.ChangeLanguage = function(lang){
    $translate.use(lang);
  };
  $scope.logout = function() {
    AuthService.logout();
  }
})