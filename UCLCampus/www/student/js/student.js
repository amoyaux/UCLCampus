angular.module('ionicApp').controller("StudentController", function($scope, $state, $cordovaNetwork, $rootScope, StudentFactory) {
  $scope.studentList = StudentFactory.all();
  $scope.selectedCampus = selectedCampus;
  $rootScope.openUrl = function(val){
    console.log("open url");
    console.log(window.Connection); 
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE){
        $ionicPopup.alert({
          title: "Internet Disconnected",
          content: "The internet is disconnected on your device."
        })
      }
      else{
        window.open(val, '_blank', 'location=no');
      }
    }
  }
});

angular.module('ionicApp').filter("filterCampus", function() {
  return function(studentList, selectedCampus) {
    return studentList.filter(function(item){
      if(item.campus.length == 0) return true;
      else {
        for(var i =0; i<item.campus.length; i++) {
          if(item.campus[i] == selectedCampus.name) return true;
        }
        return false;
      }
    });
  }

})