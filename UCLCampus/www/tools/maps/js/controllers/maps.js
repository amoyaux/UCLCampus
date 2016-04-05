app.controller("MapsController", function ($scope, $rootScope, $stateParams, $ionicSideMenuDelegate, $timeout, geolocation, buildings, urlmatcher) {

    //default location to center on if no user plotted 
    var station = L.marker([50.669591, 4.615706]);

    $rootScope.target = false;
    
    L.AwesomeMarkers.Icon.prototype.options.prefix = 'ion';

    //stateparams updated on url change
    $scope.$on('$locationChangeSuccess', function (event) {
        if ($ionicSideMenuDelegate.$getByHandle('search').isOpen()) {
            fromSearch = true;
            $ionicSideMenuDelegate.$getByHandle('search').toggleRight(false);
        }
        $stateParams = urlmatcher.getParams();
        $rootScope.activeMarker = buildings.getMarker($stateParams.id);
        $rootScope.target = true;
        $rootScope.map.setView($rootScope.activeMarker[0]._latlng, 18, {
            animate: true
        });
        $rootScope.map.on('moveend', function (e) {
            console.log("moved");
            if ($rootScope.target) {
                $rootScope.activeMarker[0].openPopup();
                $rootScope.target = false;
            }
        });
    });

    //markers for buildings
    $rootScope.markers = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
            return L.AwesomeMarkers.icon({
                markerColor: 'darkpurple',
                html: cluster.getChildCount()
            })
        },
        disableClusteringAtZoom: 17,
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        maxClusterRadius: 40
    });

    //default icon for user
    var userIcon = L.divIcon({
        html: '<img src="img/maps/arrow.png"/>',
        className: "user-icon",
        opacity: 0
    });

    //initialize map
    $rootScope.map = L.map('map', {
        zoomControl: false,
        //hide attributions to prevent not intent event
        attributionControl: false,
        fadeAnimation: true,
        zoomAnimation: true,
        markerZoomAnimation: true,
        maxZoom: 18
    }).setView(station.getLatLng(), 14);

    $rootScope.map.on('popupopen', function (centerMarker) {
            var cM = $rootScope.map.project(centerMarker.popup._latlng);
            cM.y -= centerMarker.popup._container.clientHeight / 2
            $rootScope.map.setView($rootScope.map.unproject(cM), 18, {
                animate: true
            });
    });

    $rootScope.map.addLayer($rootScope.markers);

    $rootScope.map.on("click", function (e) {
        $ionicSideMenuDelegate.$getByHandle('search').toggleRight(false);
    });

    //add tiles to map
    L.tileLayer('img/maps/tiles/{z}/{x}/{y}.jpg', {
        attribution: '<span>&copy; <a href="http://osm.org/copyright">OpenStreetMap</a></span>',
        maxZoom: 18,
        minZoom: 13,
        unloadInvisibleTiles: false,
    }).addTo($rootScope.map);

    //find user position
    geolocation.position().then(function (position) {
            var latLngPosition = L.latLng(position.coords.latitude, position.coords.longitude);
            user = new L.Marker(latLngPosition).setIcon(userIcon).addTo($scope.map);
        },
        function (reason) {
            console.log(reason);
        });

    //plot markers for each building in locations.js array
    function plotBuildings() {
        var k = 0;
        var j = 0;
        for (var i in categories) {
            for (var j in locations[i]) {
                k = k + 1;
                $rootScope.markers.addLayer(buildings.plotMarker(categories[i], locations[i][j].id, locations[i][j].pos, locations[i][j].name, locations[i][j].address, locations[i][j].infoId));
            }
        }
    }

    $scope.searchPanel = function () {
        $ionicSideMenuDelegate.$getByHandle('search').toggleRight();
        $ionicSideMenuDelegate.$getByHandle('settings').toggleRight(false);
    };


    plotBuildings();

    //prevent sidemenu dragging
    $timeout(function () {
        $ionicSideMenuDelegate.$getByHandle('search').canDragContent(false);
        $ionicSideMenuDelegate.$getByHandle('settings').canDragContent(false);
    }, 1000);


})