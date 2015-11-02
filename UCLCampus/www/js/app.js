angular.module('ionicApp', ['ionic'])

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

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "app.html"
    })
    .state('app.home', {
      url: "/home",
      views: {
        'appContent' :{
          templateUrl: "home.html",
          controller : "HomeController"
        }
      }
    })
    .state('app.lectureHalls', {
      url: "/halls",
      views: {
        'appContent' :{
          templateUrl: "halls.html",
          controller: "HallsController"
        }
      }
    })

    .state('app.lectureHallDetails', {
      url: "/halls/:id",
      views: {
        'appContent' :{
          templateUrl: "hallDetails.html",
          controller: "HallDetailsController"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/app/home");
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

.controller("HomeController", function($scope,$ionicModal) {

  $ionicModal.fromTemplateUrl('student.html', function(modal) {
    $scope.studentModal = modal;
  }, {
    scope: $scope
  });
  $scope.studentMenu = function() {
    $scope.studentModal.show();
  }
  $scope.closeStudentMenu = function() {
    $scope.studentModal.hide();

  }
  $scope.slide = function(index) {
    $ionicSlideBoxDelegate.slide(index);
  };
  $scope.studentList = [
    { title: 'Schedule' , icon:'icon ion-calendar'},
    { title: 'Lecture Halls' , icon:'icon ion-android-pin'},
    { title: 'Libraries', icon:'icon ion-ios-book'},
    { title: 'Moodle', icon:'icon ion-help' },
    { title: 'UCLouvain.be', icon:'icon ion-help'}
  ];
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();

  }
  $scope.slide = function(index) {
    $ionicSlideBoxDelegate.slide(index);
  };
  $scope.studentList = [
    { title: 'Schedule' , icon:'icon ion-calendar', url:'app.home'},
    { title: 'Lecture Halls' , icon:'icon ion-android-pin', url:'app.lectureHalls'},
    { title: 'Libraries', icon:'icon ion-ios-book', url:'app.home'},
    { title: 'Moodle', icon:'icon ion-help', url:'app.home' },
    { title: 'UCLouvain.be', icon:'icon ion-help', url:'app.home'}
  ];
})

