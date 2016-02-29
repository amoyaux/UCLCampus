angular.module('ionicApp').controller("CampusController", function($scope, $state, $cordovaNetwork, $rootScope, CampusMenuFactory) {
  console.log("controller");
  $scope.campusMenuList = CampusMenuFactory.all();
  $scope.selectedCampus = selectedCampus;
  
});

