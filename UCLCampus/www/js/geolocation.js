app.service('geolocation', function ($q, $timeout, $rootScope) {

        var posOptions = {
            maximumAge: Infinity,
            timeout: 15000,
            enableHighAccuracy: true
        };

        return {
            position: function () {
                var deferred = $q.defer();
                navigator.geolocation.getCurrentPosition(function (position) {
                    $rootScope.gpsActive = true;
                    $rootScope.$apply(function () {
                        deferred.resolve(position);
                    });
                }, function (err) {
                    deferred.reject()
                }, posOptions);
                return deferred.promise;
            }
        }

    });