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
