var width = 400, height = 600;
var svg = d3.select("#chart").append("svg").attr({ "width": width, "height": height });

var dataset = [10,20,30,40,50];

svg.selectAll("bar")
    .data(dataset)
    .enter().append("rect")
    .attr("height", function (d, i) { return d })
    .attr("width", 40)
    .attr("x", function (d, i) { return (50 * i) })
    .attr("y", function (d, i) { return (100 - dataset[i]) });

console.log(dataset);