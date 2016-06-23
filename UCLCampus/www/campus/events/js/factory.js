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
