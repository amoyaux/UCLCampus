angular.module('ionicApp').controller('HallsController', function($scope, $rootScope, LectureHallsFactory) {
  console.log(selectedCampus);
  $scope.lectureHallList =  LectureHallsFactory.all();
})

angular.module('ionicApp').controller('HallDetailsController', function($scope, $stateParams, LectureHallsFactory, $state, $rootScope) {
  $scope.lectureHall= LectureHallsFactory.getLectureHallById($stateParams.id);

})