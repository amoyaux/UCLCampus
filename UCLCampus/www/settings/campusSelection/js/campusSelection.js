angular.module('ionicApp').controller('CampusSelectionController', function($scope, $rootScope, $state, CampusFactory,$ionicPlatform) {
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