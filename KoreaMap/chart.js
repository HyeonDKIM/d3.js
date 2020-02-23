var width = 600, height = 900, place_map_width = 600; place_map_height = 400;
var svg = d3.select("#chart").append("svg").attr({ "width": width, "height": height });

var dataset = [10, 20, 30, 40, 50];

svg.append("rect")
    .attr("class", "place-map-background")
    .attr("width", place_map_width)
    .attr("height", place_map_height);

var g = svg.append("g").style("stroke-width", "1.5px");
var jsonFile = null;
var geoInfo = null;

function WheresThePlace(clickedPlace) {
    switch (clickedPlace) {
        case "Seoul":
            return jsonFile = "topology/Seoul-topo.json", geoInfo = "Seoul";
        case "Busan":
            return jsonFile = "topology/Busan-topo.json", geoInfo = "Busan";
        case "Daegu":
            return jsonFile = "topology/Daegu-topo.json", geoInfo = "Daegu";
        case "Incheon":
            return jsonFile = "topology/Incheon-topo.json", geoInfo = "Incheon";
        case "Gwangju":
            return jsonFile = "topology/Gwangju-topo.json", geoInfo = "Gwangju";
        case "Daejeon":
            return jsonFile = "topology/Daejeon-topo.json", geoInfo = "Daejeon";
        case "Ulsan":
            return jsonFile = "topology/Ulsan-topo.json", geoInfo = "Ulsan";
        case "Sejong":
            return jsonFile = "topology/Sejong-topo.json", geoInfo = "Sejong";
        case "Gyeonggi":
            return jsonFile = "topology/Gyeonggi-topo.json", geoInfo = "Gyeonggi";
        case "Gangwon":
            return jsonFile = "topology/Gangwon-topo.json", geoInfo = "Gangwon";
        case "South Chungcheong":
            return jsonFile = "topology/ChungNam-topo.json", geoInfo = "ChungNam";
        case "North Chungcheong":
            return jsonFile = "topology/ChungBuk-topo.json", geoInfo = "ChungBuk";
        case "South Jeolla":
            return jsonFile = "topology/JeonNam-topo.json", geoInfo = "JeonNam";
        case "North Jeolla":
            return jsonFile = "topology/JeonBuk-topo.json", geoInfo = "JeonBuk";
        case "South Gyeongsang":
            return jsonFile = "topology/GyeongNam-topo.json", geoInfo = "GyeongNam";
        case "North Gyeongsang":
            return jsonFile = "topology/GyeongBuk-topo.json", geoInfo = "GyeongBuk";
        case "Jeju":
            return jsonFile = "topology/Jeju-topo.json", geoInfo = "Jeju";
    }
}


/*
svg.selectAll("bar")
    .data(dataset)
    .enter().append("rect")
    .attr("height", function (d, i) { return d })
    .attr("width", 40)
    .attr("x", function (d, i) { return (50 * i) })
    .attr("y", function (d, i) { return (100 - dataset[i]) });
*/
console.log(dataset);