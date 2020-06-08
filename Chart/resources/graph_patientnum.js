// set the dimensions and margins of the graph
var margin_graph = {top: 10, right: 100, bottom: 200, left: 50},
    width_graph = 1500 - margin_graph.left - margin_graph.right,
    height_graph = 700 - margin_graph.top - margin_graph.bottom;

// append the svg object to the body of the page
var svg_graph = d3.select("#graph_kor")
  .append("svg")
    .attr("width", width_graph + margin_graph.left + margin_graph.right)
    .attr("height", height_graph + margin_graph.top + margin_graph.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_graph.left + "," + margin_graph.top + ")");

//Read the data
d3.json("/api/patient_num", function(data) {
  data.forEach(function(d){
    d.date = d3.timeParse("%Y-%m-%d")(d.date);
    //console.log(d.date)
  })
  var allGroup = ["confirmed", "released", "deceased"]

  var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
    return {
      name: grpName,
      values: data.map(function(d) {
        return {date: d.date, value: +d[grpName]};
      })
    };
  });

  var myColor = d3.scaleOrdinal()
  .domain(allGroup)
  .range(d3.schemeSet2);

    var x = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([ 0, width_graph ]);

    svg_graph.append("g")
      .attr("transform", "translate(0," + height_graph + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,11000])
      .range([ height_graph, 0 ]);
      svg_graph.append("g")
      .call(d3.axisLeft(y));

    // Initialize line with group a
    var line = d3.line()
      .x(function(d) { return x(+d.date) })
      .y(function(d) { return y(+d.value) })

      svg_graph.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")

    
    svg_graph.selectAll('myLines')
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) {  //console.log(d.date)
            return x(+d.date) })
          .y(function(d) { //console.log(d.confirmed)
            return y(+d.confirmed) })
        )
        .attr("stroke", "green")
        .style("stroke-width", 4)
        .style("fill", "none")

    var Tooltip_graph = d3.select("#graph_kor")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip_graph")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "10px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover_patient = function(d) {
      Tooltip_graph
        .style("opacity", 1)
    }
    var mousemove_patient = function(d) {
      var formatTime = d3.timeFormat("%B %d");
        Tooltip_graph
        .html("날짜: " + formatTime(d.date)+"</br>" + d.value+ "명")
        .style("left", (d3.mouse(this)[0]+70) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")

    }
    var mouseleave_patient = function(d) {
      Tooltip_graph
        .style("opacity", 0)
    }

      // Add the points
      svg_graph
      // First we need to enter in a group
      .selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.date) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("stroke", "white")
          .attr("stroke-width", 1)
          .on("mouseover", mouseover_patient)
          .on("mousemove", mousemove_patient)
          .on("mouseleave", mouseleave_patient)

          svg_graph
          .selectAll("myLabels")
          .data(dataReady)
          .enter()
            .append('g')
            .append("text")
              .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
              .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
              .attr("x", 12) // shift the text a bit more right
              .text(function(d) { return d.name; })
              .style("fill", function(d){ return myColor(d.name) })
              .style("font-size", 15)

  })


