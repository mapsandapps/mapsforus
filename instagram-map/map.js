var map = L.map('map', {
  zoomControl: false
}).setView([33.8, -84.4], 13);

L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 18,
  ext: 'png'
}).addTo(map);

var icon = L.icon({
  iconUrl: 'marker-green.svg',
  iconSize: [60, 60],
  iconAnchor: [30, 60]
});

var marker;

var onMapClick = e => {
  if (marker) { marker.removeFrom(map); }
  marker = L.marker(e.latlng, { icon }).addTo(map);
}

// TODO: make it draggable

map.on('click', onMapClick);

// var neighborhoodsLayer = omnivore.kml('Neighborhoods.kml')
//   .on('ready', function() {
//     neighborhoodsLayer.eachLayer(layer => {
//       layer.bindTooltip(layer.feature.properties.name, {
//         permanent: true,
//         direction: 'center'
//       });
//       layer.setStyle({
//         color: '#001f3f',
//         weight: 3,
//         fill: false
//       });
//     });
//   })
//   .addTo(map);
