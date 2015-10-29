angular.module('starter', ['ionic'])

.controller('TodoCtrl', function($scope, $ionicModal) {


  // Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }
  $scope.slide = function(index) {
    $ionicSlideBoxDelegate.slide(index);
  };

});

