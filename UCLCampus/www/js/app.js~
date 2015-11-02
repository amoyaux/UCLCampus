angular.module('ionicApp', ['ionic'])

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

<<<<<<< HEAD
.controller("HomeController", function($scope, $ionicModal) {
=======
.controller("HomeController", function($scope,$ionicModal) {
>>>>>>> 20454b6bde3e342f1ede272f3c14dfdc536f5adb
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
<<<<<<< HEAD
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
=======
>>>>>>> 20454b6bde3e342f1ede272f3c14dfdc536f5adb
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
})

.controller("CartController", function($scope) {
  
  $scope.data = {
    items : []
  };
  
  for(var i = 0; i < 25; i++) {
    $scope.data.items.push({
      id : i,
      label : "Item " + i
    })
  }
  
})

.directive("ionCart", function() {
  return {
    restrict : "E",
    templateUrl : "ionCart.html"
  }
})

.directive("ionPurchase", function() {
  return {
    restrict : "E",
    template : "<h2>This is Ion Purchase</h2>"
  }
})