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

    var openOrClose = function(day1, day2 , hours1, hours2){
    var associativeArray = {};
      associativeArray["dimanche"] = 0;
      associativeArray["lundi"] = 1;
      associativeArray["mardi"] = 2;
      associativeArray["mercredi"] = 3;
      associativeArray["jeudi"] = 4;
      associativeArray["vendredi"] = 5;
      associativeArray["samedi"] = 6;

      var d = new Date(); //DATE
      var n = d.getDay(); //CURRENT DAY
      var h = d.getHours(); //CURRENT HOUR
      var m = d.getMinutes(); //CURRENT MINUTE

      if(day1 != undefined){
        var mid_day = day1.split('au');
        mid_day[0] = mid_day[0].replace(/\s/g, '');
        mid_day[1] = mid_day[1].replace(/\s/g, '');
      }

      if(n >= associativeArray[mid_day[0]] && n <= associativeArray[mid_day[1]]){
        var hours = hours1.split('à');
        var minutes = [];
        minutes[0] = hours[0].split('h')[1]; 
        hours[0] = hours[0].match(/\d+/)[0];
        minutes[1] = hours[1].split('h')[1];
        hours[1] = hours[1].match(/\d+/)[0];

        date1 = new Date();
        date2 = new Date();

        date1.setHours(hours[0]);
        if(minutes[0] != undefined)date1.setMinutes(minutes[0]);

        date2.setHours(hours[1]);
        if(minutes[1] != undefined)date2.setMinutes(minutes[1]);

        if(d >= date1 && d <= date2){
          return true;
        }
      }

      if(day2 != undefined){
        var eve_day = day2.split('au');
        eve_day[0] = eve_day[0].replace(/\s/g, '');
        eve_day[1] = eve_day[1].replace(/\s/g, ''); 

        if(n >= associativeArray[eve_day[0]] && n <= associativeArray[eve_day[1]]){
        var hours = hours2.split('à');
        var minutes = [];
        minutes[0] = hours[0].match(/\d+/)[1]; 
        hours[0] = hours[0].match(/\d+/)[0];
        minutes[1] = hours[1].match(/\d+/)[1];
        hours[1] = hours[1].match(/\d+/)[0];

        date1 = new Date();
        date2 = new Date();

        date1.setHours(hours[0]);
        if(minutes[0] != undefined)date1.setMinutes(minutes[0]);

        date2.setHours(hours[1]);
        if(minutes[1] != undefined)date2.setMinutes(minutes[1]);

        if(d >= date1 && d <= date2){
          return true;
        }
       }
      }

      return false;
  }