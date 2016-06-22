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
