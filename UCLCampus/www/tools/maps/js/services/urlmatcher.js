app.service('urlmatcher', ['$urlMatcherFactory', '$location', '$state', function ($urlMatcherFactory, $location, $state) {
    return {
        getParams: function () {
            var urlMatcher = $urlMatcherFactory.compile("/app" + $state.current.url);
            return urlMatcher.exec($location.url());
        }
    }
}]);