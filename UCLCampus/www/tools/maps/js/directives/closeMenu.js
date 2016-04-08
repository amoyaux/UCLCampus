app
    .directive('closeMenu', ['$ionicHistory', '$timeout', '$ionicSideMenuDelegate', function ($ionicHistory, $timeout, $ionicSideMenuDelegate) {
        return {
            restrict: 'AC',
            link: function ($scope, $element) {
                $element.bind('click', function () {
                    var sideMenuCtrl = $element.inheritedData('$ionSideMenusController');
                    if (sideMenuCtrl) {
                        $ionicHistory.nextViewOptions({
                            historyRoot: true,
                            disableAnimate: true,
                            expire: 300
                        });
                        // if no transition in 300ms, reset nextViewOptions
                        // the expire should take care of it, but will be cancelled in some
                        // cases. This directive is an exception to the rules of history.js
                        $timeout(function () {
                            $ionicHistory.nextViewOptions({
                                historyRoot: false,
                                disableAnimate: false
                            });
                        }, 300);
                        if ($ionicSideMenuDelegate.isOpen()) {
                            sideMenuCtrl.close();
                        }
                    }
                });
            }
        };
}]);