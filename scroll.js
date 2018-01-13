//Function that moves the header upward once a user has scrolled down a certain distance
$(document).ready(function(){ 
var login = $('.login');
var head = $('.head');
var signup = $('.signupt');

var detectZone = 25;

$(document).scroll(function(){
	
	if ((detectZone) < $(window).scrollTop()){
		head.animate({top: "-30px"}, 100);
		login.animate({top: "-30px"}, 100);
		signup.animate({top: "-30px"}, 100);
	}
	else {
		head.stop(true).animate({top: '1px'}, 100);
		login.stop(true).animate({top: '1px'}, 100);
		signup.stop(true).animate({top: '1px'}, 100);
	}
});