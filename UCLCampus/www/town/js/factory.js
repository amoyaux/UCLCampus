angular.module('ionicApp').factory('TownMenuFactory', function() {
  return {    
    townMenuList : [
    { title: 'Cinema' , icon:'icon ion-videocamera balanced', url:'app.home', campus:[]}
    ],
    all: function() {
      return this.townMenuList;
    },
    getItemById: function (id) {
      for(var i=0; i<this.townMenuList.length; i++) {
        if(this.townMenuList[i].id==id) return this.townMenuList[i];
      }
    }
  }
})
