angular.module('ionicApp').factory('EventFactory', function($q, $http) {
  return {
    eventList : [],
    fixedEncodeURIComponent : function(str) {
        return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
    },
    all: function() {
      var t = this;
      console.log(performance.now());
      var dfd = $q.defer();
      var query = "select * from feednormalizer where url='http://louvainfo.be/evenements/feed/calendar/'";
      var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
      var url = "http://query.yahooapis.com/v1/public/yql?q="+ this.fixedEncodeURIComponent(query) + format;
      $http.jsonp(url).success(function(json) {
          t.eventList = json.query.results.rss.channel.item;
          dfd.resolve(json.query.results.rss.channel.item);
      }).error(function(error) {
          dfd.resolve(-1);
      });
      return dfd.promise;
    },
    getEventById: function (id) {
      for(var i=0; i<this.eventList.length; i++) {
        if(this.eventList[i].guid=="event"+id.toString()) return this.eventList[i];
      }
    }
  }
})
