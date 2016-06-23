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
angular.module('ionicApp').factory('SportsFactory', function($q, $http) {
  return {
    getPage: function(skip) {
      var dfd = $q.defer();
      var url = '';
      if(selectedCampus.name=='Louvain-la-Neuve') url = 'http://ucl-fms01.sipr.ucl.ac.be:82/ucl_sport/recordlist.php?-action=t1&-skip=' + skip;
      if(selectedCampus.name=='Woluwe') url = 'http://ucl-fms01.sipr.ucl.ac.be:82/ucl_sport/recordlist.php?-action=t4&-skip=' + skip;
      $http.get(url).success(function(repsonse) {
          console.log(repsonse);
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
