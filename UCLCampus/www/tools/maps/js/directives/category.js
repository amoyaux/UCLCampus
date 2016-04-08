app.directive("building", function ($rootScope, $ionicSideMenuDelegate, $timeout) {
    return {
        restrict: "E",
        scope: {
            type: "=",
            title: "@",
            color: "@",
            icon: "@"
        },
        templateUrl: 'tools/maps/templates/category.html',
        link: function (scope, element, attrs) {
            scope.buildings = scope.type;
            scope.showBuilding = false,
                scope.resetMenu = function () {
                    scope.showBuilding = false;
                };
            scope.showHideBuilding = function () {
                if (scope.showBuilding) {
                    scope.showBuilding = false;
                } else {
                    scope.showBuilding = true;
                }
            }
        }
    }
})