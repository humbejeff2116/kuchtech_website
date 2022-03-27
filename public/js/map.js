

    var map = L.map('map').setView([7.6867004, 8.4921678], 13);

    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 21
    }).addTo(map);

    L.circleMarker([7.6867004, 8.4921678]).addTo(map).bindPopup(

        '<br>Opposite Wino pharmacy wadata<br>' + 
        'Makurdi, Benue state<br><br>' +
        'kuchtech01@gmail.com<br><br>' +
        'Tel 1: 08136745730<br><br>'+
        'Tel 2: 08093456430<br><br>'

    ).openPopup();


    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox/streets-v11',
    //     tileSize: 512,
    //     zoomOffset: -1,
    //     accessToken: 'pk.eyJ1IjoiaHVtYmUiLCJhIjoiY2wxMzliN3EzMDRwMzNnbXgzMmp3YWt1ZCJ9.v03oSUaKsH5td9g4AZK-ZA'
    // }).addTo(map);

    // const mapBoxStyles = await fetch(`${BASE_URL}/api.mapbox.com.styles/${idPart1}/${idPart2}/${z}/${x}/${y}/${accessToken}`)