angular.module('ionicApp').controller("EventsController", function($scope, $state, $cordovaNetwork, $rootScope, $ionicScrollDelegate, events, EventFactory, $ionicLoading, $ionicPopup, $ionicHistory) {
	var i = 0;
	console.log(performance.now());
	$ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
  	});

	if(events==-1){
		$ionicPopup.alert({
		    title: "Fail",
		  	content: "You need an internet connexion."
		});
		$ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });
		$state.go('app.campus');
	}
	else{
		$scope.selectedCategory = "All categories";

		$scope.resetEventList = function() {
			$ionicScrollDelegate.scrollTop();
			$scope.eventList = [];
			for(i = 0; $scope.eventList.length<10 ; i++) {
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
			var start = performance.now();
			var length = $scope.eventList.length + 10;
			for(var j = i; $scope.eventList.length < length && j<events.length; j++) {
				if(events[j].category == $scope.selectedCategory || $scope.selectedCategory == "All categories") {
					$scope.eventList.push(events[j]);
				}
			}
			i=j;
			$scope.$broadcast('scroll.infiniteScrollComplete');
			var end = performance.now();
			console.log(end-start);
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
	}
	$ionicLoading.hide();
	
})