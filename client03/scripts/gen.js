// JavaScript Document
$(document).ready(function(){
	
	// Ensure Backgrounds are Good Sized
	 setBg();
	
	// Begin
	$('#wrapper').on('click', '.grn', function() {
		// Start UI Change
		beginUI();
		
		// Request Soundcloud Audio
		mainAudio();
		
		// Begin Demo Loop
		$doDemo=1;
		if($doDemo==1) {
			$showDemoContent=setInterval('showDemoContent()',5000);
		}
		
	});

});

function addContent($objType, $objURL, $objIMG, $objTxt) {
	// Check Type and Set Accordingly
	switch($objTyp) {
		case 'image':	// Check & Set Image
							if((typeof $objIMG != 'undefined') && (typeof $objURL != 'undefined') ) {
								$('#contentTiles').append('<div class="tileSml" class="tileLge tileImg" style="background-image:url(\''+$objIMG+'\');" onClick="showIMG(\''+$objURL+'\'"><img src="img/iconImg.png"/></div>');
							}
							break;
		case 'video':	// Check & Set Video
							if((typeof $objIMG != 'undefined') && (typeof $objURL != 'undefined') ) {
								$('#contentTiles').append('<div class="tileSml" class="tileLge tileVid" style="background-image:url(\''+$objIMG+'\');" onClick="showVid(\''+$objURL+'\'"><img src="img/iconVid.png"/></div>');
							}
							break;
		case 'audio':	// Check & Set Audio
							if(typeof $objURL != 'undefined') {
								$('#contentTiles').append('<div class="tileSml" class="tileSmle tileAud" onClick="showAud(\''+$objURL+'\'"><img src="img/iconAud.png"/></div>');
							}

							break;
		case 'txt':		// Check & Set Txt
							if(typeof $objTxt != 'undefined') {
								$('#contentTiles').append('<div class="tileSml" class="tileSmle tileTxt" onClick="showTxt(\''+$objURL+'\'"><img src="img/iconTxt.png"/></div>');
							}
							break;
	}
}

// Put content tiles on the page
function showDemoContent() {
	// Randomise number of tiles to show in demo
	var $totTiles=1+Math.floor(Math.random()*6);
	for (var $counter = 0; $counter < $totTiles; $counter++) {
		var $rndSize=1+Math.floor(Math.random()*4);	
		switch($rndSize) {
			case 1:	$('#contentTiles').append('<div class="tileSml tileAud"><img src="img/iconAud.png"/></div>');
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
	  $("html, body").animate({ scrollTop:$goScroll }, 4000);
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

// Background Image Resize
window.onresize = function(event) {
	setBg();
}

function setBg() {
	$ww = $(window).width(); 
	$wh = $(window).height();
	if($ww>$wh) {
		$('#bg').css({'width':'auto'});
		$('#bg').css({'height': $wh + 'px'});
	}else{
		$('#bg').css({'width': $ww + 'px'});
		$('#bg').css({'height':'auto'});
	}
}