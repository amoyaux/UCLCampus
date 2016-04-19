 angular.module('ionicApp').controller("ToolsController", function($scope, $rootScope, ToolsMenuFactory) {
   	$scope.toolsMenuList = ToolsMenuFactory.all();
  	$scope.selectedCampus = selectedCampus;
  	$rootScope.currentTab=3;
 })