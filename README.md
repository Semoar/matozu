# Matozu

The name derives from the japanese words for marker and map:
mato = Target, Marker + chizu = map (zu = image)


# What it does

This project makes it easy to place and name markers on a map.
Try it in the demo on [matozu.simon-dreher.de](https://matozu.simon-dreher.de)!


# Usage

Simply clone this repository to a place which is served by a web server. Then
access the index.htm, place some markers and save the resulting JSON into the
data directory under a name you chose. Now you can display it under
`index.htm?id=$(name-you-chose)`.

Alternatively you can use an existing installation of matozu, place your markers
and use the `link to share this markers` to generate a URL which you can send
to another person to share your markers.


# Used software & license

* Leaflet.js
* bootstrap

This software is licensed under MIT-License
