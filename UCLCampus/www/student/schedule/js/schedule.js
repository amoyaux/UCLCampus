angular.module('ionicApp').controller('ScheduleController', function($scope, $rootScope, $cordovaCalendar, $ionicPopup, $http, $cookies, $timeout, $state) {

 $scope.createEvent = function() {
  for(i = 0; i < $scope.Schedule.length;i++){
  		var date = $scope.Schedule[i].date.split('/');
  		var hours = $scope.Schedule[i].startDate.split('h');
  		var hours2 =  $scope.Schedule[i].endDate.split('h');

	  $cordovaCalendar.createEvent({
	    title: $scope.Schedule[i].code,
	    location: $scope.Schedule[i].local,
	    notes: $scope.Schedule[i].professor,
	    startDate: new Date(date[2], date[0]-1, date[1], hours[0], hours[1], 0, 0, 0),
	    endDate: new Date(date[2], date[0]-1, date[1], hours2[0] , hours2[1], 0, 0, 0)
	  }).then(function (result) {
	    //
	  }, function (err) {
	    console.error("There was an error: " + err);
	  });
  }
  $ionicPopup.alert({
    title: "Done",
  	content: "Your classes have been exported. \n Care your smartphone will maybe be slow for 1 minute"
  })
  window.localStorage['agenda'] = 'true';
  $rootScope.agendaUpDated = true;
}

$scope.deleteEvent = function() {
  for(i = 0; i < $scope.Schedule.length;i++){
  		var date = $scope.Schedule[i].date.split('/');
  		var hours = $scope.Schedule[i].startDate.split('h');
  		var hours2 =  $scope.Schedule[i].endDate.split('h');

	  $cordovaCalendar.deleteEvent({
	    title: $scope.Schedule[i].code,
	    location: $scope.Schedule[i].local,
	    notes: $scope.Schedule[i].professor,
	    startDate: new Date(date[2], date[0]-1, date[1], hours[0], hours[1], 0, 0, 0),
	    endDate: new Date(date[2], date[0]-1, date[1], hours2[0] , hours2[1], 0, 0, 0)
	  }).then(function (result) {
	    //
	  }, function (err) {
	    console.error("There was an error: " + err);
	  });
  }
  $ionicPopup.alert({
    title: "Done",
  	content: "Your classes have been removed. \n Care your smartphone will maybe be slow for 1 minute"
  })
  window.localStorage['agenda'] = 'false';
  $rootScope.agendaUpDated = false;

  
}

$scope.tomorrow= function(){
	var yesterday = new Date();
	yesterday.setDate($scope.datepickerObject.inputDate.getDate()-1);
	$scope.datepickerObject.inputDate = yesterday;
}
$scope.yesterday= function(){
	var tomorrow = new Date();
	tomorrow.setDate($scope.datepickerObject.inputDate.getDate()+1);
	$scope.datepickerObject.inputDate = tomorrow;
}
$scope.refresh= function(){
	$rootScope.refr = 0;
	$state.go($state.current, {}, {reload: true});
}

$scope.$on('$ionicView.enter', function() {
	$rootScope.agendaUpDated = window.localStorage['name'] || 'undefined';
	if($rootScope.agendaUpDated == undefined){
		$rootScope.agendaUpDated=false;
	}
	function weeks(){
		var res = "";
		for(i = 0; i < 54; i++){
			res = res + i + ",";
		}
		res = res + 54;
		return res;
	}
	//var code = 'LMAT1111F,LMAT1111E,LSINF1140,LCOPS1124,LESPO1113D,LECGE1115,LESPO1122,LANGL1370,LSINF1101,LSINF1102,LSINF1103'
	var code = 'LINGI2262,LINGI2347,LINGI2365,LINGI2369,LSINF2990';
	var schedList =  JSON.parse(localStorage.getItem('schedule')) || 'fail';
	if (schedList == 'fail' || $rootScope.refr == 0){
		$http({
		  method: 'GET',
		  url: 'http://horairev6.uclouvain.be/jsp/custom/modules/plannings/direct_planning.jsp?weeks=' + weeks() + '&code='+ code +'&login=etudiant&password=student&projectId=12&showTabDuration=true&showTabDate=true&showTab=true&showTabWeek=false&showTabDay=false&showTabStage=false&showTabResources=false&showTabCategory6=false&showTabCategory7=false&showTabCategory8=false'
		  }).then(function successCallback(response) {
		    $http({
		  		method: 'GET',
		  		url: 'http://horairev6.uclouvain.be/jsp/custom/modules/plannings/info.jsp?displayConfName=WEB&order=slot'
		  		}).then(function successCallback(response) {
		  			function skip(table){
		  				a = table.indexOf('</td>');
		  				b = table.lastIndexOf('</td>');
		  				table = table.substring(a+5);
		  				return table;
		  			}

		  			var doc = response.data;
		  			var a = doc.indexOf('<table>');
		  			var b = doc.indexOf('</table>');
		  			var doc = doc.substring(a+7,b);
		  			for(i = 0; i <2 ; i++){
		  				var a = doc.indexOf('</tr>');
		  				var doc = doc.substring(a+5,b);
		  			}
		  			var a = doc.indexOf('<tr');

		  			var list_schedule = [];
		  			while(a != -1){
		  				//frame of the schedule for one lecture
		  				b = doc.indexOf('</tr>');
		  				var table = doc.substring(a+4,b);

		  				//Date
		  				a = table.indexOf('<td');
		  				b = table.indexOf('</td>');
		  				var frame = table.substring(a+4,b);
		  				a = frame.indexOf('>');
		  				b = frame.indexOf('</');
		  				frame = frame.substring(a+1,b);

		  				var date = frame;
		  				var s = date.split('/');
		  				date = s[1] + "/" + s[0] + "/" + s[2];

		  				//Remove frame from table
		  				table = skip(table);

		  				//Skip
		  				table = skip(table);
		  				
		  				//StartDate
		  				a = table.indexOf('<td');
		  				b = table.indexOf('</td>');
		  				var frame = table.substring(a+4,b);

		  				var startDate = frame;
		  				table = skip(table);

		  				//Duration
		  				a = table.indexOf('<td');
		  				b = table.indexOf('</td>');
		  				var frame = table.substring(a+4,b);

		  				var duration = frame;
		  				table = skip(table);

		  				//Skip
		  				table = skip(table);
		  				table = skip(table);
		  				table = skip(table);

		  				//Professor
		  				a = table.indexOf('<td');
		  				b = table.indexOf('</td>');
		  				var frame = table.substring(a+4,b);

		  				var professor = frame;
		  				table = skip(table);

		  				//Local
		  				a = table.indexOf('<td');
		  				b = table.indexOf('</td>');
		  				var frame = table.substring(a+4,b);

		  				var local = frame;
		  				table = skip(table);

		  				//Code cours
		  				a = table.indexOf('<td');
		  				b = table.indexOf('</td>');
		  				var frame = table.substring(a+4,b);

		  				var code = frame;
		  				table = skip(table);

		  				var d = duration.split('h');
		  				var da = startDate.split('h');
		  				var endDate = (parseInt(d[0])+ parseInt(da[0])) + "h" + da[1]

		  				var item = {
		  					code: code,
		  					date: date,
		  					startDate : startDate,
		  					endDate : endDate,
		  					duration : duration,
		  					professor : professor,
		  					local :local,
		  				};
		  				list_schedule.push(item);

		  				b = doc.indexOf('</tr>');
		  				doc = doc.substring(b+5);
		  				a = doc.indexOf('<tr');
		  			}
		  			console.log(list_schedule);
		  			window.localStorage.removeItem('schedule');
		  			window.localStorage['schedule'] = JSON.stringify(list_schedule);
		  			$scope.Schedule = list_schedule;
		  		}, function errorCallback(data,status) {
		    		console.log('fail schedule network load ' + status);
		    		$ionicPopup.alert({
					    title: "Fail",
					  	content: "You need an internet connexion."
					  });
		  		});

		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(data,status) {
		    console.log('fail schedule network load ' + status);
		    $ionicPopup.alert({
					    title: "Fail",
					  	content: "You need an internet connexion."
			});
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}
	else{
		$scope.Schedule = schedList;
	}	
})

$scope.isToday = function(item){
	var day = $scope.datepickerObject.inputDate.getDate();
	if(day < 10){
		day = "0" + day;
	}
	var month = $scope.datepickerObject.inputDate.getMonth()+1;
	if(month < 10){
		month = "0" + month;
	}
	var year = $scope.datepickerObject.inputDate.getFullYear();
	var selectedDate = month  + '/' + day + '/' + year;
	return (item.date == selectedDate);
}

var disabledDates = [];
var weekDaysList = ["Su", "Mo", "Tu", "We", "th", "Fr", "Sa"];
var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

$scope.datepickerObject = {
      titleLabel: 'Pick a date',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
      disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList, //Optional
      monthList: monthList, //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2), //Optional
      to: new Date(2018, 8, 25),  //Optional
      callback: function (val) {  //Mandatory
        datePickerCallback(val);
      },
      dateFormat: 'dd-MM-yyyy', //Optional
      closeOnSelect: false, //Optional
    };

    var datePickerCallback = function (val) {
        if (typeof(val) === 'undefined') {
          console.log('No date selected');
        } else {
          $scope.datepickerObject.inputDate = val;
          console.log('Selected date is : ', val)
        }
      };
    })
 