app.controller('SearchCtrl', ['$scope', '$rootScope', '$ionicPopup', 'DataService',
      function ($scope, $rootScope, $ionicPopup, DataService) {

        $scope.searchFocus = false;
        $scope.fadeInOut = "fadeOut";
        $scope.icon = "ion-search";
        $scope.data = {};

        $scope.showCustomImg = true;
        $scope.showDeleteImg = false;

        $scope.holdItem = function () {
            $scope.showDeleteImg = !$scope.showDeleteImg;
        }


        $scope.auditoriums = auditoriums;
        $scope.entertainment = entertainment;
        $scope.transport = transport;

        list = concat(locations);

        $scope.showHideCustom = function () {
            $scope.showCustom = !$scope.showCustom;
        }

        $scope.showSearch = function () {
            $scope.searchFocus = true;
            $scope.fadeInOut = "fadeIn";
            $scope.icon = "ion-close";
            setTimeout(function () {
                $scope.fadeInOut = "fadeIn front";
            }, 1000);
        }

        $scope.hideSearch = function () {
            $scope.searchFocus = false;
            if ($scope.data !== undefined)
                $scope.data.search = "";
            $scope.fadeInOut = "fadeOut";
            $scope.icon = "ion-search";
            setTimeout(function () {
                $scope.fadeInOut = "fadeOut back";
            }, 1000);
        }

        $scope.search = function () {
            DataService.searchbuildings($scope.data.search).then(
                function (matches) {
                    $scope.results = matches;
                }
            )
            DataService.searchStreets($scope.data.search).then(
                function (matches) {
                    $scope.streetsResults = matches;
                }
            )
        }

        $scope.showDeleteDialog = function (id, index) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete ' + id + ' ?',
                cancelText: 'No',
                okText: 'Yes',
                okType: 'button-assertive'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $rootScope.customPins.splice(index, 1);
                    localforage.setItem('customPins', $rootScope.customPins);
                    $rootScope.resetMap();
                } else {
                    $scope.holdItem();
                }
            });
        };

        $scope.delete = function (id, index) {
            $scope.showDeleteDialog(id, index);
        }


}]);