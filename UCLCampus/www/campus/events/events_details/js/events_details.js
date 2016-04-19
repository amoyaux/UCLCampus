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