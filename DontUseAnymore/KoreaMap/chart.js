//chart test

var dataset = [9, 19, 29, 39, 29, 19, 9];
var svg_Table = d3.select("#table").append("svg").attr({ "width": table_width, "height": table_height });
svg_Table.selectAll("rect")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("height", function(d, i) {return d*12})
    .attr("width", 40)
    .attr("x", function(d, i) {return (50 * i)})
    .attr("y", function(d, i) {return (600 - d*12)});

//---------------------------------------------

