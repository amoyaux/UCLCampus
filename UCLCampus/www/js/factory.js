angular.module('ionicApp').factory('CampusFactory', function($q, $cordovaGeolocation) {
  return {    
    CampusList : [
    { name : 'Louvain-la-Neuve' , lat : 50.6697251, lon : 4.6127398, maxzoom: 14},
    { name : 'Woluwe', lat : 50.8528164, lon : 4.45053, maxzoom: 17},
    { name : 'Mons' , lat : 50.452884, lon : 3.984310, maxzoom: 17},
    { name : 'Tournai', lat: 50.636785, lon : 3.351833, maxzoom: 17},
    { name : 'Bruxelles Saint-Gilles', lat: 50.821367, lon: 4.350055, maxzoom: 17},
    { name : 'Charleroi', lat: 50.408140, lon: 4.448352, maxzoom: 17}
    ],
    toRadians: function(value) {
        /** Converts numeric degrees to radians */
      return value * Math.PI / 180;
    },
    getDistance: function(lat1, lat2, lon1, lon2) {
      var R = 6371000; // metres
      var d1 = this.toRadians(lat1);
      var d2 = this.toRadians(lat2);
      var da = this.toRadians(lat2-lat1);
      var db = this.toRadians(lon2-lon1);

      var a = Math.sin(da/2) * Math.sin(da/2) +
              Math.cos(d1) * Math.cos(d2) *
              Math.sin(db/2) * Math.sin(db/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      var d = R * c;
      return d;
    },
    all: function() {
      return this.CampusList;
    },
    getItemById: function (id) {
      for(var i=0; i<this.CampusList.length; i++) {
        if(this.CampusList[i].id==id) return this.CampusList[i];
      }
    },
    getClosestCampus: function() {
      var dfd = $q.defer();
      var posOptions = {timeout: 2000, enableHighAccuracy: false};
      var t = this;
      $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(function (position) {
          var lat  = position.coords.latitude
          var lon = position.coords.longitude
          var currentMin = t.getDistance(lat, t.CampusList[0].lat, lon, t.CampusList[0].lon);
          var currentCampus = t.CampusList[0];
          for(var i = 1; i<t.CampusList.length; i++) {
            var dist = t.getDistance(lat, t.CampusList[i].lat, lon, t.CampusList[i].lon);
            if(dist<currentMin) {
              currentMin = dist;
              currentCampus = t.CampusList[i];
            }
          }
          dfd.resolve(currentCampus);
        }, function(err) {
          console.log("failed to get location");
          dfd.resolve(undefined);
        });
        return dfd.promise;
    }
  }
})



