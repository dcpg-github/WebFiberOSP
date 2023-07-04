// This is the primary javascript source for WebFiberOSP

// this is jquery shorthand
$(function() {

var map = L.map('map').setView([33.6049777,-112.4547048], 8);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

});

