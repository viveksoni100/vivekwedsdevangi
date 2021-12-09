//////////////////////////////////////////
// INDEX ////////////////////////////////
// TABLE OF CONTENT ////////////////////
// 1. Google Map code /////////////////
// 2. BACKGROUND SLIDER //////////////
// 3. CountDown /////////////////////
// 4. Contact Form Validation //////
///////////////////////////////////
/////////// END OF INDEX /////////
/////////////////////////////////




(function ($) {

"use strict";


////////////////////////////////////////////////
/////////// 1. code for Google Map /////////////
///////////////////////////////////////////////


var map;

map = new GMaps({
	el: '#gmap',
	lat: 34.056772,
	lng: -118.244174,
	scrollwheel:false,
	zoom: 16,
	zoomControl : true,
	panControl : true,
	streetViewControl : true,
	mapTypeControl: false,
	overviewMapControl: false,
	clickable: true
});

var image = '';
map.addMarker({
	lat: 34.056772,
	lng: -118.244174,
	infoWindow: {
	  content: '<p class="map-info"><strong>Los Angeles</strong> <br/> Angel Street 146, B16 <br/> (058) 569 3668</p>'
	}
});
map.addMarker({
	lat: 34.056459,
	lng: -118.247132,
	infoWindow: {
	  content: '<p class="map-info"><strong>Los Angeles</strong> <br/> Olvera Street <br/> (058) 569 3668</p>'
	}
});
map.addMarker({
	lat: 34.057469,
	lng: -118.237551,
	infoWindow: {
	  content: '<p class="map-info"><strong>Los Angeles</strong> <br/> Grand Park <br/> (058) 569 3668</p>'
	}
});


var styles = [ 

{
	"featureType": "road",
	"stylers": [
	{ "color": "#ffffff" }
	]
},{
	"featureType": "water",
	"stylers": [
	{ "color": "#99b3cc" }
	]
},{
	"featureType": "landscape",
	"stylers": [
	{ "color": "#f2efe9" }
	]
},{
	"elementType": "labels.text.fill",
	"stylers": [
	{ "color": "#d3cfcf" }
	]
},{
	"featureType": "poi",
	"stylers": [
	{ "color": "#ded2ac" }
	]
},{
	"elementType": "labels.text",
	"stylers": [
	{ "saturation": 1 },
	{ "weight": 0.1 },
	{ "color": "#000000" }
	]
}

];

map.addStyle({
	styledMapName:"Styled Map",
	styles: styles,
	mapTypeId: "map_style"  
});

map.setStyle("map_style");

///////////////////////////////////////
// 2. BACKGROUND SLIDER //////////////
/////////////////////////////////////

$(document).on('ready', function() {

  // pretty photo activator
  $("a[data-gal^='prettyPhoto']").prettyPhoto();

  var i =0; 
  var images = [
  	// add your image url here
	'images/slider/image-1.jpg',
	'images/slider/image-2.jpg',
	'images/slider/image-3.jpg',
	'images/slider/image-4.jpg'
  ];
  // grabing the container of slider
  var image = $('#header');
  //Change image at regular intervals
  setInterval(function(){   
   image.fadeOut(1000, function () {
   image.css('background-image', 'url(' + images [i++] +')');
   image.fadeIn(1000);
   });
   if(i == images.length)
    i = 0;
  }, 5000);            
 });



///////////////////////////////////////////////////////
/////////////// 3. code for CountDown ////////////////
/////////////////////////////////////////////////////

// add your wedding time
var futuredate=new cdtime("countdown-wrap", "April 20, 2015 04:30:00");
futuredate.displaycountdown("days", formatresults);



///////////////////////////////////////////////////
////////////// 4. contact form validation ////////
/////////////////////////////////////////////////

// Function that validates email address through a regular expression.
function validateEmail(email_val) {
	var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		if (filter.test(email_val)) {
		return true;
	}
	else {
		return false;
	}
}
// getting input fields.
var name = $('.contact-form input.name');
var peoples = $('.contact-form select.peoples');
var events = $('.contact-form select.events');
var email = $('.contact-form input.email');


// removing response 
name.on('focus', function () {
	name.removeClass('error');
	$('.contact-form p.output').remove();
});
email.on('focus', function () {
	email.removeClass('error');
	$('.contact-form p.output').remove();
});
peoples.on('focus', function () {
	peoples.removeClass('error');
	$('.contact-form p.output').remove();
});
events.on('focus', function () {
	events.removeClass('error');
	$('.contact-form p.output').remove();
});


// making validation while form submission
$('.contact-form').on('submit', function () {


	var email_val = email.val();

	if (name.val() === '') {
		name.addClass('error');
		return false;
	}
	else if ( validateEmail(email_val) === false ) {
		email.addClass('error');
		return false;
	}
	else if ( peoples.val() === '' ) {
		peoples.addClass('error');
		return false;
	}
	else if ( events.val() === '' ) {
		events.addClass('error');
		return false;
	}
	else if (name.val()!=='' && peoples.val()!=='' && events.val()!=='' &&  validateEmail(email_val)==true) {

		// sending value with ajax request
		$.post('sendemail.php', $(this).serialize(), function (response) {
			$('.contact-form').append(response);
		});
		$(this).find('input').val('');

		return false;
	}
});




})(jQuery);