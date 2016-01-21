# Matozu

The name derives from the japanese words for marker and map:
mato = Target, Marker + chizu = map (zu = image)


# What it does

This project makes it easy to place and name markers on a map.

Soon coming will be the feature to generate a simple share URL to send it to
other people. For now it just generates a JSON Object for you, that you can
simply copy and place it directly into the index.htm file or separately into the
data directory.


# Usage

Simply clone this repository to a place which is served by a web server. Then
access the index.htm, place some markers and save the resulting JSON into the
data directory under a name you chose. Now you can display it under
`index.htm?id=$(name-you-chose)`.


# Used software & license

* Leaflet.js
* bootstrap

This software is licensed under MIT-License
