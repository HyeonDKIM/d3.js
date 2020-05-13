// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 900 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart_sample")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// 정렬 함수 출처: https://ko.coder.work/so/javascript/74054
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

// Parse the Data
d3.csv("./database/PatientInfo_age.csv", function(data) {

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
    .range([ 0, width ])
    .domain(data.map(function(d) {return d.age;}).sort(sortAlphaNum))
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 810])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.age); })
      .attr("y", function(d) { return y(d.count);})
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.count); })
      .attr("fill", "#69b3a2")

  svg.selectAll("text")
    .data(data)
    .enter().append("text")
    .text(function(d) {return d.count})
    .attr("class", "text")
    .attr("x", function(d) { return x(d.age); })
    .attr("y", function(d) { return y(d.count);})
})