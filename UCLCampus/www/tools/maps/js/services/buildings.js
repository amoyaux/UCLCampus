app.service('buildings', function ($rootScope, $filter) {

    var markersList = [];

    return {

        getMarkers: function () {
            return markersList;
        },
        getMarker: function (id) {
            return $filter('filter')(markersList, function (e) {
                return e.id == id;
            }, true);
        },
        plotMarker: function plotMarker(type, id, position, name, address, info) {
            var iconMarker = markers[type];

            var marker = L.marker(position, {
                icon: iconMarker,
                riseOnHover: true
            });

            var popup = new L.popup({
                className: "custom-popup popup-" + type,
                keepInView: true
            });

            var div = document.createElement("div");
            src = "'img/buildings/" + id + ".jpg'";
            div.innerHTML = '<p class="popupID">' + id + '</p><img style=\'width:200px;\' src=' + src + '/>' +
                '<p style="word-wrap: break-word;">' + name + '</p>' +
                '<p>' + address + '</p>';
            var button = document.createElement("button");
            button.id = "btnGo";
            button.className = "button button-block button-positive";
            button.innerHTML = "Go";
            button.onclick = function () {
                marker.closePopup();
            }
            div.appendChild(button);

            popup.setContent(div);

            marker.bindPopup(popup, {
                keepInView: false
            });

            marker.on('click', function (e) {
                e.originalEvent.preventDefault();
                $rootScope.target = false;
                $rootScope.map.setView(this._latlng, 18, {
                    animate: true
                });
                location = "#/app/maps/" + id + "/0";
                return false;
            });

            marker.on('popupopen', function () {
                $rootScope.id = this.id;
                /*
                                getDirectionsInformation(this, time);
                */
            });

            marker.id = id;

            markersList.push(marker);

            /*            marker._icon.className += " marker";
                        marker._shadow.className += " marker";*/

            return marker;
        }
    }
});