// This is the primary javascript source for WebFiberOSP
var map = ''
var resize_timeout = 0
var testline = ''

// this is jquery shorthand
$(function() {

	// $('#btnclear').click(function(e) { clearfields(); });
	$('#btn_vault').click(function(e) { InitTestLine(); });
	$('#btn_panel').click(function(e) { RemoveTestLine(); });
	$(window).resize(function() { ResizeWindow(); });

	PutMapOnPage();
	// InitTestLine();
});

function PutMapOnPage() {
	// this centers on phoenix
	ResizeWindow();
	map = L.map('mapdiv').setView([33.6049777,-112.4547048], 8);
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	maxZoom: 19,
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
	map.on('click', function(e) { MapClick(e); });
	map.on('doubleclick', function(e) { MapDoubleClick(e); });
	map.on('mousemove', function(e) { PointerMove(e); });
}

function InitTestLine() {
	// stub
/*
map click on lat [33.631021950910345] lon [-112.3766500198404]
map click on lat [33.63091475412966] lon [-112.368107111271]
map click on lat [33.62744865299742] lon [-112.36797832370463]
map click on lat [33.62737718552726] lon [-112.37669294902918]

map click on lat [33.631021] lon [-112.376650]
map click on lat [33.630914] lon [-112.368107]
map click on lat [33.627448] lon [-112.367978]
map click on lat [33.627377] lon [-112.376692]
*/

// both of these methods work to put a line on the map.

var pointList = [];
point = new L.LatLng(33.631021, -112.376650);
pointList[pointList.length] = point;
point = new L.LatLng(33.630914, -112.368107);
pointList[pointList.length] = point;
point = new L.LatLng(33.627448, -112.367978);
pointList[pointList.length] = point;
point = new L.LatLng(33.627377, -112.376692);
pointList[pointList.length] = point;

testline = new L.Polyline(pointList, {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
});
testline.addTo(map);

/*
testline = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [ -112.37668592729113, 33.630958412509614 ],
          [ -112.3680471393845, 33.63099928094168 ],
          [ -112.36802259737352, 33.62746408984552 ],
          [ -112.37666138528016, 33.62746408984552 ]
        ],
        "type": "LineString"
      }
    }
  ]
};

L.geoJSON(testline).addTo(map);
*/

}
function RemoveTestLine() {
	testline.remove();
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
	// if (map != null)
		// map.invalidateSize();
}

function MapClick(e) {
	console.log("map click on lat ["+e.latlng.lat+"] lon ["+e.latlng.lng+"]");
}

function MapDoubleClick(e) {
	console.log("map doubleclick on lat ["+e.latlng.lat+"] lon ["+e.latlng.lng+"]");
}

function PointerMove(e) {
	// seems like a lot of work, maybe set a flag
	// console.log("pointer at lat ["+e.latlng.lat+"] lon ["+e.latlng.lng+"]");
	tmplat = e.latlng.lat.toString().split('.');
	lat = tmplat[0]+'.'+tmplat[1].substring(0,6);
	tmplon = e.latlng.lng.toString().split('.');
	lon = tmplon[0]+'.'+tmplon[1].substring(0,6);
	$("#displat").html(lat);
	$("#displon").html(lon);
}

function MoveMap() {
	// use getCenter() and getZoom() to populate the info fields
}

