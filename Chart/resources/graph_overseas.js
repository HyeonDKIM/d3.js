// set the dimensions and margins of the graph
var margin_overseas = {top: 10, right: 100, bottom: 200, left: 50},
    width_overseas = 1500 - margin_overseas.left - margin_overseas.right,
    height_overseas = 700 - margin_overseas.top - margin_overseas.bottom;

// append the svg object to the body of the page
var svg_overseas = d3.select("#graph_overseas")
  .append("svg")
    .attr("width", width_overseas + margin_overseas.left + margin_overseas.right)
    .attr("height", height_overseas + margin_overseas.top + margin_overseas.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_overseas.left + "," + margin_overseas.top + ")");

//Read the data
d3.json("/api/overseas", function(data) {
  data.forEach(function(d){
    d.date = d3.timeParse("%Y-%m-%d")(d.date);
    //console.log(d.date)
  })

    var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([ 0, width_overseas ]);

    svg_overseas.append("g")
      .attr("transform", "translate(0," + height_overseas + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,12])
      .range([ height_overseas, 0 ]);

      svg_overseas.append("g")
      .call(d3.axisLeft(y));

      svg_overseas.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.overseas) })
        )

    var Tooltip_overseas = d3.select("#graph_overseas")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip_graph")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "10px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover_overseas = function(d) {
      Tooltip_overseas
        .style("opacity", 1)
    }
    var mousemove_overseas = function(d) {
      var formatTime = d3.timeFormat("%B %d");
        Tooltip_overseas
        .html("날짜: " + formatTime(d.date)+"</br>" + d.overseas+ "명")
        .style("left", (d3.mouse(this)[0]+70) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")

    }
    var mouseleave_overseas = function(d) {
      Tooltip_overseas
        .style("opacity", 0)
    }

      // Add the points
      svg_overseas
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "myCircle")
        .attr("cx", function(d) { return x(d.date) } )
        .attr("cy", function(d) { return y(d.overseas) } )
        .attr("r", 8)
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr("fill", "white")
        .on("mouseover", mouseover_overseas)
        .on("mousemove", mousemove_overseas)
        .on("mouseleave", mouseleave_overseas)


  })


