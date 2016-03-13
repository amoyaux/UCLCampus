String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

angular.module('ionicApp').controller('SportsController', function($scope, $http, $q, $ionicPopup, sports, SportsFactory, $ionicLoading, $ionicScrollDelegate, $ionicPopup, $ionicHistory) {	
	var i = 0;

	function parse(doc){
		i = doc.indexOf('<a');
		j = doc.indexOf('</a>');
		var frame = doc.substring(i+3,j);
		i = frame.indexOf('>');
		frame = frame.substring(i+1,j);
		var res = frame.replaceAll('&nbsp;','');

		doc = doc.substring(j+4);

		return [res,doc];
	}
	function parseLocal(doc){
		i = doc.indexOf('<td');
		j = doc.indexOf('</td>');
		var frame = doc.substring(i,j);
		i = frame.indexOf('>');
		frame = frame.substring(i+1,j);
		//REMOVE COMMENTARY LINE
		i = frame.indexOf('<');
		frame = frame.substring(0,i);
		//REMOVE &nbsp and \r\n
		var res = frame.replaceAll('&nbsp;','');
		var res = res.replace('\r\n ','');

		doc = doc.substring(j+5);

		return [res,doc];
	}
	function parse2(doc){
		i = doc.indexOf('<td');
		j = doc.indexOf('</td>');
		var frame = doc.substring(i+3,j);
		i = frame.indexOf('>');
		frame = frame.substring(i+1,j);
		var res = frame;
		var res = res.replace('\r\n ','');

		doc = doc.substring(j+5);

		return [res,doc];
	}
	if(sports.succes){
		//Affiche d'abors les sports du jours.
		var date  = new Date();
		var day = date.getDay();
		var counter = sports.length;
		var i = 0;
		var matcher = ["Dimanche","Lunid","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
		while(matcher[day] != sports.val[0].day.replace(/\s/g, '') || (i < counter)){
			var x = sports.pop();
			sports.push(x);
			i++;
		}
	 	$scope.sports = sports.val;
	}
	else{
		var doc = '';
		var date = 1;
		var nextWeek = 0;
		var day = '';
		var skip = 0;
		var sportList = [];

		while(nextWeek < date){
			
			doc = sports[skip];
			if(doc == -1 && skip == 0){
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
			var i = doc.indexOf('<tbody');
			var j = doc.indexOf('</tbody');
			doc = doc.substring(i+7,j);
			for(k=0; k < 50; k++){

				//SPORT TYPE
				var res = parse(doc);
				var sport = res[0];
				doc = res[1];

			  	//SPORT PLACE
			  	var res = parse(doc);
			  	var place = res[0];
			  	doc = res[1];

				//NEED TO SKIP THE FIRST /TD
				doc = doc.substring(doc.indexOf('</td>')+5);

				//LOCAL
				var res = parseLocal(doc);
				var local = res[0];
				doc = res[1];

				//DAY
				var res = parse2(doc);
				var day = res[0];
				doc = res[1];

				//DATE
				var res = parse2(doc);
				var sdate  = res[0].split('/');
				date = new Date(sdate[2], sdate[1]-1, sdate[0]);
				doc = res[1];

				//STARTHOUR
				var res = parse2(doc);
				var startHour = res[0];
				doc = res[1];

				date.setHours(startHour.split(':')[0]);
				date.setMinutes(startHour.split(':')[1]);
				date.setSeconds(0);

				//ENDHOUR
				var res = parse2(doc);
				var EndHour = res[0];
				doc = res[1];

				//CREATE ITEM
				var item = {
					sport: sport,
					place: place,
					local : local,
					day : day,
					date : date,
					startHour : startHour,
					endHour : EndHour,
				};


				if(sportList.length == 0){
					sday = day;
					nextWeek = new Date();
					nextWeek.setDate(date.getDate()+7);
					nextWeek.setHours(startHour.split(':')[0]);
					nextWeek.setMinutes(startHour.split(':')[1]);
					nextWeek.setSeconds(0);
				}
				if(nextWeek < date){
					break;
				}
				sportList.push(item);
			}
			skip = skip + 1;
		}
		$scope.sports = sportList;
		window.localStorage.removeItem('sports');
		window.localStorage['sports'] = JSON.stringify(sportList);
	}

	$scope.categories = [];
	for(var k = 0; k<$scope.sports.length; k++) {
		if($scope.categories.indexOf($scope.sports[k].sport)==-1) {
			$scope.categories.push($scope.sports[k].sport);
		}
	}
	$scope.categories.sort();
	$scope.selectedCategory = "All sports";

	$scope.sportList = [];
	for(i = 0; $scope.sportList.length < 10 ; i++) {
		if(($scope.sports[i].sport.replace(/\s+/g, '') == $scope.selectedCategory.replace(/\s+/g, '')) || ($scope.selectedCategory == "All sports")) {
			$scope.sportList.push($scope.sports[i]);
		}
	}

	$scope.resetSportList = function() {
		$ionicScrollDelegate.scrollTop();
		$scope.sportList = [];
		for(i = 0; $scope.sportList.length < 10 ; i++) {
			if(($scope.sports[i].sport.replace(/\s+/g, '') == $scope.selectedCategory.replace(/\s+/g, '')) || ($scope.selectedCategory == "All sports")) {
				$scope.sportList.push($scope.sports[i]);
			}
		}
	}

	$scope.loadMoreEvents = function() {
		var length = $scope.sportList.length + 10;
		for(var j = i; $scope.sportList.length < length && j<$scope.sports.length; j++) {
			if(($scope.sports[j].sport.replace(/\s+/g, '') == $scope.selectedCategory.replace(/\s+/g, '')) || ($scope.selectedCategory == "All sports")) {
				$scope.sportList.push($scope.sports[j]);
			}
		}
		i=j;
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};

	$scope.hasMoreEvents = function(item) {
		return i<$scope.sports.length;
	}

});
