var hotspotID;
var divContent = '';

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function constructLink(resp) {
  divContent += `<a href="http://ebird.org/ebird/hotspot/${hotspotID}" target="_blank">See more recent observations from `;
  if (resp.data && resp.data.length > 0) {
    divContent += `${resp.data[0].locName} `;
  } else {
    divContent += 'this location ';
  }
  divContent += `on eBird</a>`;
  document.getElementById("ebird").innerHTML = divContent;
}

function constructBody(resp) {
  var noImpreciseBirds = [];
  _.forEach(resp.data, function(value, key) {
    if (!value.comName.includes(' sp.') && !value.comName.includes('/')) {
      noImpreciseBirds.push(value.comName);
    }
  });
  var sample = _.sampleSize(noImpreciseBirds, 10);
  if(!sample || sample.length === 0) {
    divContent += '<p>No recent observations</p>'
  } else {
    divContent += '<ul>';
    _.forEach(sample, function(value) {
      divContent += `<li>${value}</li>`;
    });
    divContent += '</ul>';
  }
}

window.onload = function() {
  hotspotID = getParameterByName('hotspot');

  axios.get(`https://ebird.org/ws2.0/data/obs/${hotspotID}/recent?back=30&includeProvisional=true`, {
    headers: {
      'X-eBirdApiToken': 'se8a8lprdsvn'
    }
  })
  .then(function (resp) {
    constructBody(resp);
    constructLink(resp);
  })
  .catch(function (error) {
    console.log(error);
  });
}
