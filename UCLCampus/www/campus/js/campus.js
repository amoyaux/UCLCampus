angular.module('ionicApp').controller("CampusController", function($scope, $state, $cordovaNetwork, $rootScope, CampusMenuFactory) {
  $scope.campusMenuList = CampusMenuFactory.all();
  $scope.selectedCampus = selectedCampus;
  $rootScope.currentTab=2;
});

