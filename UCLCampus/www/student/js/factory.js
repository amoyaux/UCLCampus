angular.module('ionicApp').factory('StudentFactory', function() {
  return {    
    studentList : [
    { title: 'Schedule' , icon:'icon ion-calendar', url:'app.schedule'},
    { title: 'LectureHalls' , icon:'icon ion-android-pin', url:'app.lectureHalls'},
    { title: 'Libraries', icon:'icon ion-ios-book', url:'app.libraries'},
    { title: 'Moodle', icon:'icon ion-help', url: 'null',site:'http://moodleucl.uclouvain.be'},
    { title: 'UCLouvain.be', icon:'icon ion-help', url:'null',site:'http://uclouvain.be'}
    ],
    all: function() {
      return this.studentList;
    },
    getItemById: function (id) {
      for(var i=0; i<this.studentList.length; i++) {
        if(this.studentList[i].id==id) return this.studentList[i];
      }
    }
  }
})

angular.module('ionicApp').factory('CampusFactory', function($q, $cordovaGeolocation) {
  return {    
    CampusList : [
    { name : 'Louvain-la-Neuve' , lat : 50.6697251, lon : 4.6127398},
    { name : 'Woluwe', lat : 50.8528164, lon : 4.45053}
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

angular.module('ionicApp').factory('LectureHallsFactory', function($cordovaSQLite) {
    return {
      lectureHallList : [
      ],
      all: function() {
        var tempLHL = [];
        var query = "SELECT * FROM poi WHERE TYPE = 'auditoire' AND CAMPUS = ?";
        $cordovaSQLite.execute(db, query, [selectedCampus.name]).then(function(res) {
            for(var i=0; i<res.rows.length; i++) {
              tempLHL[i]=res.rows.item(i);
            }
        }, function (err) {
            console.error(JSON.stringify(err));
        }); 
        this.lectureHallList = tempLHL;
        return tempLHL;
      },
      getLectureHallById: function (id) {
        for(var i=0; i<this.lectureHallList.length; i++) {
          if(this.lectureHallList[i].ID==id) return this.lectureHallList[i];
        }
      }


  }
})

angular.module('ionicApp').factory('LibraryFactory', function($q, $cordovaSQLite) {
    return {
      libraryList : [
      ],
      all: function() {
        var d = new Date(); //DATE
        var n = d.getDay()-1; //CURRENT DAY
        var h = d.getHours(); //CURRENT HOUR
        var m = d.getMinutes(); //CURRENT MINUTE
        var dfd = $q.defer();
        var t = this;
        var query = "SELECT * FROM poi, bibliotheque_horaire WHERE poi.TYPE = 'bibliotheque' AND poi.ID == bibliotheque_horaire.BUILDING_ID AND DAY = ?";
        $cordovaSQLite.execute(db, query, [n]).then(function(res) {
            for(var i=0; i<res.rows.length; i++) {
              t.libraryList[i] = res.rows.item(i);
              var begin = res.rows.item(i).BEGIN_TIME;
              var end = res.rows.item(i).END_TIME;
              if((h*60)+m>begin && (h*60)+m<end) {
                t.libraryList[i].OPEN = true;
              }
              else {
                t.libraryList[i].OPEN = false;
              }

            }
            dfd.resolve(t.libraryList);
        }, function (err) {
            console.error(JSON.stringify(err));
        });
        return dfd.promise;
      },
      getLibraryById: function (id) {
        for(var i=0; i<this.libraryList.length; i++) {
          if(this.libraryList[i].ID==id) return this.libraryList[i];
        }
      }


  }
})
