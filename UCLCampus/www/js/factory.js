angular.module('ionicApp').factory('StudentFactory', function() {
  return {    
    studentList : [
    { title: 'Schedule' , icon:'icon ion-calendar', url:'app.home'},
    { title: 'LectureHalls' , icon:'icon ion-android-pin', url:'app.lectureHalls'},
    { title: 'Libraries', icon:'icon ion-ios-book', url:'app.home'},
    { title: 'Moodle', icon:'icon ion-help', site:'http://moodleucl.uclouvain.be'},
    { title: 'UCLouvain.be', icon:'icon ion-help', site:'http://uclouvain.be'}
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

angular.module('ionicApp').factory('LectureHallsFactory', function($cordovaSQLite) {
    return {
      lectureHallList : [
      ],
      all: function() {
        var tempLHL = [];
        this.lectureHallList[0] = { title: 'Croix du Sud (SUD)', img:'img/ste-barbe.jpg', address:'Place Croix du Sud', id:'1'};
        var query = "SELECT * FROM lecturehalls";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
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
          if(this.lectureHallList[i].id==id) return this.lectureHallList[i];
        }
      }


  }
})