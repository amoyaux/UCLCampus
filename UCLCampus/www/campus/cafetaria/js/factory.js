    // Copyright (C) 2016  UCL Moyaux Arnold, Baptiste Lacasse

    // This program is free software: you can redistribute it and/or modify
    // it under the terms of the GNU General Public License as published by
    // the Free Software Foundation, either version 3 of the License, or
    // (at your option) any later version.

    // This program is distributed in the hope that it will be useful,
    // but WITHOUT ANY WARRANTY; without even the implied warranty of
    // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    // GNU General Public License for more details.

    // You should have received a copy of the GNU General Public License
    // along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
