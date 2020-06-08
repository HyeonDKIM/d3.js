// set the dimensions and margins of the graph
var margin_chart_age = {top: 30, right: 30, bottom: 70, left: 60},
    width_chart_age = 800 - margin_chart_age.left - margin_chart_age.right,
    height_chart_age = 600 - margin_chart_age.top - margin_chart_age.bottom;

// append the svg object to the body of the page
var svg_Agechart = d3.select("#chart_age")
  .append("svg")
    .attr("width", width_chart_age + margin_chart_age.left + margin_chart_age.right)
    .attr("height", height_chart_age + margin_chart_age.top + margin_chart_age.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_chart_age.left + "," + margin_chart_age.top + ")");

  var Tooltip_age = d3.select("#chart_age")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("font-size","20px");
    

  var mouseover_Age = function(d) {
    Tooltip_age
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  };

  var mousemove_Age = function(d) {
    Tooltip_age
      .html("누적 확진자 수: " + d.count)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  };

  var mouseleave_Age = function(d) {
    Tooltip_age
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
  //console.log(data)
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
//console.log(countObj);

data.forEach(function(d) {
  var age = d.age;
  d.count = countObj[age];
});

  // X axis
  var x = d3.scaleBand()
    .range([ 0, width_chart_age ])
    .domain(data.map(function(d) {return d.age;}).sort(sortAlphaNum))
    .padding(0.2);
    svg_Agechart.append("g")
    .attr("transform", "translate(0," + height_chart_age + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.count; })])
    .range([ height_chart_age, 0]);
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
      .attr("height", function(d) { return height_chart_age - y(d.count); })
      .attr("fill", "#F77E7E")
      .on("mouseover", mouseover_Age)
    .on("mousemove", mousemove_Age)
    .on("mouseleave", mouseleave_Age)

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