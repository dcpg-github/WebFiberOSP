// This is the primary javascript source for WebFiberOSP
var map = null
var resize_timeout = 0

// this is jquery shorthand
$(function() {

	// $('#btnclear').click(function(e) { clearfields(); });
	$(window).resize(function() { ResizeWindow(); });

	PutMapOnPage();
});

function PutMapOnPage() {
	// this centers on phoenix
	ResizeWindow();
	map = L.map('mapdiv').setView([33.6049777,-112.4547048], 8);
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	maxZoom: 18,
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
	map.on('click', function(e) { MapClick(e); });
}

// don't resize immediately, in case we're mid-resize
// after some testing, we don't need to do this -
// the event doesn't get called until the user lets go of the handle
function StartResizeWindowDebounce() {
	console.log("debouncing")
	clearTimeout(resize_timeout)
	resize_timeout = setTimeout(ResizeWindow, 1000)
}

// resize the map div and force render
function ResizeWindow() {
	// we give 5 extra pixels for a tiny gap at the bottom
	newheight = $(window).height() - ($("#topnav").height() + 5);
	// alert("resizing to "+newheight+" height")
	$("#mapdiv").height(newheight);
	// force map to re-render
	// FIXME - this was throwing an error
	if (map != null)
		map.invalidateSize();
}

function MapClick(e) {
	console.log("map click on lat ["+e.latlng.lat+"] lon ["+e.latlng.lng+"]");
}

