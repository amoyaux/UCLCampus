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
    };
  })
