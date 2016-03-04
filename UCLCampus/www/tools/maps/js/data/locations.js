var categories = ["audit","entertainment", "transport"];

var locations = [
    auditoriums,
    entertainment,
    transport    
];

var markers = {
    audit: auditoriumsMarker,
    entertainment: entertainmentMarker,
    transport: transportMarker
};

var list = [], streetList = [];

function concat(list){
   var results = [];
   for(array in list){
        results = results.concat(list[array]);   
   }
   return results;
}