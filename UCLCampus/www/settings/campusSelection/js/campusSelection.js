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
    
angular.module('ionicApp').controller('CampusSelectionController', function($scope, $rootScope, $state, CampusFactory, $ionicPlatform) {
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