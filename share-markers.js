// Temporary marker when hovering a search result.
var tempMarker;
var redIcon = L.icon({
    iconUrl: 'images/marker-icon-red.png',
    iconRetinaUrl: 'images/marker-icon-red-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'images/marker-shadow.png',
    shadowSize:  [41, 41]
})
function showTempMarker(lat, lng) {
    tempMarker = new L.marker([lat, lng], {icon: redIcon});
    markerLayers.addLayer(tempMarker);
}
function removeTempMarker() {
    markerLayers.removeLayer(tempMarker);
    tempMarker = null;
}

function searchPlace() {
    var query = document.getElementById('search-text').value;
    var url = 'https://nominatim.openstreetmap.org/search?q=' + query + '&format=json';
    var searchResultsHTML = document.getElementById('search-results-list');
    // clear previous search results
    searchResultsHTML.innerHTML = '';
    $.getJSON(url, function(data){
        for (var i=0; i<data.length; i++) {
            var place = data[i];
            var li = document.createElement('li');
            li.className = 'list-group-item';
            li.setAttribute('data-lat', place['lat']);
            li.setAttribute('data-lng', place['lon']);
            li.appendChild(document.createTextNode(place['display_name']));
            li.addEventListener("click", function() {
                addMarker(this.innerHTML, this.getAttribute('data-lat'), this.getAttribute('data-lng'));
            });
            li.onmouseover = function() {
                showTempMarker(this.getAttribute('data-lat'), this.getAttribute('data-lng'))
            };
            li.onmouseout = removeTempMarker;
            searchResultsHTML.appendChild(li);
        }
        if (data.length == 0) {
            document.getElementById('search-results').style.display = "none";
            document.getElementById('search-no-results').style.display = "block";
        } else {
            document.getElementById('search-results').style.display = "block";
            document.getElementById('search-no-results').style.display = "none";
        }
    });
    // Say form to not really submit the search form to the server.
    return false;
}

function drawMarkers() {
    markerLayers.clearLayers();
    for (var title in markers) {
        marker = new L.marker(markers[title], {draggable:'true', title: title});
        marker.on('dragend', function(event) {
            m = event.target;
            markers[m.options.title] = [m.getLatLng()['lat'], m.getLatLng()['lng']];
            document.getElementById('json-content').innerHTML = JSON.stringify(markers, null, ' ');
        });
        marker.bindPopup('<a href="./edit.htm?id=' + title + '">' + title + '</a>').openPopup();
        markerLayers.addLayer(marker);
    }
    document.getElementById('json-content').innerHTML = JSON.stringify(markers, null, ' ');
}

function showJSON() {
    // ToDo: Either copy it to clipboard or generate JSON-file to download.
    document.getElementById('json-content').style.display = "block";
}

function addMarker(title, lat, lon) {
    var title = prompt('Please enter text for the marker or just accept the suggested text with enter:', title);
    if (title == null) {
        return;
    }
    if (title == '') {
        title = uuid();
    }
    // ToDo: or if title already used
    markers[title] = [lat, lon];
    drawMarkers();
    // ToDo: Somehow save to server
    // 1. Get user content out
    // 2. Load to server
    // (3. Generate share URL)
}

// Helper
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
