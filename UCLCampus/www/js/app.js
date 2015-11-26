/*!
 * angular UCLCampus controler - v1 - 2015-11-24
 * 
 * Copyright (c) 2015 The angular-translate team, Pascal Precht; Licensed MIT
 */

 angular.module('ionicApp', ['ionic', 'pascalprecht.translate'])

 .factory('LectureHallsFactory', function() {
  return {
    lectureHallList : [
    { title: 'Croix du Sud (SUD)', img:'img/ste-barbe.jpg', address:'Place Croix du Sud', id:'1'},
    { title: 'Sainte Barbe (BARB)', img:'img/ste-barbe.jpg', address:'Place Sainte Barbe, 1', id:'2'},
    { title: 'Socrate (SOCR)', img:'img/ste-barbe.jpg', address:'Place du Cardinal Mercier, 10-12', id:'3'}
    ],
    all: function() {
      return this.lectureHallList;
    },
    getLectureHallById: function (id) {
      for(var i=0; i<this.lectureHallList.length; i++) {
        if(this.lectureHallList[i].id==id) return this.lectureHallList[i];
      }
    }

  }
})

 .factory('StudentFactory', function() {
  return {    
    studentList : [
    { title: 'Schedule' , icon:'icon ion-calendar', url:'app.home'},
    { title: 'LectureHalls' , icon:'icon ion-android-pin', url:'app.lectureHalls'},
    { title: 'Libraries', icon:'icon ion-ios-book', url:'app.home'},
    { title: 'Moodle', icon:'icon ion-help', site:'http://moodleucl.uclouvain.be'},
    { title: 'UCLouvain.be', icon:'icon ion-help', site:'http://uclouvain.be'}
    ],
    all: function() {
      return this.studentList;
    },
    getItemById: function (id) {
      for(var i=0; i<this.studentList.length; i++) {
        if(this.studentList[i].id==id) return this.studentList[i];
      }
    }
  }
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