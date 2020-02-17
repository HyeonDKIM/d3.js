var width = 600, height = 900, place_map_width = 600; place_map_height = 400;
var svg = d3.select("#chart").append("svg").attr({ "width": width, "height": height });

var dataset = [10, 20, 30, 40, 50];

svg.append("rect")
    .attr("class", "place-map-background")
    .attr("width", place_map_width)
    .attr("height", place_map_height);

var m = svg.append("m");




/*
svg.selectAll("bar")
    .data(dataset)
    .enter().append("rect")
    .attr("height", function (d, i) { return d })
    .attr("width", 40)
    .attr("x", function (d, i) { return (50 * i) })
    .attr("y", function (d, i) { return (100 - dataset[i]) });
*/
console.log(dataset);