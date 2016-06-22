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
          if(this.lectureHallList[i].ID==id){
            console.log(this.lectureHallList[i].ABBR);
            return this.lectureHallList[i];
          } 
        }
      }


  }
})
