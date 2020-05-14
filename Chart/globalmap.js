var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1600 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;


var svg_map = d3.select("#map_sample")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Map and projection
var projection = d3.geoMercator()
    .scale(width / 3.0 / Math.PI)
    .translate([width / 2.5, height / 1.5])

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(data){

    // Draw the map
    svg_map.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "#fff")
})