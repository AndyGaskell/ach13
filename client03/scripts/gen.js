// JavaScript Document

SC.initialize({
    client_id: "50dbb3d992f26263a4faa948a1b0c598"
});

var my_lat = 0;
var my_lon = 0;  

$(document).ready(function(){
	
	
	// Begin
	$('#wrapper').on('click', '.grn', function() {
		// Start UI Change
		beginUI();
		
		// load content
		$showContent=setInterval('showContent()',5000);
	});
	
    // get location
    // see if their browser supports geolocation
    if (navigator.geolocation){
        // it does, so let's go
        navigator.geolocation.getCurrentPosition(location_good, location_bad);

    }else{
        // boo, we don't know where they are
        alert("Geolocation is not supported by this browser.");
    }	    


});


function location_good (position) {
    //alert('location good');    
    // store the lat and lon
    my_lat = position.coords.latitude;
    my_lon = position.coords.longitude;    
}

function location_bad() {
    alert('location bad');
}




// Put content tiles on the page
function showContent() {
	// Randomise number of tiles to show in demo
	var $totTiles=1+Math.floor(Math.random()*6);
	for (var $counter = 0; $counter < $totTiles; $counter++) {
		var $rndSize=1+Math.floor(Math.random()*4);	
		switch($rndSize) {
			case 1:	play_soundclound();
						break;
			case 2:	$('#contentTiles').append('<div class="tileLge tileTxt"><img src="img/iconTxt.png"/></div>');
						break;
			case 3:	$('#contentTiles').append('<div class="tileLge tileImg"><img src="img/iconImg.png"/></div>');
						break;
			case 4:	$('#contentTiles').append('<div class="tileLge tileVid"><img src="img/iconVid.png"/></div>');
						break;
		}
	}
	// Content Scroll
	$goScroll = parseInt($(document).height());
	$("html, body").animate({ scrollTop:$goScroll }, 10000);
}



// Start begining audio on the page
function mainAudio() {
	// Example here simply swaps out current iframe source. This is not an example for auto loading from API
	$('#mainAudio iframe').attr('src','http://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F98964070&amp;color=ff6600&amp;auto_play=true&amp;show_artwork=false');
}


// Sets the UI at content startup
function beginUI() {
	// Remove Opening Narrative
	$('#intro').fadeOut(700);
	// Disable 1 Button Styling
	$('.theBtn').css('transition','linear 1s');
	$('.theBtn').addClass('gry');
	// Slide Up Footer
	$('footer').animate({
		bottom:0,
		height:'120px'
	},700, function() {
		// Remove Transition
		$('.theBtn').css('transition','none');
		// Pull Down 1 Button
		$('.theBtn').animate({
			top:'auto',
			bottom:'0px'
		},600, function() {
			//Change Label
			$('.theBtn').html('Playing...');
		});
		// Footer Set
		$('footer').animate({
			height:'30px'
		},600);
	});
}





function play_soundclound(){
    
    // set up all the vars we need
    var data_string = "<br>";
    // handy count variable
    var count = 0;
    // this is an array to store the tidied data
    var tracks_data = new Array();
    // smallest diff, set it to a big default
    var smallest_diff = 999999999;
    // index of smallest
    var nearest_track = 0;
    
    // print the lat and lon
    data_string += "Your latitude is " + my_lat + "<br>";            
    data_string += "Your longitude is " + my_lon + "<br>";        
    data_string += "<br>";        
    
    // do a search of soundcloud for ach13
    SC.get("/tracks", { q: 'ach13'}, function(tracks){
                    
        // loop through all of the search results
        for (var i in tracks) {
            // make a temp array for this track
            var this_track = new Array();
            
            data_string += tracks[i].permalink_url + "<br>";
            data_string += tracks[i].download_url + "<br>";                
            data_string += tracks[i].user.username + "<br>";
            data_string += tracks[i].tag_list + "<br>";
            data_string += tracks[i].created_at + "<br>";
            
            // save some basic variables to the tidy array
            this_track.permalink_url = tracks[i].permalink_url;
            this_track.download_url = tracks[i].download_url;
            this_track.username = tracks[i].user.username;
            
            // get the tags
            var tag_list = tracks[i].tag_list;
            // split the tags
            var parts = tag_list.split(" "), i, l;
            for (i = 0, l = parts.length; i < l; i += 1) {
                // loop through them all
                //data_string += "part: " + parts[i] + "<br>";
                if ( parts[i].indexOf("geo:lat=") !== -1 ) {
                    // this one is lat, so we'll save it out
                    //data_string += "lat: " + parts[i] + "<br>";
                    var lat = parts[i].substr(8);
                    data_string += "lat: " + lat + "<br>";
                    this_track.lat = lat;
                }
                if ( parts[i].indexOf("geo:lon=") !== -1 ) {
                    // this one is lon, so we'll save it out                    
                    //data_string += "lon: " + parts[i] + "<br>";                        
                    var lon = parts[i].substr(8);
                    data_string += "lon: " + lon + "<br>";
                    this_track.lon = lon;                        
                }                    
            }
            
            // find out the diff between here and there
            // lat diff
            var lat_diff =  Math.abs(lat - my_lat);
            data_string += "lat_diff: " + lat_diff + " (" + lat + " - " + my_lat + ")<br>";
            // lon diff
            var lon_diff =  Math.abs(lon - my_lon);
            data_string += "lon_diff: " + lon_diff + " (" + lon + " - " + my_lon + ")<br>";
            // total diff
            var total_diff =  Math.abs(lat_diff - lon_diff);   
            this_track.total_diff = total_diff;      
            data_string += "total_diff: " + total_diff + "<br>";
            
            // see if this is the closest one
            if ( total_diff < smallest_diff ) {
                // this one must have the smalles diff
                smallest_diff = total_diff;
                // then save this as the closest one
                nearest_track = count;
                data_string += "this one is the nearest so far<br>";
            }
            
            // save this tracks data to a tidy array
            tracks_data[count] = this_track;
            
            data_string += "<br>";
            count++;
        }

        data_string += "<hr/>";
        
        for (var i in tracks_data) {
            // print out the tidy array data
            data_string += "Sound #" + i + "<br>";
            data_string += "permalink_url: " + tracks_data[i].permalink_url + "<br>";
            data_string += "download_url: " + tracks_data[i].download_url + "<br>";                
            data_string += "username: " + tracks_data[i].username + "<br>";
            data_string += "lat: " + tracks_data[i].lat + "<br>";
            data_string += "lon: " + tracks_data[i].lon + "<br>";
            data_string += "total_diff: " + tracks_data[i].total_diff + "<br>";                    
            data_string += "<br>";
        }
        
        // get a unique ref for this box, use time in ms
        var d = new Date();
        var track_container_id = "track_" + d.getTime(); 
        
        $('#contentTiles').append('<div class="tileSml tileAud" id="' + track_container_id + '"><img src="img/iconAud.png"/></div>');
        
        
        // play the Nth track
        var url_of_closest = tracks_data[nearest_track].permalink_url;
        SC.oEmbed(url_of_closest, {auto_play: true}, document.getElementById(track_container_id));  
        
        // add some handy info at the top of the debug
        data_string = "<h3>closest one is #" + nearest_track + "</h3>" + data_string;
        data_string = "<h3>Count: " + count + "</h3>" + data_string;
        
        //$('#info_container').html(data_string);
        
    });
}

