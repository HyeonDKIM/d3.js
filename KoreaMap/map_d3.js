/* 참고 사이트
https://bl.ocks.org/mbostock/4699541
https://teeeeeeemo.tistory.com/35
http://www.gisdeveloper.co.kr/?p=2332
*/

// SVG 영역 생성
var width = 600, height = 900, place_map_width = 500, place_map_height = 400, active = d3.select(null);
var svg = d3.select("#d3_korea").append("svg").attr({ "width": width, "height": height });
var svg_PlaceMap = d3.select("#local_map").append("svg").attr({ "width": place_map_width, "height": place_map_height });
svg_PlaceMap.append("rect")
    .attr("class", "place-map-background")
    .attr("width", place_map_width)
    .attr("height", place_map_height);

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

var clickedPlace = null;
var jsonFile = null;
var geoInfo = null;
var center_projection = null;
var scale = null;

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
    clickedPlace = d.properties.name;
    console.log(clickedPlace);
    jsonFile, geoInfo, center_projection, scale = WheresThePlace(clickedPlace);
    remove_svg(jsonFile, geoInfo, center_projection, scale);
}

function reset() {
    if (svg_PlaceMap == null) console.log("clicked");
    else {
        console.log("clicked");
        active.classed("active", false);
        active = d3.select(null);
        clickedPlace = null;
        jsonFile, geoInfo, center_projection, scale = WheresThePlace(clickedPlace);

        remove_svg(jsonFile, geoInfo, center_projection, scale);
    }

}

function remove_svg(jsonFile, geoInfo, center_projection, scale) {
    svg_PlaceMap.selectAll("g > *").remove();
    var g2 = svg_PlaceMap.append("g")
    .style("stroke-width", "1.5px");

    if ((geoInfo && jsonFile && center_projection && scale) != null) {
        d3.json(jsonFile, function (err, map) {
            // 그리기 위한 오브젝트 획득
            var geo_PlaceMap = map.objects[geoInfo];
            var map_o_PlaceMap = topojson.object(map, geo_PlaceMap);

            var projection2 = d3.geo.mercator() // projection - 투영법, 메르카토르 투영법 사용
                .center(center_projection)
                .scale(scale)
                .translate([width / 2, height / 2]);

            var path2 = d3.geo.path()
                .projection(projection2);

            // SVG에 추가
            g2.selectAll("path")
                .data(map_o_PlaceMap.geometries)
                .enter().append("path")
                .attr("d", path2)
                .attr("class", "feature");

            // 경계선
            var mesh = topojson.mesh(
                map, geo_PlaceMap,
                function (a, b) {
                    return a !== b;
                });

            g2.append("path")
                .datum(mesh)
                .attr("d", path2)
                .attr("class", "mesh");

            // 지역 이름 표시
            /*
            g2.selectAll(".place-label")
                .data(map_o_PlaceMap.geometries)
                .enter()
                .append("text")
                .attr("class", function (d) {
                    return "place-label";
                })
                .attr("transform", function (d) {
                    return "translate(" + path2.centroid(d) + ")";
                })
                .text(function (d) {
                    var s = d.properties.SIG_ENG_NM;
                    if (!s) return;
                    return s;
                });
                */
        })
    }
}




function WheresThePlace(clickedPlace) {
    switch (clickedPlace) {
        case "Seoul":
            return jsonFile = "topology/Seoul-topo.json", geoInfo = "Seoul", center_projection = [127.01, 37.35], scale = 50000;
        case "Busan":
            return jsonFile = "topology/Busan-topo.json", geoInfo = "Busan", center_projection = [129.08, 34.93], scale = 45000;
        case "Daegu":
            return jsonFile = "topology/Daegu-topo.json", geoInfo = "Daegu", center_projection = [128.59, 35.53], scale = 40000;
        case "Incheon":
            return jsonFile = "topology/Incheon-topo.json", geoInfo = "Incheon", center_projection = [126.58, 37.255], scale = 35000;
        case "Gwangju":
            return jsonFile = "topology/Gwangju-topo.json", geoInfo = "Gwangju", center_projection = [126.88, 34.92], scale = 55000;
        case "Daejeon":
            return jsonFile = "topology/Daejeon-topo.json", geoInfo = "Daejeon", center_projection = [127.42, 36.07], scale = 45000;
        case "Ulsan":
            return jsonFile = "topology/Ulsan-topo.json", geoInfo = "Ulsan", center_projection = [129.28, 35.26], scale = 40000;
        case "Sejong":
            return jsonFile = "topology/Sejong-topo.json", geoInfo = "Sejong", center_projection = [127.30, 36.33], scale = 50000;
        case "Gyeonggi":
            return jsonFile = "topology/Gyeonggi-topo.json", geoInfo = "Gyeonggi", center_projection = [127.23, 36.79], scale = 15000;
        case "Gangwon":
            return jsonFile = "topology/GangWon-topo.json", geoInfo = "GangWon", center_projection = [128.38, 36.66], scale = 10000;
        case "South Chungcheong":
            return jsonFile = "topology/ChungNam-topo.json", geoInfo = "ChungNam", center_projection = [126.93, 35.73], scale = 15000;
        case "North Chungcheong":
            return jsonFile = "topology/ChungBuk-topo.json", geoInfo = "ChungBuk", center_projection = [127.91, 35.90], scale = 15000;
        case "South Jeolla":
            return jsonFile = "topology/JeonNam-topo.json", geoInfo = "JeonNam", center_projection = [127.03, 34.09], scale = 15000;
        case "North Jeolla":
            return jsonFile = "topology/JeonBuk-topo.json", geoInfo = "JeonBuk", center_projection = [127.24, 35.02], scale = 15000;
        case "South Gyeongsang":
            return jsonFile = "topology/GyeongNam-topo.json", geoInfo = "GyeongNam", center_projection = [128.42, 34.48], scale = 15000;
        case "North Gyeongsang":
            return jsonFile = "topology/GyeongBuk-topo.json", geoInfo = "GyeongBuk", center_projection = [128.88, 35.35], scale = 11500;
        case "Jeju":
            return jsonFile = "topology/Jeju-topo.json", geoInfo = "Jeju", center_projection = [126.64, 32.99], scale = 30000;
        default:
            return jsonFile = null, geoInfo = null;
    }
}
