window.onload = init;

// register the event handler for the button

function init() {
	var checkButton = document.getElementById("checkButton");
	checkButton.onclick = getLocation;
}

function getLocation() {
    
    // asynchronous call with callback success, 
    // error functions and options specified
    
    var options = {
        enableHighAccuracy : true,
        timeout : 50000,
        maximumAge : 0
    };
    
    navigator.geolocation.getCurrentPosition(
        displayLocation, handleError, options);
}

function displayLocation(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    var timestamp = position.timestamp;

    document.getElementById("latitude").innerHTML = 
            "Latitude: " + latitude;
    document.getElementById("longitude").innerHTML = 
            "Longitude: " + longitude;
    document.getElementById("accuracy").innerHTML = 
            "Accuracy: " + accuracy + " meters";
    document.getElementById("timestamp").innerHTML = 
            "Timestamp: " + timestamp;
            
    // Show the google map with the position  
    showOnMap(position.coords);
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
}























