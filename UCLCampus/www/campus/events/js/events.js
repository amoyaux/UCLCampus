angular.module('ionicApp').controller("EventsController", function($scope, $state, $cordovaNetwork, $rootScope, events, EventFactory) {
	$scope.eventList = [];
	for(var i = 0; i<10; i++) {
		$scope.eventList.push(events[i]);
	}
	
})