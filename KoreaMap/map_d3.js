// SVG 영역 생성
var width = 600, height = 900, active = d3.select(null);
var svg = d3.select("#d3_korea").append("svg").attr({ "width": width, "height": height });

// 축척 지정
var projection = d3.geo.mercator() // projection - 투영법, 메르카토르 투영법 사용
    .center([128, 36])
    .scale(6200)
    .translate([width / 2, height / 2]);
// 패스 작성
var path = d3.geo.path()
    .projection(projection);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);

var g = svg.append("g").style("stroke-width", "1.5px");
// 파일 읽기
d3.json("topology/korea-topo.json", function (err, map) {
    // 그리기 위한 오브젝트 획득
    var geo = map.objects["korea"];
    var map_o = topojson.object(map, geo);

    // SVG에 추가
    g.selectAll("path")
        .data(map_o.geometries)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "feature")
        .on("click", clicked);

    // 경계선
    var mesh = topojson.mesh(
        map, geo,
        function (a, b) {
            return a !== b;
        });

    g.append("path")
        .datum(mesh)
        .attr("d", path)
        .attr("class", "mesh");

    // 지역 이름 표시
    g.selectAll(".place-label")
        .data(map_o.geometries)
        .enter()
        .append("text")
        .attr("class", function (d) {
            return "place-label";
        })
        .attr("transform", function (d) {
            return "translate(" + path.centroid(d) + ")";
        })
        .text(function (d) {
            var s = d.properties.name_local;
            if (!s) return;
            return s;
        });
});

function clicked(d) {
    if (active.node() === this) return reset();
    active.classed("active", false);
    active = d3.select(this).classed("active", true);
}

function reset() {
    console.log("clicked");
    active.classed("active", false);
    active = d3.select(null);
}