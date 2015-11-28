/*!
 * angular UCLCampus controler - v1 - 2015-11-24
 * 
 * Copyright (c) 2015 The angular-translate team, Pascal Precht; Licensed MIT
 */
 var db = null;
 angular.module('ionicApp', ['ionic', 'ngCordova', 'pascalprecht.translate'])

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

.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        if (window.cordova) { //emulator/device
          window.plugins.sqlDB.remove("test.db", 0, function() {}, function(error) {});  //remove db first
          window.plugins.sqlDB.copy("test.db", 0, function() {
            db = $cordovaSQLite.openDB("test.db");
          }, function(error) {
              console.error("There was an error copying the database: " + error.code);
              db = $cordovaSQLite.openDB("test.db");
          });
        }
        else{
          db = window.openDatabase("test.db", '1', 'test', 1024 * 1024 * 100); // browser
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