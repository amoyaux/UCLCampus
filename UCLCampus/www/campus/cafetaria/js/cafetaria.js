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
