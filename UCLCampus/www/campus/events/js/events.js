angular.module('ionicApp').controller("EventsController", function($scope, $state, $cordovaNetwork, $rootScope, $ionicScrollDelegate, events, EventFactory, $ionicLoading) {
	var i = 0;
	$ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
  	});


	$scope.selectedCategory = "All categories";

	$scope.resetEventList = function() {
		$ionicScrollDelegate.scrollTop();
		console.log($scope.selectedCategory);
		$scope.eventList = [];
		for(i = 0; $scope.eventList.length<10 ; i++) {
			console.log(i);
			if(events[i].category == $scope.selectedCategory || $scope.selectedCategory == "All categories") {
				$scope.eventList.push(events[i]);
			}
		}
	}

	$scope.resetEventList();

	$scope.categories = [];
	for(var k = 0; k<$scope.eventList.length; k++) {
		if($scope.categories.indexOf($scope.eventList[k].category)==-1 && $scope.eventList[k].category!="Autre") {
			$scope.categories.push($scope.eventList[k].category);
		}
	}
	$scope.categories.push("Autre");


	$scope.loadMoreEvents = function() {
		var length = $scope.eventList.length + 10;
		for(var j = i; $scope.eventList.length < length && j<events.length; j++) {
			if(events[j].category == $scope.selectedCategory || $scope.selectedCategory == "All categories") {
				$scope.eventList.push(events[j]);
			}
		}
		i=j;
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};

	$scope.hasMoreEvents = function(item) {
		return i<events.length;
	}



	$scope.hasCategory = function(item) {
		if($scope.selectedCategory != "All categories" && $scope.selectedCategory != item.category) {
			return false;
		}
		else {
			return true;
		}
	}

	$ionicLoading.hide();
	
})