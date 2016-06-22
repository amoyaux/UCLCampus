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
