var API_KEY = '0f7476e73ab8d0c500a4b66c3067c82f';
var SPECIES_PHOTOSET = '72157664978226738';
var USER_ID = '149638594%40N05';

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
  function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function constructBody(resp) {
  var divContent = [];
  _.forEach(resp.data.photoset.photo, function(value, key) {
    divContent += `<div class="card">
      <a href="https://www.flickr.com/photos/atlnature/${value.id}/in/album-${resp.data.photoset.id}/">
        <div class="image" style="background-image:url(https://c1.staticflickr.com/${value.farm}/${value.server}/${value.id}_${value.secret}_n.jpg)"></div>
        <span class="title">${value.title}</span>
      </a>
    </div>`;
  });
  document.getElementById("species").innerHTML = divContent;
}

window.onload = function() {
  var albumID = getUrlVars()["album"];

  if (albumID) {
    SPECIES_PHOTOSET = albumID;
  }

  axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${API_KEY}&photoset_id=${SPECIES_PHOTOSET}&user_id=${USER_ID}&extras=&media=&format=json&nojsoncallback=1`)
  .then(function (resp) {
    constructBody(resp);
  })
  .catch(function (error) {
    console.log(error);
  });
}
