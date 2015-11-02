angular.module('ionicApp', ['ionic', 'pascalprecht.translate'])

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
        'appContent' :{
          templateUrl: "home.html",
          controller : "HomeController"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/app/home");

  $translateProvider.translations('en', {
      Schedule: "Schedule",
  });
  $translateProvider.translations('fr', {
      Schedule: "Horaire",
  });
  $translateProvider.translations('nl', {
      
  });
  $translateProvider.preferredLanguage("en");
  $translateProvider.fallbackLanguage("en");


})

.controller('AppController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.toggleRight = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
})

.controller('SettingsController', function($scope, $ionicSideMenuDelegate, $translate) {
  $scope.ChangeLanguage = function(lang){
    $translate.use(lang);
  }
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
})

.directive("ionSettings", function() {
  return {
    restrict : "E",
    templateUrl : "ionSettings.html"
  }
})
