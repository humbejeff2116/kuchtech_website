(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


// const L = require('leaflet')


 var map = L.map('map').setView([7.6867004, 8.4921678], 13);

// var map = L.map('map').setView([51.505, -0.09], 13);





const mapboxOptions = {
    z : '12',
    x : '2144',
    y: '1960',
    idPart1: 'mapbox',
    idPart2:'streets-v11',
    BASE_URL: window.location.origin,
    accessToken: 'pk.eyJ1IjoiaHVtYmUiLCJhIjoiY2wxMzliN3EzMDRwMzNnbXgzMmp3YWt1ZCJ9.v03oSUaKsH5td9g4AZK-ZA'
};

// (async function( {z, x, y, idPart1, idPart2, BASE_URL, accessToken }) {


//     const mapBoxStyles = await fetch(`${BASE_URL}/api.mapbox.com.styles/${idPart1}/${idPart2}/${z}/${x}/${y}/${accessToken}`)

//     // const extractJSON = await mapBoxStyles.json();

//     L.tileLayer(mapBoxStyles, {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         tileSize: 512,
//         zoomOffset: -1,
//     }).addTo(map);

// })(mapboxOptions);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoiaHVtYmUiLCJhIjoiY2wxMzliN3EzMDRwMzNnbXgzMmp3YWt1ZCJ9.v03oSUaKsH5td9g4AZK-ZA'
// }).addTo(map);


L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
	// subdomains: 'abcd',
	maxZoom: 21
}).addTo(map);

L.circleMarker([43.659752, -79.378161]).addTo(map)
	.bindPopup(
		'MON 304<br>' + 
		'Monetary Times Building<br>' +
		'341 Victoria Street<br>' + 
		'Toronto, Ontario, Canada<br>' +
		'M5B 2K3<br><br>' + 
		'Tel: 416-9795000 Ext. 5192'
	)
	.openPopup();


  
},{}]},{},[1]);
