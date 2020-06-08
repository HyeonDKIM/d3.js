// set the dimensions and margins of the graph
var margin_chart_region = {top: 30, right: 30, bottom: 100, left: 60},
    width_chart_region = 800 - margin_chart_region.left - margin_chart_region.right,
    height_chart_region = 600 - margin_chart_region.top - margin_chart_region.bottom;

// append the svg object to the body of the page
var svg_RegionChart = d3.select("#chart_region")
  .append("svg")
    .attr("width", width_chart_region + margin_chart_region.left + margin_chart_region.right)
    .attr("height", height_chart_region + margin_chart_region.top + margin_chart_region.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_chart_region.left + "," + margin_chart_region.top + ")");

  var Tooltip_region = d3.select("#chart_region")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("font-size","20px");
    

  var mouseover_Region = function(d) {
    Tooltip_region
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  };

  var mousemove_Region = function(d) {
    Tooltip_region
      .html("누적 확진자 수: " + d.count)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  };

  var mouseleave_Region = function(d) {
    Tooltip_region
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
d3.json("/api/patient_region", function(data) {
  //console.log(data)
 var countObj={};

 data.forEach(function(d) {
  var province = d.province;
  if(countObj[province] === undefined) {
    countObj[province] = 1;
} else {
    countObj[province] = d.confirmed;
    }
})


data.forEach(function(d) {
  var province = d.province;
  d.count = countObj[province];
});

  // X axis
  var x = d3.scaleBand()
    .range([ 0, width_chart_region ])
    .domain(data.map(function(d) {return d.province;}).sort(sortAlphaNum))
    .padding(0.2);
    svg_RegionChart.append("g")
    .attr("transform", "translate(0," + height_chart_region + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.count; })])
    .range([ height_chart_region, 0]);
    svg_RegionChart.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg_RegionChart.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.province); })
      .attr("y", function(d) { return y(d.count);})
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height_chart_region - y(d.count); })
      .attr("fill", "#F77E7E")
      .on("mouseover", mouseover_Region)
    .on("mousemove", mousemove_Region)
    .on("mouseleave", mouseleave_Region)

})