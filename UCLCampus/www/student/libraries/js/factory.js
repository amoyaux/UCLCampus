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
        console.log(selectedCampus.name);
        var query = "SELECT * FROM poi, bibliotheque_horaire WHERE poi.TYPE = 'bibliotheque' AND poi.ID == bibliotheque_horaire.BUILDING_ID AND DAY = ? AND CAMPUS = ?";
        $cordovaSQLite.execute(db, query, [n, selectedCampus.name]).then(function(res) {
            t.libraryList = [];
            console.log(res.rows.length);
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
