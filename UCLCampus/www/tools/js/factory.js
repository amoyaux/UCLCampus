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
    
angular.module('ionicApp').factory('ToolsMenuFactory', function() {
  return {    
    toolsMenuList : [
    { title: 'Maps' , icon:'icon ion-map royal', url:'app.maps', campus:['Louvain-la-Neuve']}
    ],
    all: function() {
      return this.toolsMenuList;
    },
    getItemById: function (id) {
      for(var i=0; i<this.toolsMenuList.length; i++) {
        if(this.toolsMenuList[i].id==id) return this.toolsMenuList[i];
      }
    }
  }
})
