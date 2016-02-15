angular.module('ionicApp').controller('LibrariesController', function($scope, LibraryFactory, libraries) {
  $scope.libraryList =  libraries;
})

angular.module('ionicApp').controller('LibraryDetailsController', function($scope, $stateParams, LibraryFactory) {
  $scope.library= LibraryFactory.getLibraryById($stateParams.id);
})