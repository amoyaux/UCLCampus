/*!
 * angular UCLCampus controler - v1 - 2015-11-24
 * 
 * Copyright (c) 2015 The angular-translate team, Pascal Precht; Licensed MIT
 */

 var db = null;

 angular.module('ionicApp', ['ionic', 'pascalprecht.translate','ngCordova', 'ionic-datepicker'])

 .config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "app.html",
    controller: "SettingsController"
  })
  .state('app.home', {
    url: "/home",
    views: {
      'home-tab' :{
        templateUrl: "home.html",
        controller : "HomeController",
        resolve:{
          campus: function(CampusFactory) {
            return CampusFactory.getClosestCampus();
          }
        }
      }
    }
  })
  .state('app.student', {
    url: "/student",
    views: {
      'student-tab' :{
        templateUrl: "student.html",
        controller: "HomeController",
        resolve:{
          campus: function(CampusFactory) {
            return CampusFactory.getClosestCampus();
          }
        }
      }
    }
  })
  .state('app.libraries', {
    url: "/libraries",
    views: {
      'student-tab' :{
        templateUrl: "libraries.html",
        controller: "LibrariesController",
        resolve:{
          libraries: function(LibraryFactory) {
            return LibraryFactory.all();
          }
        }
      }
    }
  })
  .state('app.libraryDetails', {
    url: "/libraries/:id",
    views: {
      'student-tab' :{
        templateUrl: "libraryDetails.html",
        controller: "LibraryDetailsController"
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
  .state('app.campusSelection', {
    url: "/campusselect",
    views: {
      'student-tab' :{
        templateUrl: "campusSelection.html",
        controller: "CampusSelectionController"
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

.run(function($ionicPlatform, $cordovaSQLite, $ionicPopup, $rootScope, $cordovaGeolocation) {
    $ionicPlatform.ready(function() {
      
      if(window.StatusBar) {
          StatusBar.styleDefault();
      }
      if (window.cordova) { //emulator/device
        window.plugins.sqlDB.remove("database.sqlite", 0, function() {}, function(error) {});  //remove db first
        window.plugins.sqlDB.copy("database.sqlite", 0, function() {
          db = $cordovaSQLite.openDB("database.sqlite");
        }, function(error) {
            console.error("There was an error copying the database: " + error.code);
            db = $cordovaSQLite.openDB("database.sqlite");
        });
      }
      else{
        db = window.openDatabase("database.sqlite", '1', 'test', 1024 * 1024 * 100); // browser
      }
    });
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

.controller('LibrariesController', function($scope, LibraryFactory, libraries) {
  $scope.libraryList =  libraries;
})

.controller('HallDetailsController', function($scope, $stateParams, LectureHallsFactory) {
  $scope.lectureHall= LectureHallsFactory.getLectureHallById($stateParams.id);
})

.controller('LibraryDetailsController', function($scope, $stateParams, LibraryFactory) {
  $scope.library= LibraryFactory.getLibraryById($stateParams.id);
})

.controller('CampusSelectionController', function($scope, $rootScope, CampusFactory) {
 $scope.campusList = CampusFactory.all();
 $scope.selectedCampus = $rootScope.selectedCampus;
})

.controller('SettingsController', function($scope, $ionicSideMenuDelegate, $translate, CampusFactory) {
  $scope.ChangeLanguage = function(lang){
    $translate.use(lang);
  };
})


.controller("HomeController", function($scope, $ionicModal, $ionicPopup, $rootScope, $cordovaNetwork, StudentFactory, campus) {


  $rootScope.selectedCampus = campus;
  console.log(campus.name);
  $scope.studentList = StudentFactory.all();
  $scope.openUrl = function(val){
    console.log(window.Connection); 
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE){
        $ionicPopup.alert({
          title: "Internet Disconnected",
          content: "The internet is disconnected on your device."
        })
      }
      else{
        window.open(val, '_blank', 'location=yes');
      }
    }
  }

  document.addEventListener("deviceready", function () {

    $scope.network = $cordovaNetwork.getNetwork();
    $scope.isOnline = $cordovaNetwork.isOnline();
    $scope.$apply();

        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          $scope.isOnline = true;
          $scope.network = $cordovaNetwork.getNetwork();

          $scope.$apply();
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          console.log("got offline");
          $scope.isOnline = false;
          $scope.network = $cordovaNetwork.getNetwork();

          $scope.$apply();
        })

    }, false);



})

.controller('ScheduleController', function($scope, $cordovaCalendar, $ionicPopup) {

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