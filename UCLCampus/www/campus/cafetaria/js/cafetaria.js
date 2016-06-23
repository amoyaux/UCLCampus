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
angular.module('ionicApp').controller('CafetariaController', function($scope, CafetariaFactory, resto) {
  $scope.restoList = resto;
})

angular.module('ionicApp').controller('CafetariaDetailsController', function($scope, $stateParams, CafetariaFactory) {
  $scope.resto = CafetariaFactory.getRestoById($stateParams.id);
  $scope.item = {title: 'Desrciption', text : $scope.resto.DES};

  $scope.toggleItem= function(item) {
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
