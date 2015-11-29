/*!
 * angular UCLCampus controler - v1 - 2015-11-24
 * 
 * Copyright (c) 2015 The angular-translate team, Pascal Precht; Licensed MIT
 */
 var db = null;

 angular.module('ionicApp', ['ionic', 'pascalprecht.translate','ngCordova', 'ionic-datepicker'])

 .run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
 .config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "app.html"
  })
  .state('app.home', {
    url: "/home",
    views: {
      'home-tab' :{
        templateUrl: "home.html",
        controller : "HomeController"
      }
    }
  })
  .state('app.student', {
    url: "/student",
    views: {
      'student-tab' :{
        templateUrl: "student.html",
        controller: "HomeController"
      }
    }
  })
  .state('app.lectureHalls', {
    url: "/halls",
    views: {
      'student-tab' :{
        templateUrl: "halls.html",
        controller: "HallsController"
      }
    }
  })

  .state('app.lectureHallDetails', {
    url: "/halls/:id",
    views: {
      'student-tab' :{
        templateUrl: "hallDetails.html",
        controller: "HallDetailsController"
      }
    }
  })

  .state('app.schedule', {
    url: "/schedule",
    views: {
      'student-tab' :{
        templateUrl: "schedule.html",
        controller: "ScheduleController"
      }
    }
  })
  
  $urlRouterProvider.otherwise("/app/home");

  $translateProvider.translations('en', {
    Schedule: "Schedule",
    LectureHalls: "Lecture Halls",
    Student: "Student",
  });
  $translateProvider.translations('fr', {
    Schedule: "Horaire",
    LectureHalls: "Auditoires",
    Libraries: "Bibliothèques",
    Student: "Etudiant",
    Map: "Carte",
    Town: "Ville",
    Tools: "Outils",

  });
  $translateProvider.translations('nl', {

  });
  $translateProvider.preferredLanguage("en");
  $translateProvider.fallbackLanguage("en");

  $translateProvider.useSanitizeValueStrategy('escapeParameters');


})

.controller('AppController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.toggleRight = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
})


.controller('HallsController', function($scope, LectureHallsFactory) {
  $scope.lectureHallList =  LectureHallsFactory.all();
})

.controller('HallDetailsController', function($scope, $stateParams, LectureHallsFactory) {
  $scope.lectureHall= LectureHallsFactory.getLectureHallById($stateParams.id);
})

.controller('SettingsController', function($scope, $ionicSideMenuDelegate, $translate) {
  $scope.ChangeLanguage = function(lang){
    $translate.use(lang);
  }
})


.controller("HomeController", function($scope,$ionicModal, StudentFactory) {

  $scope.studentList = StudentFactory.all();

  $scope.openUrl = function(val){
    window.open(val, '_blank', 'location=yes');
  }

  
})

.controller('ScheduleController', function($scope, $cordovaCalendar) {

 $scope.createEvent = function() {
  $cordovaCalendar.createEvent({
    title: 'Space Race',
    location: 'The Moon',
    notes: 'Bring sandwiches',
    startDate: new Date(2015, 11, 15, 18, 30, 0, 0, 0),
    endDate: new Date(2015, 11, 20, 12, 0, 0, 0, 0)
  }).then(function (result) {
    console.log("Event created successfully");
  }, function (err) {
    console.error("There was an error: " + err);
  });
}


var disabledDates = [];
var weekDaysList = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

$scope.datepickerObject = {
      titleLabel: 'Title',  //Optional
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


.directive("ionSettings", function() {
  return {
    restrict : "E",
    templateUrl : "ionSettings.html"
  }
})

.directive('hideTabs', function($rootScope) {
  return {
    restrict: 'A',
    link: function($scope, $el) {
      $rootScope.hideTabs = 'tabs-item-hide';
      $scope.$on('$destroy', function() {
        $rootScope.hideTabs = '';
      });
    }
  };
});