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
  axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=9235f6b91ca70e11855227102ea1f01a&photoset_id=72157664978226738&user_id=149638594%40N05&extras=&media=&format=json&nojsoncallback=1`)
  .then(function (resp) {
    constructBody(resp);
  })
  .catch(function (error) {
    console.log(error);
  });
}
