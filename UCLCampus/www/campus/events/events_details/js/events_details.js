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
angular.module('ionicApp').controller('EventsDetailsController', function($scope, $stateParams, EventFactory, $rootScope) {

  $scope.formatString = function(item) {
    item = item.replace(/<(?:.|\n)*?>/gm, '');
    var e = document.createElement('div');
    e.innerHTML = item;
    return e.childNodes[0].nodeValue;
  }

  console.log($stateParams.id);
  $scope.event = EventFactory.getEventById($stateParams.id);
  var desc = $scope.formatString($scope.event.description);
  if(desc.length>300) {
    desc+="...";
  }
  $scope.item = {title: 'Description', text : desc};

  
  $scope.toggleItem = function(item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function(item) {
    return $scope.shownItem === item;
  };
})