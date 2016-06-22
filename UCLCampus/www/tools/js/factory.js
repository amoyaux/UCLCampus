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
