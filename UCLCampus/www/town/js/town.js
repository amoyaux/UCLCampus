 angular.module('ionicApp').controller("TownController", function($scope, $rootScope, TownMenuFactory) {
   	$scope.townMenuList = TownMenuFactory.all();
  	$scope.selectedCampus = selectedCampus;
  	$rootScope.currentTab=4;
 })