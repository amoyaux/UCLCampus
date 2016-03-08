app.service('buildings', function ($rootScope) {
    return {
        getMarkers: function () {
            return list;
        },
        plotMarker: function plotMarker(type, id, position, name, address, info) {
            var iconMarker = markers[type];
            
            var marker = L.marker(position, {
                icon: iconMarker,
                riseOnHover: true
            });

/*            marker.bindPopup(popup, {
                keepInView: false
            });*/

            marker.on('click', function () {
                this.openPopup();
                location = "#/tab/map/" + id + "/0";
                $scope.userFocus = false;
            });

            marker.on('popupopen', function () {
                $rootScope.id = this.id;
                getDirectionsInformation(this, time);
            });

            marker.id = id;

/*            marker._icon.className += " marker";
            marker._shadow.className += " marker";*/

            return marker;
        }
    }
});