var map = L.map('map', {
  zoomControl: false
}).setView([33.8, -84.4], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/mapsandapps/cj9bj48ts4cza2rn2avra7xjt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwc2FuZGFwcHMiLCJhIjoiY2o4YWpvYzJ5MGdpbDJxcDd0bzI5MDIwNiJ9.LimJsR1bhO-BQW80SlCiAQ', {
  maxZoom: 18
}).addTo(map);

var icon = L.icon({
  iconUrl: 'marker-green.svg',
  iconSize: [60, 60],
  iconAnchor: [30, 60]
});

var marker;

var onMapClick = e => {
  if (marker) { map.removeLayer(marker); }
  marker = L.marker(e.latlng, { icon }).addTo(map);
  map.panTo(e.latlng);
}

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
