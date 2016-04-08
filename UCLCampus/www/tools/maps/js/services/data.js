app.factory('DataService', function ($q, $timeout) {

        var totalResults = 0;

        var searchbuildings = function (searchFilter) {
            totalResults = 0;
            var deferred = $q.defer();
            if (searchFilter.length >= 1) {
                var matches = list.filter(function (item) {
                    if (item.id !== undefined && item.address !== undefined) {
                        if (item.id.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 || item.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 || item.address.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1) return true;
                    } else {
                        if (item.id.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1) return true;
                    }
                })
                $timeout(function () {
                    deferred.resolve(matches);
                    totalResults += deferred.promise.$$state.value.length;
                    if (deferred.promise.$$state.value.length > 20) {
                        deferred.promise.$$state.value = deferred.promise.$$state.value.slice(0, 10);
                    }
                }, 100);
            }

            return deferred.promise;
        };

        var searchStreets = function (searchFilter) {
            var deferred = $q.defer();

            if (searchFilter.length >= 1) {
                var matches = streetList.filter(function (item) {
                    if (item.id.toLowerCase().indexOf(
                            searchFilter.toLowerCase()) !== -1)
                        return true;

                });
                $timeout(function () {
                    deferred.resolve(matches);
                    totalResults += deferred.promise.$$state.value.length;
                    if (totalResults > 20) {
                        deferred.promise.$$state.value = deferred.promise.$$state.value.slice(0, 10);
                    }
                }, 100);
            }
            return deferred.promise;
        };

        return {
            searchbuildings: searchbuildings,
            searchStreets: searchStreets
        };
    })