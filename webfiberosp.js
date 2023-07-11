// This is the primary javascript source for WebFiberOSP
var map = '';
var draw_mode = '';
var map_lat = '.';
var map_lon = '.';
var point_list = [];
var test_line = '';
var click_timeout = 0;
var debounce_time = 400;

// unused
var resize_timeout = 0;

// this is jquery shorthand
$(function() {

	// buttons
	$('#btn_vault').click(function(e) { ClickVault(); });
	$('#btn_panel').click(function(e) { ClickPanel(); });
	$('#btn_cable').click(function(e) { ClickCable(); });
	$('#btn_splice').click(function(e) { ClickSplice(); });

	// other actions
	$(window).resize(function() { ResizeWindow(); });

	// initialize the page
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
	// map.on('click', function() { MapClick(); });
	map.on('click', function() { DebounceMapClick(); });
	map.on('dblclick', function() { MapDoubleClick(); });
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

test_line = new L.Polyline(pointList, {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
});
test_line.addTo(map);

/*
test_line = {
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

L.geoJSON(test_line).addTo(map);
*/

}
function RemoveTestLine() {
	test_line.remove();
}

// don't resize immediately, in case we're mid-resize
// after some testing, we don't need to do this -
// the event doesn't get called until the user lets go of the handle
function StartResizeWindowDebounce() {
	console.log("debouncing")
	clearTimeout(resize_timeout)
	resize_timeout = setTimeout(ResizeWindow, 1000)
}

// button click actions
function ClickVault() {
	if (draw_mode != "")
		$("#btn_"+draw_mode).removeClass("active");
	if (draw_mode == "vault") {
		draw_mode = "";
		map.doubleClickZoom.enable();
	} else {
		draw_mode = "vault";
		$("#btn_"+draw_mode).addClass("active");
		map.doubleClickZoom.disable();
	}
}

function ClickPanel() {
	if (draw_mode != "")
		$("#btn_"+draw_mode).removeClass("active");
	if (draw_mode == "panel") {
		draw_mode = "";
		map.doubleClickZoom.enable();
	} else {
		draw_mode = "panel";
		$("#btn_"+draw_mode).addClass("active");
		map.doubleClickZoom.disable();
	}
}

function ClickCable() {
	if (draw_mode != "")
		$("#btn_"+draw_mode).removeClass("active");
	if (draw_mode == "cable") {
		draw_mode = "";
		map.doubleClickZoom.enable();
	} else {
		draw_mode = "cable";
		$("#btn_"+draw_mode).addClass("active");
		map.doubleClickZoom.disable();
	}
}

function ClickSplice() {
	if (draw_mode != "")
		$("#btn_"+draw_mode).removeClass("active");
	if (draw_mode == "splice") {
		draw_mode = "";
		map.doubleClickZoom.enable();
	} else {
		draw_mode = "splice";
		$("#btn_"+draw_mode).addClass("active");
		map.doubleClickZoom.disable();
	}
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

function DebounceMapClick(event) {
	clearTimeout(click_timeout)
	click_timeout = setTimeout(MapClick, debounce_time)
}

function MapClick() {
	console.log("map click on lat ["+map_lat+"] lon ["+map_lon+"]");
	if (draw_mode == "cable") {
		point = new L.LatLng(map_lat, map_lon);
		point_list[point_list.length] = point;
	}
}

function MapDoubleClick() {
	clearTimeout(click_timeout)
	console.log("map doubleclick on lat ["+map_lat+"] lon ["+map_lon+"]");
	if (draw_mode == "cable") {
		point = new L.LatLng(map_lat, map_lon);
		point_list[point_list.length] = point;
		if (test_line != '') 
			test_line.remove();
		test_line = new L.Polyline(point_list, {
    		color: 'red', weight: 3, opacity: 1, smoothFactor: 1
		});
		test_line.addTo(map);
	}
}

function PointerMove(event) {
	// seems like a lot of work, maybe set a flag
	map_lat = event.latlng.lat;
	map_lon = event.latlng.lng;
	tmplat = map_lat.toString().split('.');
	displat = tmplat[0]+'.'+tmplat[1].substring(0,6);
	tmplon = map_lon.toString().split('.');
	displon = tmplon[0]+'.'+tmplon[1].substring(0,6);
	$("#displat").html(displat);
	$("#displon").html(displon);
}

function MoveMap() {
	// use getCenter() and getZoom() to populate the info fields
}

