app.controller("MapsController", function ($scope, $rootScope, geolocation) {

    //default location to center on if no user plotted 
    var station = L.marker([50.669591, 4.615706]);

    //default icon for user
    var userIcon = L.divIcon({
        html: '<img src="img/maps/arrow.png"/>',
        className: "user-icon",
        opacity: 0
    });

    //initialize map
    $scope.map = L.map('map', {
        zoomControl: false,
        //hide attributions to prevent not intent event
        attributionControl: false,
        fadeAnimation: true,
        zoomAnimation: true,
        markerZoomAnimation: true
    }).setView(station.getLatLng(), 14);

    //add tiles to map
    L.tileLayer('img/maps/tiles/{z}/{x}/{y}.jpg', {
        attribution: '<span>&copy; <a href="http://osm.org/copyright">OpenStreetMap</a></span>',
        maxZoom: 18,
        minZoom: 13,
        unloadInvisibleTiles: false,
    }).addTo($scope.map);

    //find user position
    geolocation.position().then(function (position) {
            var latLngPosition = L.latLng(position.coords.latitude, position.coords.longitude);
            user = new L.Marker(latLngPosition).setIcon(userIcon).addTo($scope.map);
        },
        function (reason) {
            console.log(reason);
        });

})