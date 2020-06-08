// set the dimensions and margins of the graph
var margin_chart_route = {top: 30, right: 30, bottom: 70, left: 60},
    width_chart_route = 800 - margin_chart_route.left - margin_chart_route.right,
    height_chart_route = 600 - margin_chart_route.top - margin_chart_route.bottom;

// append the svg object to the body of the page
var svg_Routechart = d3.select("#chart_route")
  .append("svg")
    .attr("width", width_chart_route + margin_chart_route.left + margin_chart_route.right)
    .attr("height", height_chart_route + margin_chart_route.top + margin_chart_route.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_chart_route.left + "," + margin_chart_route.top + ")");

  var Tooltip_route = d3.select("#chart_route")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("font-size","20px");
    

  var mouseover_route = function(d) {
    Tooltip_route
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  };

  var mousemove_route = function(d) {
    Tooltip_route
      .html("방문 횟수: " + d.count)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  };

  var mouseleave_route = function(d) {
    Tooltip_route
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  };

// 데이터 api에서 가져오기---------------------------------------------------
d3.json("/api/patient_route", function(data) {
  //console.log(data)
 var countObj={};

 data.forEach(function(d) {
  var type = d.type;
  //console.log(age);
  if(countObj[type] === undefined) {
      countObj[type] = 1;
  } else {
      countObj[type] = countObj[type] + 1;
  }
})
//console.log(countObj);

data.forEach(function(d) {
  var type = d.type;
  d.count = countObj[type];
});
  // X axis
  var x = d3.scaleBand()
    .range([ 0, width_chart_route ])
    .domain(data.map(function(d) {return d.type;}))
    .padding(0.2);
    svg_Routechart.append("g")
    .attr("transform", "translate(0," + height_chart_route + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.count; })])
    .range([ height_chart_route, 0]);
    svg_Routechart.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg_Routechart.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.type); })
      .attr("y", function(d) { return y(d.count);})
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height_chart_route - y(d.count); })
      .attr("fill", "#F77E7E")
      .on("mouseover", mouseover_route)
    .on("mousemove", mousemove_route)
    .on("mouseleave", mouseleave_route)

      /*
  svg.selectAll("text")
    .data(data)
    .enter().append("text")
    .text(function(d) {return d.count})
    .attr("class", "text")
    .attr("x", function(d) { return x(d.age); })
    .attr("y", function(d) { return y(d.count);})
    */
})