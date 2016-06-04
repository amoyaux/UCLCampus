/*!
 * angular UCLCampus controler - v1 - 2015-11-24
 * 
 * Copyright (c) 2016 UCL, Moyaux Arnold, Baptise Lacasse; Licensed  GNU GENERAL PUBLIC LICENSE Version 2, June 1991
 */

 var db = null;
 var selectedCampus = null;

 var app = angular.module('ionicApp', ['ionic', 'pascalprecht.translate','ngCordova', 'onezone-datepicker','ngCookies'])

 .config(function($stateProvider, $urlRouterProvider, $translateProvider, $httpProvider){

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
        templateUrl: "templates/home.html",
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
    views: {
      'home-tab' :{
        templateUrl: "settings/login/templates/login.html",
        controller: "LoginController"
      }
    }
  })
  .state('app.student', {
    url: "/student",
    cache: false,
    views: {
      'student-tab' :{
        templateUrl: "student/templates/student.html",
        controller: "StudentController"
      }
    }
  })
  .state('app.libraries', {
    url: "/libraries",
    cache: false,
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
    cache: false,
    views: {
      'student-tab' :{
        templateUrl: "student/schedule/templates/schedule.html",
        controller: "ScheduleController"
      }
    }
  })
  .state('app.campusSelection', {
    url: "/campusselect",
    cache: false,
    views: {
      'home-tab' :{
        templateUrl: "settings/campusSelection/templates/campusSelection.html",
        controller: "CampusSelectionController"
      }
    }
  })
  .state('app.campus', {
    url: "/campus",
    cache:false,
    views: {
      'campus-tab' :{
        templateUrl: "campus/templates/campus.html",
        controller: "CampusController"
      }
    }
  })
  .state('app.events', {
    cache:false,
    url: "/events",
    views: {
      'campus-tab': {
        templateUrl: "campus/events/templates/events.html",
        controller: "EventsController",
        resolve:{
          events: function(EventFactory) {
            return EventFactory.all();
          }
        }
      }
    }
  })
  .state('app.eventsDetails', {
    url: "/events/:id",
    views: {
      'campus-tab' :{
        templateUrl: "campus/events/events_details/templates/events_details.html",
        controller: "EventsDetailsController"
      }
    }
  })
  .state('app.cafetaria', {
    cache: false,
    url: "/cafetaria",
    views: {
      'campus-tab': {
        templateUrl: "campus/cafetaria/templates/cafetaria.html",
        controller: "CafetariaController",
        resolve:{
          resto: function(CafetariaFactory) {
            return CafetariaFactory.all();
          }
        }
      }
    }
  })
  .state('app.cafetariaDetails', {
    url: "/cafetaria/:id",
    views: {
      'campus-tab' :{
        templateUrl: "campus/cafetaria/templates/cafetariaDetails.html",
        controller: "CafetariaDetailsController"
      }
    }
  })
  .state('app.sports', {
    cache:false,
    url: "/sports",
    views: {
      'campus-tab': {
        templateUrl: "campus/sports/templates/sports.html",
        controller: "SportsController",
        resolve:{
          sports: function(SportsFactory, $q) {
            var sp = SportsFactory.getSports();
              if(sp == 'fail'){
              
              var list = [];
              for (i = 0; i < 4; i++) { 
                list.push(SportsFactory.getPage(50*i));
              }
              return $q.all(list);
            }
             else{
               return {succes : true, val : sp};
            }
          }
        }
      }
    }
  })
  .state('app.tools', {
    url: "/tools",
    cache : false,
    views: {
      'tools-tab' :{
        templateUrl: "tools/templates/tools.html",
        controller: "ToolsController"
      }
    }
  })
  .state('app.maps', {
    url: "/maps/{id}/:go",
    reloadOnSearch: false,
    views: {
      'tools-tab' :{
        templateUrl: "tools/maps/templates/maps.html",
        controller: "MapsController",
        persist: true
      }
    }
  })
  .state('app.town', {
    url: "/town",
    cache: false,
    views: {
      'town-tab' :{
        templateUrl: "town/templates/town.html",
        controller: "TownController"
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

  //$httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];


})

.run(function($ionicPlatform, $cordovaSQLite, $ionicPopup, $rootScope, $cordovaGeolocation, $state, $ionicLoading, AuthService, AUTH_EVENTS) {

    $ionicPlatform.ready(function() {
      if(window.StatusBar) {
          StatusBar.styleDefault();
      }
      if (window.cordova) { //emulator/device
        window.plugins.sqlDB.remove("database.sqlite", 0, function() {}, function(error) {});  //remove db first
        window.plugins.sqlDB.copy("database.sqlite", 0, function() {
          db = $cordovaSQLite.openDB({name:"database.sqlite", location:"database.sqlite"});
        }, function(error) {
            console.error("There was an error copying the database: " + error.code);
            db = $cordovaSQLite.openDB({name:"database.sqlite", location:"database.sqlite"});
        });
      }
      else{
        db = openDatabase("database.sqlite", '1', 'test', 1024 * 1024 * 100); // browser
        console.log(db);
      }
    });

    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

      console.log('please wait...');
      $rootScope.$broadcast('loading:show');

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

    $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });


    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });
    $rootScope.currentTab=1;
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


.controller('AppController', function($rootScope, $scope, $ionicSideMenuDelegate, $state, $ionicPopup, AuthService, AUTH_EVENTS, $ionicNavBarDelegate) { //, AuthService, AUTH_EVENTS
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

  $scope.options = $scope.options || {};
  var isIOS = ionic.Platform.isIOS();
  $scope.options.hideBackButton = isIOS;
  $scope.options.hideHomeButton = !isIOS;


  $rootScope.openUrl = function(val){
    console.log("open url");
    console.log(window.Connection); 
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE){
        $ionicPopup.alert({
          title: "Internet Disconnected",
          content: "The internet is disconnected on your device."
        })
      }
      else{
        window.open(val, '_blank', 'location=no');
      }
    }
  }
}) 

.controller("HomeController", function($scope, $state, $rootScope, $ionicHistory, $cordovaNetwork, CampusFactory, campus) {

  if(selectedCampus == null) {
    selectedCampus = campus;
    if(selectedCampus == undefined) {
      selectedCampus = CampusFactory.all()[0];
    }
  }
  $rootScope.currentTab=1;
  $ionicHistory.clearHistory();
  $rootScope.goHome = function(){
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $rootScope.currentTab=1;
  	$state.go('app.home');
  }

  $rootScope.setTabStudent = function() {
    $rootScope.currentTab=1;
    $state.go('app.student');
  }
  $rootScope.setTabCampus = function() {
    $rootScope.currentTab=2;
    $state.go('app.campus');
  }
  $rootScope.setTabTools = function() {
    $rootScope.currentTab=3;
    $state.go('app.tools');
  }
  $rootScope.setTabTown = function() {
    $rootScope.currentTab=4;
    $state.go('app.town');
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

