var format = d3.format(",");
var tip_kor = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>지역명: </strong><span class='details'>" + d.properties.name_local + "<br></span>" + "<strong>확진자 수: </strong><span class='details'>" + format(d.confirmed) +"</span>";
            })
// SVG 영역 생성
var margin_kor = {top: 30, right: 30, bottom: 70, left: 60},
    width_kor = 800 - margin_kor.left - margin_kor.right,
    height_kor = 800 - margin_kor.top - margin_kor.bottom;

 var color_kor = d3.scaleThreshold()
        .domain([0,30,50,100,500,1000,5000])
        .range(["#ffffff", "#FBC6C6", "#F9A1A1","#F57F7F","#F24F4F","#FD0606","#AE0404", "#5A0303"]);

var svg_kor= d3.select("#map_kor")
    .append("svg")
    .attr("width", width_kor)
    .attr("height", height_kor)
    .append('g')
    .attr('class', 'map');

// 축척 지정
var projection_kor = d3.geoMercator() // projection - 투영법, 메르카토르 투영법 사용
    .scale(5800)
    .center([132.3, 37])
    .translate([width_kor / 0.9, height_kor / 3]);
// 패스 작성
var path_kor = d3.geoPath().projection(projection_kor);

var g_kor = svg_kor.append("g").style("stroke-width", "1.5px");
svg_kor.call(tip_kor);

queue()
.defer(d3.json, "resources/korea.json")
.defer(d3.json, "/api/patient_region")
.await(ready);

function ready(error, data, confirmed){
     var populationByRegion = {};
     confirmed.forEach(function(d) { populationByRegion[d.province] = +d.confirmed;});
     data.features.forEach(function(d) { d.confirmed = populationByRegion[d.properties.name_de]});
     data.features.forEach(function(d) { if(typeof d.confirmed == "undefined"){
     d.confirmed = 0;
     populationByRegion[d.properties.name_de] = 0;}});
 
     svg_kor.append("g")
         .attr("class", "countries")
         .selectAll("path")
         .data(data.features)
       .enter().append("path")
         .attr("d", path_kor)
         .style("fill", function(d) {
         return color_kor(populationByRegion[d.properties.name_de]); })
         .style('stroke', 'white')
         .style('stroke-width', 1.5)
         .style("opacity",0.8)
         // tooltips
           .style("stroke","white")
           .style('stroke-width', 0.3)
           .on('mouseover',function(d){
            tip_kor.show(d);
   
             d3.select(this)
               .style("opacity", 1)
               .style("stroke","white")
               .style("stroke-width",3);
           })
           .on('mouseout', function(d){
             tip_kor.hide(d);
   
             d3.select(this)
               .style("opacity", 0.8)
               .style("stroke","white")
               .style("stroke-width",0.3);
           });

    svg_kor.append("path")
    .datum(topojson.mesh(data.features, function(a, b) {
        console.log(a.province)
        console.log("bCount", b.province)
        return a.province !== b.province; }))
     // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
    .attr("class", "names")
    .attr("d", path_kor);
     }
