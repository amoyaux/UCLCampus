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
angular.module('ionicApp').factory('CampusMenuFactory', function() {
  return {    
    campusMenuList : [
    { title: 'Events (CarpeStudentem)' , icon:'icon ion-calendar energized', url:'app.events', campus:['Louvain-la-Neuve']},
    { title: 'Cercles' , icon:'icon ion-help', icon:'icon ion-beer energized', url:'app.home', campus:[]},
    { title: 'University Restaurants', icon:'icon ion-fork energized', url:'app.cafetaria', campus:['Louvain-la-Neuve','Woluwe','Mons']},
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
