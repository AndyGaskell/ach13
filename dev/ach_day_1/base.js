var watchID = navigator.geolocation.watchPosition(function(position) {  
  document.getElementById('geo').innerHTML ="" +position.coords.latitude +","+ position.coords.longitude
   p1=position.coords.latitude;
  p2=position.coords.longitude;
  converttocity(p1,p2);
  findstuff(p1,p2,"wine");
  alert("" +position.coords.latitude +","+ position.coords.longitude);  
} ,
function(position){  
  alert("Error getting position" );  
} 
, {enableHighAccuracy:true, maximumAge:30000, timeout:27000}
);  

function converttocity(p1,p2){
  url="http://where.yahooapis.com/geocode?q="+p1+","+p2+"&gflags=R&appid=ilbsgu7a&flags=J"
  $.getJSON(url,function(data) {
      city=data.ResultSet.Results[0].city;
      uzip=data.ResultSet.Results[0].uzip;
      //alert(city)
      document.getElementById('state').innerHTML =""+data.ResultSet.Results[0].state;
      document.getElementById('street').innerHTML =""+data.ResultSet.Results[0].line1;
      document.getElementById('city').innerHTML =""+city;
       document.getElementById('zip').innerHTML =""+uzip;
      

  });
}

function findstuff(p1,p2,stuff){

// JSON/Atom Custom Search API
// name ffgeoloc
// API key AIzaSyBRqkq8vYqlDHjL0-HvxN4OWKk3PVJ-rCg
loc=p1+","+p2;
//loc="uk";

//url="https://www.googleapis.com/customsearch/v1?cx=010586739161245136485:zzpukpzzijk&q="+stuff+"&gl="+loc+"&_h=1&key=AIzaSyBRqkq8vYqlDHjL0-HvxN4OWKk3PVJ-rCg&alt=json";
url="http://ajax.googleapis.com/ajax/services/search/local?v=1.0&sll="+loc+"&radius=1&q="+stuff+"%20loc:"+loc+"&key=AIzaSyBRqkq8vYqlDHjL0-HvxN4OWKk3PVJ-rCg&callback=?";
//url="http://jspnet.computing.dundee.ac.uk/geo/Findstuff";
  $.getJSON(url,function(d1) {
    results=d1.responseData.results;
    Places="";
     for (i=0;i<results.length;i++){
        place=results[i];
        title=place.title;
        address="<address>";
        for (j=0;j<place.addressLines.length;j++){
           address=address+place.addressLines[j]+"<br>";
        }
        address=address+"</address>";
        phone=place.phoneNumbers[0].number;
        Places=Places+"<h2>"+title+"</h2>"+address+"<br>"+phone;
     }
     document.getElementById('places').innerHTML =""+Places;
     
  });

}
