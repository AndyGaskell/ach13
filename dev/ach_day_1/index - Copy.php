<!DOCTYPE html>
<html>
<head>
  <title>Geoloc</title>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js" type="text/javascript"></script>



<script src="http://connect.soundcloud.com/sdk.js"></script>
<script src="https://w.soundcloud.com/player/api.js"></script>


<script>
SC.initialize({
  client_id: '50dbb3d992f26263a4faa948a1b0c598'
});

var tracks_data = new Array();
var tracks_count;
tracks_count = 0;
var data_string = "b";


// find all sounds of buskers licensed under 'creative commons share alike'
SC.get('/tracks', { q: 'ach13' }, function(tracks) {
   //console.log(tracks);
   tracks_data = tracks;

   
});

//50dbb3d992f26263a4faa948a1b0c598
//7aaf73f3861af991b32307901b67ebea


//var track_url = 'http://soundcloud.com/forss/flickermood';
//SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
//  console.log('oEmbed response: ' + oEmbed);
//});



//p1=position.coords.latitude;
//p2=position.coords.longitude;


var count = 0;
alert("tracks data array");
for (var i in tracks_data) {
    //alert(tracks_data[i].permalink_url);
    
    data_string += tracks_data[i].permalink_url + "<br>";
    data_string += tracks_data[i].user.username + "<br>";
    data_string += tracks_data[i].tag_list + "<br>";
    data_string += tracks_data[i].created_at + "<br>";
    
    var tag_list = tracks_data[i].tag_list;
    
    var parts = tag_list.split(" "), i, l;
    for (i = 0, l = parts.length; i < l; i += 1) {
        //$("#" + parts[i]).text(parts[i + 1]);
        data_string += "part: " + parts[i] + "<br>";
    }
    
    
    data_string += "<br>";
    count++;
}


data_string = "<h3>count: " + count + "</h3>" + data_string;


//document.getElementById('#output').innerHTML = data_string;

//alert("" +position.coords.latitude +","+ position.coords.longitude);

//alert(data_string);

</script>




</head>
<body>

<h1>SoundCloud 1</h1>

<div id="output"></div>

<div id="geo"></div><br>
<div id="state"></div><br>
<div id="city"></div><br>
<div id="street"></div><br>
<div id="zip"></div>

<h2>Near By</h2>
<div id="places"></div>

<script>
$( document ).ready(function() {
   $('#output').html(data_string);
});


</script>
</body>
</html>
