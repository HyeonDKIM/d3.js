// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width_graph = 800 - margin.left - margin.right,
    height_graph = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_Agechart = d3.select("#chart_sample")
  .append("svg")
    .attr("width", width_graph + margin.left + margin.right)
    .attr("height", height_graph + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  var Tooltip = d3.select("#chart_sample")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("font-size","20px");
    

  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  };

  var mousemove = function(d) {
    Tooltip
      .html("누적 확진자 수: " + d.count)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  };

  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  };



// 정렬 함수 출처: https://ko.coder.work/so/javascript/74054 ------------------
var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;

function sortAlphaNum(a, b) {
  var aA = a.replace(reA, "");
  var bA = b.replace(reA, "");
  if (aA === bA) {
    var aN = parseInt(a.replace(reN, ""), 10);
    var bN = parseInt(b.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
}
//--------------------------------------------------------------------------

// 데이터 api에서 가져오기---------------------------------------------------
d3.json("/api/patient", function(data) {
  console.log("get json from api");
  console.log(data)
 var countObj={};

 data.forEach(function(d) {
  var age = d.age;
  //console.log(age);
  if(countObj[age] === undefined) {
      countObj[age] = 1;
  } else {
      countObj[age] = countObj[age] + 1;
  }
})
console.log(countObj);

data.forEach(function(d) {
  var age = d.age;
  d.count = countObj[age];
});

  // X axis
  var x = d3.scaleBand()
    .range([ 0, width_graph ])
    .domain(data.map(function(d) {return d.age;}).sort(sortAlphaNum))
    .padding(0.2);
    svg_Agechart.append("g")
    .attr("transform", "translate(0," + height_graph + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.count; })])
    .range([ height_graph, 0]);
    svg_Agechart.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg_Agechart.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.age); })
      .attr("y", function(d) { return y(d.count);})
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height_graph - y(d.count); })
      .attr("fill", "#69b3a2")
      .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

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