var autocompletePickUp, autocompleteDestination, latPickUp, lngPickUp, latDestination, lngDestination, total = 0 ,autocompletePickUpName, autocompleteDestinationName, duration;
var map, index = 0;
var markers = [];

function initAutocomplete() {
    autocompletePickUp = new google.maps.places.Autocomplete(
        document.getElementById('autocompletePickUp'), {types: ['geocode']});

    autocompleteDestination = new google.maps.places.Autocomplete(
        document.getElementById('autocompleteDestination'), {types: ['geocode']});

    autocompletePickUp.setFields(['address_component', 'geometry']);
    autocompleteDestination.setFields(['address_component', 'geometry']);

    autocompletePickUp.addListener('place_changed', fillInAddressPickUp);
    autocompleteDestination.addListener('place_changed', fillInAddressDestination);

    initMap();

}
function fillInAddressPickUp() {

    var place = autocompletePickUp.getPlace();

    if (place == null) {
        console.log("Adresa pickup null");
    } else {
        latPickUp = place.geometry.location.lat();
        lngPickUp = place.geometry.location.lng();
        if(place.address_components[4] == undefined) {
            autocompletePickUpName = place.address_components[0].long_name;

        }
        else {
            autocompletePickUpName = place.address_components[0].long_name + ', ' + place.address_components[1].long_name + ', ' + place.address_components[4].long_name;
        }
        console.log(autocompletePickUpName);
    }
    }


function fillInAddressDestination() {

    var place = autocompleteDestination.getPlace();

    if (place == null) {
        console.log("Adresa destinatie null");
    } else {
        latDestination = place.geometry.location.lat();
        lngDestination = place.geometry.location.lng();
        if(place.address_components[4] == undefined) {
            autocompleteDestinationName = place.address_components[0].long_name;

        }
        else {
            autocompleteDestinationName = place.address_components[0].long_name + ', ' + place.address_components[1].long_name + ', ' + place.address_components[4].long_name;
        }
        console.log(autocompleteDestinationName);
        }
}


function initMap() {
    var ok = 0;
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 45.943161, lng: 24.96676}
    });
    directionsRenderer.setMap(map);

    var onChangeHandler = function () {
        if (document.getElementById('autocompletePickUp').value != '') {
            ++ok;
        }
        if (document.getElementById('autocompleteDestination').value != '') {
            ++ok;
        }

        if (ok >= 3) {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        }
    };
}

function addMarker(lat,lng,name,color){
    let url = "http://maps.google.com/mapfiles/ms/icons/";
    url += color + "-dot.png";
    var myLatlng = new google.maps.LatLng(lat,lng);
    var mapOptions = {
        zoom: 15,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title:name,
        icon:url
    });
    markers.push(marker);
// To add the marker to the map, call setMap();
    marker.setMap(map);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService.route(
        {
            origin: new google.maps.LatLng(latPickUp, lngPickUp),
            destination: new google.maps.LatLng(latDestination, lngDestination),
            travelMode: 'DRIVING',
            drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: 'optimistic'
            }
        },
        function (response, status) {
            if (status === 'ZERO_RESULTS') {
                window.alert('Nici o rută nu a putut fi găsită între origine și destinație pentru Masina');
            } else if (status === 'OK') {
                directionsRenderer.setDirections(response);
                computeTotalDistance(directionsRenderer.getDirections());
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
}

function computeTotalDistance(result) {
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }

    document.getElementById("latPickUp").innerHTML = "Latitudine Ridicare: " + latPickUp;
    document.getElementById("lngPickUp").innerHTML = "Longitudine Ridicare: " + lngPickUp;
    document.getElementById("latDestination").innerHTML = "Latitudine Destinatie: " + latDestination;
    document.getElementById("lngDestination").innerHTML = "Longitudine Destinatie: " + lngDestination;

}


