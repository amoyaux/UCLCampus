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
