angular.module('ionicApp').controller('ScheduleController', function($scope, $cordovaCalendar, $ionicPopup) {

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

scope.parse = function(){
    //http://horairev6.uclouvain.be/jsp/custom/modules/plannings/direct_planning.jsp?weeks=1,2,3,4,5,6,7,8,9,10,11,12&code=lingi2145&login=etudiant&password=student&projectId=7&showTabDuration=true&showTabStage=false&showTabResources=false&showTabCategory6=false&showTabCategory7=false&showTabCategory8=false
    $http.get('http://horairev6.uclouvain.be/jsp/custom/modules/plannings/direct_planning.jsp?weeks=1,2,3,4,5,6,7,8,9,10,11,12&code=lingi2145&login=etudiant&password=student&projectId=12&showTabDuration=true&showTabStage=false&showTabResources=false&showTabCategory6=false&showTabCategory7=false&showTabCategory8=false').then(function(resp) {
      console.log('Success', resp);
      console.log(resp.data);
    }, function(err) {
      console.error('ERR', err);
    // err.status will contain the status code
    })
  };


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
 