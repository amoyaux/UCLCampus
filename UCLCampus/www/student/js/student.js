    // Copyright (C) 2016  UCL Moyaux Arnold, Baptiste Lacasse

    // This program is free software: you can redistribute it and/or modify
    // it under the terms of the GNU General Public License as published by
    // the Free Software Foundation, either version 3 of the License, or
    // (at your option) any later version.

    // This program is distributed in the hope that it will be useful,
    // but WITHOUT ANY WARRANTY; without even the implied warranty of
    // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    // GNU General Public License for more details.

    // You should have received a copy of the GNU General Public License
    // along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
angular.module('ionicApp').controller("StudentController", function($scope, $state, $cordovaNetwork, $rootScope, StudentFactory, $ionicHistory) {
  // $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
  //   viewData.enableBack = true;
  // }); 
  $scope.studentList = StudentFactory.all();
  $scope.selectedCampus = selectedCampus;
  $rootScope.currentTab=1;
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
      	if(ionic.Platform.isIOS()){
      		window.open(val, '_system', 'location=yes');
      	}
      	else{
        	window.open(val, '_blank', 'location=no');
      	}
      }
    }
  }
});

angular.module('ionicApp').filter("filterCampus", function() {
  return function(studentList, selectedCampus) {
    return studentList.filter(function(item){
      if(item.campus.length == 0) return true;
      else {
        for(var i =0; i<item.campus.length; i++) {
          if(item.campus[i] == selectedCampus.name) return true;
        }
        return false;
      }
    });
  }

})