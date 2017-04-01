// JavaScript Document

//nav
document.getElementById("nav01").innerHTML =
"<ul id='menu'>" +
"<li><a href='/index.html' data-target=index2.html data-title=\"WLPN: Lumpen Radio // Live\" >Live</a></li>" +
"<li><a href='/schedule.html' data-target=schedule2.html data-title=\"WLPN // Schedule\" >Schedule</a></li>" +
"<li><a href='/shows1.html' data-target=shows12.html data-title=\"WLPN // Shows\" >Shows</a></li>" +
"<li><a href='/about.html' data-target=about2.html data-title=\"WLPN // About\" >About</a></li>" + 
"<li><a href='/sponsor.html' data-target=sponsor2.html data-title=\"WLPN // Sponsor\" >Sponsor</a></li>" +
"<li><a href='/swag.html' data-target=swag2.html data-title=\"WLPN // Swag\" >Swag</a></li>" +
"</ul>";


(function() {

	// when the user hits the back button after pushState
	// BUG: Need to update title on back button press
    window.onpopstate = function(evt) {
		if (document.location.pathname === '/') {
			$('.post-container').load('index2.html');
		} else {
			var toLoad = document.location.pathname.replace('.html', '2.html');
			$('.post-container').load(toLoad);
		}
    };

	// adds event observer for pushState support to a link's containing el
    var addObserver = function(evt) {
		evt.preventDefault();

        var linkEl = evt.target;
		var contentEl = $('.post-container');

		// handle logo case
		if (evt.currentTarget.id === 'lsb') {
			linkEl = $(evt.currentTarget).find('a')[0];
		}

        contentEl.load(linkEl.dataset.target);
		document.title = linkEl.dataset.title;
        history.pushState({path: linkEl.dataset.target}, '', linkEl.href);
    };

	// observers for link containers (do after DOM content is all there)
	document.addEventListener("DOMContentLoaded", function(event) {
        document.getElementById('nav01').addEventListener('click', function(evt) {
       	   addObserver(evt);
		});
		document.getElementById('sblinks').addEventListener('click', function(evt) {
		   addObserver(evt);
		});
		document.getElementById('lsb').addEventListener('click', function(evt) {
		   addObserver(evt);
		});
  	});
})();

//mobile
 $(window).resize(function() {
    myWinWidth();
});

function myWinWidth() {
    var winWidth = $(window).width();
    console.log(winWidth);
        if(winWidth > 600){
            $("#nav").addClass("showmenu");
        }else{
            $("#nav").removeClass("showmenu");
        }
    return false;
}

$("#menu-icon").on("click", function(){
        $("#nav").slideToggle();
        $(this).toggleClass("active");
    });


//toggle
$('#togButton').click(function() {
    $('.target').slideToggle(500);
    if( $(this).text() == 'Show' ) {
        $(this).text('Hide');
    } else {
        $(this).text('Show');
    }
});



//video options
$('video').mediaelementplayer({
    // if the <video width> is not specified, this is the default
    defaultVideoWidth: 480,
    // if the <video height> is not specified, this is the default
    defaultVideoHeight: 270,
    // if set, overrides <video width>
    videoWidth: -1,
    // if set, overrides <video height>
    videoHeight: -1,
    // width of audio player
    audioWidth: 400,
    // height of audio player
    audioHeight: 30,
    // initial volume when the player starts
    startVolume: 0.8,
    // useful for <audio> player loops
    loop: false,
    // enables Flash and Silverlight to resize to content size
    enableAutosize: true,
    // the order of controls you want on the control bar (and other plugins below)
    features: ['playpause','progress','current','duration','tracks','volume','fullscreen'],
    // Hide controls when playing and mouse is not over the video
    alwaysShowControls: false,
    // force iPad's native controls
    iPadUseNativeControls: false,
    // force iPhone's native controls
    iPhoneUseNativeControls: false,
    // force Android's native controls
    AndroidUseNativeControls: false,
    // forces the hour marker (##:00:00)
    alwaysShowHours: false,
    // show framecount in timecode (##:00:00:00)
    showTimecodeFrameCount: false,
    // used when showTimecodeFrameCount is set to true
    framesPerSecond: 25,
    // turns keyboard support on and off for this instance
    enableKeyboard: true,
    // when this player starts, it will pause other players
    pauseOtherPlayers: true,
    // array of keyboard commands
    keyActions: []

});
