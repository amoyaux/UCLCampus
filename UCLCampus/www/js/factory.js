angular.module('ionicApp').factory('StudentFactory', function() {
  return {    
    studentList : [
    { title: 'Schedule' , icon:'icon ion-calendar', url:'app.schedule', campus:[]},
    { title: 'LectureHalls' , icon:'icon ion-android-pin', url:'app.lectureHalls', campus:[]},
    { title: 'Libraries', icon:'icon ion-ios-book', url:'app.libraries', campus:[]},
    { title: 'Moodle', icon:'icon ion-ios-world-outline', url: 'null',site:'http://moodleucl.uclouvain.be', campus:[]},
    { title: 'UCLouvain.be', icon:'icon ion-ios-world-outline', url:'null',site:'http://uclouvain.be', campus:[]}
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

angular.module('ionicApp').factory('CampusMenuFactory', function() {
  return {    
    campusMenuList : [
    { title: 'Events (CarpeStudentem)' , icon:'icon ion-calendar energized', url:'app.events', campus:['Louvain-la-Neuve']},
    { title: 'Cercles' , icon:'icon ion-help', icon:'icon ion-beer energized', url:'app.home', campus:[]},
    { title: 'Restaurants universitaires', icon:'icon ion-fork energized', url:'app.cafetaria', campus:['Louvain-la-Neuve','Woluwe','Mons']},
    { title: 'Kots à projets', icon:'icon ion-image energized', url: 'app.home', campus:[]},
    { title: 'Sports', icon:'icon ion-ios-football energized', url:'app.sports', campus:['Louvain-la-Neuve','Woluwe']}
    ],
    all: function() {
      return this.campusMenuList;
    },
    getItemById: function (id) {
      for(var i=0; i<this.campusMenuList.length; i++) {
        if(this.campusMenuList[i].id==id) return this.campusMenuList[i];
      }
    }
  }
})

angular.module('ionicApp').factory('EventFactory', function($q, $http) {
  return {
    eventList : [],
    fixedEncodeURIComponent : function(str) {
        return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
    },
    all: function() {
      var t = this;
      var dfd = $q.defer();
      var query = "select * from feednormalizer where url='http://louvainfo.be/evenements/feed/calendar/'";
      var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
      var url = "http://query.yahooapis.com/v1/public/yql?q="+ this.fixedEncodeURIComponent(query) + format;
      $http.jsonp(url).success(function(json) {
          t.eventList = json.query.results.rss.channel.item;
          dfd.resolve(json.query.results.rss.channel.item);
      }).error(function(error) {
          dfd.resolve(-1);
      });
      return dfd.promise;
    },
    getEventById: function (id) {
      for(var i=0; i<this.eventList.length; i++) {
        if(this.eventList[i].guid=="event"+id.toString()) return this.eventList[i];
      }
    }
  }
})

angular.module('ionicApp').factory('SportsFactory', function($q, $http) {
  return {
    getPage: function(skip) {
      var dfd = $q.defer();
      var url = '';
      if(selectedCampus.name=='Louvain-la-Neuve') url = 'http://ucl-fms01.sipr.ucl.ac.be:82/ucl_sport/recordlist.php?-action=t1&-skip=' + skip;
      if(selectedCampus.name=='Woluwe') url = 'http://ucl-fms01.sipr.ucl.ac.be:82/ucl_sport/recordlist.php?-action=t4&-skip=' + skip;
      $http.get(url).success(function(repsonse) {
          dfd.resolve(repsonse);
      }).error(function(error) {
          console.log("FAIL");
          dfd.resolve(-1);
      });
      return dfd.promise;
    },
    getSports: function(){
      return JSON.parse(localStorage.getItem('sports' + ' ' + selectedCampus.name)) || 'fail';
    }
  }
})

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
        var query = "SELECT * FROM poi, bibliotheque_horaire WHERE poi.TYPE = 'bibliotheque' AND poi.ID == bibliotheque_horaire.BUILDING_ID AND DAY = ? AND CAMPUS = ?";
        $cordovaSQLite.execute(db, query, [n, selectedCampus.name]).then(function(res) {
            for(var i=0; i<res.rows.length; i++) {
              console.log(i);
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
//Obligation d'avoir une entrée entre max dimanche a samedi
angular.module('ionicApp').factory('CafetariaFactory', function($q, $http, $cordovaSQLite) {
  return{
    restoList : [
    ],
    all: function() {
       var dfd = $q.defer();
       var query = "SELECT * FROM Restaurant WHERE CAMPUS = ?";
       var t = this;
       $cordovaSQLite.execute(db, query, [selectedCampus.name]).then(function(res) {
           t.restoList = [];
           for(var i=0; i<res.rows.length; i++) {
              t.restoList[i]=res.rows.item(i);
              t.restoList[i].OPEN = openOrClose(t.restoList[i].MID_DAY,t.restoList[i].EVE_DAY,t.restoList[i].MID_HOURS,t.restoList[i].EVE_HOURS);
            }
            dfd.resolve(t.restoList);
        }, function (err) {
            console.error(JSON.stringify(err));
        });
        return dfd.promise;
    },
    getRestoById: function (id) {
        for(var i=0; i<this.restoList.length; i++) {
          if(this.restoList[i].ID==id) return this.restoList[i];
        }
    }
    // getMenuById: function (id) {
    //   var url = '';
    //   for(var i=0; i<this.restoList.length; i++) {
    //       if(this.restoList[i].ID==id) url = this.restoList[i].WEB;
    //   }
    //   var dfd = $q.defer();
    //   $http.get(url).success(function(repsonse) {
    //       dfd.resolve(repsonse);
    //   }).error(function(error) {
    //       console.log("FAIL");
    //       dfd.resolve(-1);
    //   });
    //   return dfd.promise;
    // }
  }
})
