angular.module('ionicApp').controller("EventsController", function($scope, $state, $cordovaNetwork, $rootScope, events, EventFactory) {
	$scope.eventList = [];
	for(var i = 0; i<10; i++) {
		$scope.eventList.push(events[i]);
	}

	$scope.categories = [];
	for(var i = 0; i<$scope.eventList.length; i++) {
		if($scope.categories.indexOf($scope.eventList[i].category)==-1 && $scope.eventList[i].category!="Autre") {
			$scope.categories.push($scope.eventList[i].category);
		}
	}
	$scope.categories.push("Autre");
	
})