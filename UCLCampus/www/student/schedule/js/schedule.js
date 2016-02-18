angular.module('ionicApp').controller('ScheduleController', function($scope, $cordovaCalendar, $ionicPopup, $http) {

 $scope.createEvent = function() {
  $cordovaCalendar.createEvent({
    title: 'Space Race',
    location: 'The Moon',
    notes: 'Bring sandwiches',
    startDate: new Date(2015, 11, 15, 18, 30, 0, 0, 0),
    endDate: new Date(2015, 11, 20, 12, 0, 0, 0, 0)
  }).then(function (result) {
    $ionicPopup.alert({
          title: "Done",
          content: "Your classes have been exported ."
        })

  }, function (err) {
    console.error("There was an error: " + err);
  });
}

$scope.parse = function(){
  $http({
  method: 'GET',
  url: 'http://horairev6.uclouvain.be/direct/index.jsp?displayConfName=webEtudiant&showTree=false&showOptions=false&login=etudiant&password=student&projectId=16&code=LINGI2262'
  }).then(function successCallback(response) {
    console.log(response.cookie);
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(data,status) {
    console.log(data);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}



var disabledDates = [];
var weekDaysList = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
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
 