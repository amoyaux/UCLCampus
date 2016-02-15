angular.module('ionicApp').controller('HallsController', function($scope, $rootScope, LectureHallsFactory) {
  console.log(selectedCampus);
  $scope.lectureHallList =  LectureHallsFactory.all();
})