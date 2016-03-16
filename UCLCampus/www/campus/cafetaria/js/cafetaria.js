angular.module('ionicApp').controller('CafetariaController', function($scope, CafetariaFactory, resto) {
  $scope.restoList = resto;
})