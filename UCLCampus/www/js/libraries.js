angular.module('ionicApp').controller('LibrariesController', function($scope, LibraryFactory, libraries) {
  $scope.libraryList =  libraries;
})