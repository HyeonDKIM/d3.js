// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 200, left: 50},
    width = 1400 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_graph = d3.select("#graph_sample")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.json("/api/patient_num", function(data) {
  data.forEach(function(d){
    d.date = d3.timeParse("%Y-%m-%d")(d.date);
    console.log(d.date)
  })
    var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([ 0, width ]);

    svg_graph.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,11000])
      .range([ height, 0 ]);
      svg_graph.append("g")
      .call(d3.axisLeft(y));

    // Initialize line with group a
    var line = svg_graph
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) {  console.log(d.date)
            return x(+d.date) })
          .y(function(d) { console.log(d.confirmed)
            return y(+d.confirmed) })
        )
        .attr("stroke", "green")
        .style("stroke-width", 4)
        .style("fill", "none")

        var Tooltip = d3.select("#graph_sample")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip_graph")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "10px")
  
        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
          Tooltip
            .style("opacity", 1)
        }
        var mousemove = function(d) {
          var formatTime = d3.timeFormat("%B %d");	
          Tooltip
            .html("날짜: " + formatTime(d.date)+"</br>"+ "확진자 수: " + d.confirmed)
            .style("left", (d3.mouse(this)[0]+70) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
        }
        var mouseleave = function(d) {
          Tooltip
            .style("opacity", 0)
        }
  
      // Add the points
      svg_graph
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
          .attr("class", "myCircle")
          .attr("cx", function(d) { return x(d.date) } )
          .attr("cy", function(d) { return y(d.confirmed) } )
          .attr("r", 4)
          .attr("stroke", "#69b3a2")
          .attr("stroke-width", 1)
          .attr("fill", "white")
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
  })


