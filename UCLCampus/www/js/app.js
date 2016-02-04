/*!
 * angular UCLCampus controler - v1 - 2015-11-24
 * 
 * Copyright (c) 2015 The angular-translate team, Pascal Precht; Licensed MIT
 */

 var db = null;
 var selectedCampus = null;

 angular.module('ionicApp', ['ionic', 'pascalprecht.translate','ngCordova', 'ionic-datepicker', 'ngMockE2E']) //

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
        templateUrl: "student.html",
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
    cache: false,
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

.run(function($ionicPlatform, $cordovaSQLite, $ionicPopup, $rootScope, $cordovaGeolocation, $httpBackend, $state, AuthService, AUTH_EVENTS) {

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

.controller('LoginController', function($scope, $state, $ionicPopup, AuthService) {
  console.log("login");
  $scope.data = {};
 
  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('app.home', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})

.controller('HallsController', function($scope, $rootScope, LectureHallsFactory) {
  console.log(selectedCampus);
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
    $state.go('app.login');
  }
})


.controller("HomeController", function($scope, $ionicModal, $ionicPopup, $rootScope, $cordovaNetwork, StudentFactory, CampusFactory, campus) {

  if(selectedCampus == null) {
    selectedCampus = campus;
    if(selectedCampus == undefined) {
      selectedCampus = CampusFactory.all()[0];
    }
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

