window.onload = init;

// current location
var latitude, longitude;

// Google map
var map = null;

// Path
var path = [];

var lastMarker = null;
var mapInterval = 5000  // in milliseconds
var index = 1;

// register the event handler for the button
function init() {
	var startButton = document.getElementById("startBtn");
	startButton.onclick = beginMapRoute;
}

function beginMapRoute() {
    // error functions and options specified    
    var options = {
        enableHighAccuracy : true,
        timeout : 50000,
        maximumAge : 0
    };
    
    navigator.geolocation.getCurrentPosition(displayLocation, handleError, options);

    // disable the start button after clicking it
    document.getElementById("startBtn").disabled = true;      
}

// show initial location and then start the auto updates to the coordinates
function displayLocation(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // setup inital values for the coordinates
    document.getElementById("index").innerHTML = "Update#: " + index;
    document.getElementById("latitude").innerHTML = "Start Latitude: " + latitude;
    document.getElementById("longitude").innerHTML = "Start Longitude: " + longitude;
    document.getElementById("currentLatitude").innerHTML = "Current Latitude: " + latitude;
    document.getElementById("currentLongitude").innerHTML = "Current Longitude: " + longitude;
            
    // Show the google map with the position  
    showOnMap(position.coords);

    // start the automatic movement on the map
    window.setInterval(updateMyLocation, mapInterval);    
}

function handleError(error) {
    switch(error.code) {
        case 1:
            updateStatus("The user denied permission");
            break;
        case 2:
            updateStatus("Position is unavailable");
            break;
        case 3:
            updateStatus("Timed out");
            break;
    }
}

function updateStatus(message) {
    document.getElementById("status").innerHTML = 
        "<strong>Error</strong>: " + message;
}

// initialize the map and show the position
function showOnMap(pos) {    
    var googlePosition = 
        new google.maps.LatLng(pos.latitude, pos.longitude);
    
    var mapOptions = {
        zoom: 15,
        center: googlePosition,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var mapElement = document.getElementById("map");
    map = new google.maps.Map(mapElement, mapOptions);
    
    // add the marker to the map
    var title = "Location Details";
    var content = "Lat: " + pos.latitude + 
                    ", Long: " + pos.longitude;
                    
    addMarker(map, googlePosition, title, content);
}

// add position marker to the map
function addMarker(map, latlongPosition, title, content) {
   
    var options = {
        position: latlongPosition,
        map: map,
        title: title,
        clickable: true
    };
    var marker = new google.maps.Marker(options);

    var popupWindowOptions = {
        content: content,
        position: latlongPosition
    };

    var popupWindow = new google.maps.InfoWindow(popupWindowOptions);

    google.maps.event.addListener(marker, 'click', function() {
        popupWindow.open(map);
    });
    
    return marker;
}

function updateMyLocation()
{
    path = [];

    index++;  // increment the count

    document.getElementById("index").innerHTML = "Update#: " + index;

    // first point  
    var latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);

    latitude += Math.random() / 100;
    longitude -= Math.random() / 100;
    
    document.getElementById("currentLatitude").innerHTML = 
            "Current Latitude: " + latitude;
    document.getElementById("currentLongitude").innerHTML = 
            "Current Longitude: " + longitude;

    // next point
    latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);
  
  
    var line = new google.maps.Polyline({
        path : path,
        strokeColor : '#0000ff',
        strokeOpacity : 1.0,
        strokeWeight : 3
    });
    line.setMap(map);

    map.panTo(latlong);

    if (lastMarker)
        lastMarker.setMap(null);
    // add the new marker
    lastMarker = addMarker(map, latlong, "Your new location", "You moved to: " + latitude + ", " + longitude);
}
