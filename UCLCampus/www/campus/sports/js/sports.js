String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

angular.module('ionicApp').controller('SportsController', function($scope, $http, $q, $ionicPopup, sports, SportsFactory, $ionicLoading) {	

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
	var doc = '';
	var sday = '';
	var day = '';
	var nextday = false;
	var skip = 0;
	var sportList = [];
	
	while(day != sday || nextday==false){
		
		doc = sports[skip];
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

			//DATE - SKIPPED - NOT NEEDED
			var res = parse2(doc);
			doc = res[1];

			//STARTHOUR
			var res = parse2(doc);
			var startHour = res[0];
			doc = res[1];

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
				startHour : startHour,
				endHour : EndHour,
			};

			if(sportList.length == 0){
				sday = day;
			}
			if((nextday==false) && (day != sday)){
				nextday = true;
			}
			if((nextday==true) && (sday == day)){
				break;
			}
			sportList.push(item);
		}
		skip = skip + 1;
	}
	$scope.sports = sportList;
	$scope.sportList = sportList;


	$scope.categories = [];
	for(var k = 0; k<$scope.sports.length; k++) {
		if($scope.categories.indexOf($scope.sports[k].sport)==-1) {
			$scope.categories.push($scope.sports[k].sport);
		}
	}
	$scope.categories.sort();
	$scope.selectedCategory = "All sports";

	$scope.resetSportList = function() {
		$scope.sportList = [];
		for(i = 0; i< $scope.sports.length ; i++) {
			if(($scope.sports[i].sport.indexOf($scope.selectedCategory)>-1) || $scope.selectedCategory == "All sports") {
				$scope.sportList.push($scope.sports[i]);
			}
		}
	}
});
