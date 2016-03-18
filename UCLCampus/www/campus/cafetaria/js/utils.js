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