/*  This visualization was made possible by modifying code provided by:

Scott Murray, Choropleth example from "Interactive Data Visualization for the Web" 
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html
    
Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html  */


//Width and height of map
var width = 800;
var height = 500;

// D3 Projection
var projection = d3.geo.albersUsa()
  .translate([width/2, height/2]) // translate to center of screen
  .scale([1000]); // scale things down so see entire US

// Define path generator
var path = d3.geo.path() // path generator that will convert GeoJSON to SVG paths
  .projection(projection); // tell path generator to use albersUsa projection

//Create SVG element and append map to the SVG
var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
    
// Append Div for tooltip to SVG
var div = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

function createLink(id) {
  var url = 'http://www.proximity2nature.com/parks/#' + id;
  parent.window.location = url;
}

// Load in my states data!
d3.csv("states.csv", function(data) {

  // Load GeoJSON data and merge with states data
  d3.json("us-states.json", function(json) {

  // Loop through each state data value in the .csv file
  for (var i = 0; i < data.length; i++) {

    // Grab State Name
    var dataState = data[i].state;

    // Grab data value 
    var dataValue = data[i].id;

    // Find the corresponding state inside the GeoJSON
    for (var j = 0; j < json.features.length; j++)  {
      var jsonState = json.features[j].properties.name;

      if (dataState == jsonState) {

        // Copy the data value into the JSON
        json.features[j].properties.id = dataValue; 

        // Stop looking through the JSON
        break;
      }
    }
  }

  // Bind the data to the SVG and create one path per GeoJSON feature
  svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("cursor", function(d) {
      var value = d.properties.id;
      if (value) {
        return 'pointer';
      }
    })
    .attr("class", function(d) {
      var value = d.properties.id;
      if (value) {
        return 'posts';
      }
    })
    .style("stroke", "#202020")
    .style("stroke-width", "1")
    .style("fill", function(d) {

      if (d.properties.id) {
        return '#55A660';
      } else {
        return "#b5b5b5";
      }
    })
    .on("click", function(d) {
      if (d.properties.id) {
        createLink(d.properties.id);
      }
    })

    // Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks" 
    // http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
    .on("mouseover", function(d) {
      if (d.properties.id) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
          div.text(d.properties.name)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      }
    })

    // fade out tooltip on mouse out
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
    });

  // map the cities
  d3.csv("cities.csv", function(data) {

    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return projection([d.lon, d.lat])[0];
      })
      .attr("cy", function(d) {
        return projection([d.lon, d.lat])[1];
      })
      .attr("r", function(d) {
        return 10;
      })
      .style("fill", "#f07300")
      .style("opacity", 0.95)
      .style("cursor", "pointer")
      .on("click", function(d) {
        createLink(d.id);
      })

      // Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks" 
      // http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
      .on("mouseover", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
          div.text(d.city)
          .style("left", (d3.event.pageX) + "px")     
          .style("top", (d3.event.pageY - 28) + "px");    
      })

      // fade out tooltip on mouse out
      .on("mouseout", function(d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });
    });
  });

});
