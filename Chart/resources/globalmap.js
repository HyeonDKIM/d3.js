//http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f
var format = d3.format(",");
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>확진자 수: </strong><span class='details'>" + format(d.TotalCases) +"</span>";
            })

var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
    .domain([0,1,10000,100000,500000,1000000,5000000,10000000])
    .range(["#ffffff", "#FBC6C6", "#F9A1A1","#F57F7F","#F24F4F","#FD0606","#AE0404", "#5A0303"]);

var path = d3.geoPath();

var svg_map = d3.select("#map_global")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append('g')
    .attr('class', 'map');

// Map and projection
var projection = d3.geoMercator()
    .scale(width / 2.8 / Math.PI)
    .translate([width / 2.7, height / 1.7]);

var path = d3.geoPath().projection(projection);

svg_map.call(tip);

queue()
.defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
.defer(d3.json, "/api/world")
.await(ready);

function ready(error, data, TotalCases){
    var populationById = {};
    TotalCases.forEach(function(d) { populationById[d.Country] = +d.TotalCases;});
    data.features.forEach(function(d) { d.TotalCases = populationById[d.properties.name]});
    data.features.forEach(function(d) { if(typeof d.TotalCases == "undefined"){
    d.TotalCases = 0;
    populationById[d.properties.name] = 0;}});

    svg_map.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(data.features)
      .enter().append("path")
        .attr("d", path)
        .style("fill", function(d) {
        return color(populationById[d.properties.name]); })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity",0.8)
        // tooltips
          .style("stroke","white")
          .style('stroke-width', 0.3)
          .on('mouseover',function(d){
            tip.show(d);
  
            d3.select(this)
              .style("opacity", 1)
              .style("stroke","white")
              .style("stroke-width",3);
          })
          .on('mouseout', function(d){
            tip.hide(d);
  
            d3.select(this)
              .style("opacity", 0.8)
              .style("stroke","white")
              .style("stroke-width",0.3);
          });
  
    svg_map.append("path")
        .datum(topojson.mesh(data.features, function(a, b) {
            console.log(a.Country)
            console.log("bCount", b.Country)
            return a.Country !== b.Country; }))
         // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
        .attr("class", "names")
        .attr("d", path);
    }
