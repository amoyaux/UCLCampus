/*!
 * angular UCLCampus controler - v1 - 2015-11-24
 * 
 * Copyright (c) 2015 The angular-translate team, Pascal Precht; Licensed MIT
 */

 var db = null;
 var selectedCampus = null;

 var app = angular.module('ionicApp', ['ionic', 'pascalprecht.translate','ngCordova', 'ionic-datepicker', 'ngMockE2E'])

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
            if(selectedCampus == null) return CampusFactory.getClosestCampus();
            else return selectedCampus;
          }
        }
      }
    }
  })
  .state('app.login', {
    url: '/login',
    templateUrl: 'login.html',
    views: {
      'home-tab' :{
        templateUrl: "login.html",
        controller: "LoginController"
      }
    }
  })
  .state('app.student', {
    url: "/student",
    views: {
      'student-tab' :{
        templateUrl: "student/templates/student.html",
        controller: "HomeController",
        resolve:{
          campus: function(CampusFactory) {
            if(selectedCampus == null) return CampusFactory.getClosestCampus();
            else return selectedCampus;
          }
        }
      }
    }
  })
  .state('app.libraries', {
    url: "/libraries",
    views: {
      'student-tab' :{
        templateUrl: "student/libraries/templates/libraries.html",
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
        templateUrl: "student/libraries/templates/libraryDetails.html",
        controller: "LibraryDetailsController"
      }
    }
  })
  .state('app.lectureHalls', {
    url: "/halls",
    cache: false,
    views: {
      'student-tab' :{
        templateUrl: "student/halls/templates/halls.html",
        controller: "HallsController"
      }
    }
  })

  .state('app.lectureHallDetails', {
    url: "/halls/:id",
    views: {
      'student-tab' :{
        templateUrl: "student/halls/templates/hallDetails.html",
        controller: "HallDetailsController"
      }
    }
  })

  .state('app.schedule', {
    url: "/schedule",
    views: {
      'student-tab' :{
        templateUrl: "student/schedule/templates/schedule.html",
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
    .state('app.tools', {
    url: "/tools",
    views: {
      'tools-tab' :{
        templateUrl: "tools/templates/tools.html",
        controller: "ToolsController"
      }
    }
  })
      .state('app.maps', {
    url: "/maps",
    views: {
      'tools-tab' :{
        templateUrl: "tools/maps/templates/maps.html",
        controller: "MapsController"
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

.run(function($ionicPlatform, $cordovaSQLite, $ionicPopup, $rootScope, $cordovaGeolocation, $httpBackend, $state, AuthService, AUTH_EVENTS) {

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

    $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

      if ('data' in next && 'authorizedRoles' in next.data) {
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          $state.go($state.current, {}, {reload: true});
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        }
      }

      if (!AuthService.isAuthenticated()) {
        if (next.name !== 'app.login') {
          event.preventDefault();
          $state.go('app.login');
        }
      }
    })
})

/*.run(function($httpBackend){
  $httpBackend.whenGET('http://localhost:8100/valid')
        .respond({message: 'This is my valid response!'});
  $httpBackend.whenGET('http://localhost:8100/notauthenticated')
        .respond(401, {message: "Not Authenticated"});
  $httpBackend.whenGET('http://localhost:8100/notauthorized')
        .respond(403, {message: "Not Authorized"});
 
  
 })*

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  
})*/


.controller('AppController', function($scope, $ionicSideMenuDelegate, $state, $ionicPopup, AuthService, AUTH_EVENTS) { //, AuthService, AUTH_EVENTS
  $scope.username = AuthService.username();
 
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });
 
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
 
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.toggleRight = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
})  

.controller('CampusSelectionController', function($scope, $rootScope, $state, CampusFactory,$ionicPlatform) {
   $scope.campusList = CampusFactory.all();
   $scope.selectedCampus = selectedCampus;
   $scope.data = {
    name: $scope.selectedCampus.name
   };
   $scope.changeCampus = function() {
    for(var i = 0; i<$scope.campusList.length; i++) {
      if($scope.data.name == $scope.campusList[i].name) {
        selectedCampus = $scope.campusList[i];
        $scope.selectedCampus = $scope.campusList[i];
      }
    }
  }
  $ionicPlatform.registerBackButtonAction(function (event) {
    $state.go('app.home');
  }, 100);

})

.controller('SettingsController', function($scope, $ionicSideMenuDelegate, $translate, $state, CampusFactory, AuthService) {
  $scope.ChangeLanguage = function(lang){
    $translate.use(lang);
  };
  $scope.logout = function() {
    AuthService.logout();
  }
})


.controller("HomeController", function($scope, $state, $ionicModal, $ionicPopup, $rootScope, $cordovaNetwork, StudentFactory, CampusFactory, campus) {

  if(selectedCampus == null) {
    selectedCampus = campus;
    if(selectedCampus == undefined) {
      selectedCampus = CampusFactory.all()[0];
    }
  }

  $rootScope.goHome = function(){
  	$state.go('app.home');
  }

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
		//$scope.$apply();

        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          $scope.isOnline = true;
          $scope.network = $cordovaNetwork.getNetwork();

          //$scope.$apply();
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
          console.log("got offline");
          $scope.isOnline = false;
          $scope.network = $cordovaNetwork.getNetwork();

          //$scope.$apply();
        })

    }, false);



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
      if($rootScope.hideTabs == 'tabs-item-hide') {
        $rootScope.rehide = true;
      }
      $rootScope.hideTabs = 'tabs-item-hide';

      $scope.$on('$destroy', function() {
        if($rootScope.rehide) {
          $rootScope.rehide = false;
        }
        else {
          $rootScope.hideTabs = '';
        }
      });
    }
  };
});

