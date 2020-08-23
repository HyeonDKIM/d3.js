var width = 450
    height = 450
    margin = 40

var radius = Math.min(width, height) / 2 - margin

var svg = d3.select("#chart_tmp")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


// 데이터 정제

d3.json("./tmp.json", function(data) {
    console.log(data)
  var countObj={};

  data.forEach(function(d) {
   var treatment = d.treatment;
   //console.log(treatment);
   if(countObj[treatment] === undefined) {
    countObj[treatment] = 1;
} else {
    countObj[treatment] = countObj[treatment] + 1;
}
    //console.log(countObj[treatment])
  });

// 상위 3요소 외 전부 기타로 묶기
valuesForEtc = Object.values(countObj);
console.log(valuesForEtc[0]);
console.log(valuesForEtc.length)

if(valuesForEtc.length>3){
    console.log("상위 3요소 제외 전부 기타로 변형합니다.");
    // 상위 3요소 외 전부 삭제하고, 값은 3번째 인덱스에 고정
    for(var i=4; i<valuesForEtc.length; i++){
        valuesForEtc[3] = valuesForEtc[3]+valuesForEtc[i];
        console.log(valuesForEtc[3]);
        console.log("변형작업완료");
        delete countObj[Object.keys(countObj)[i]];
    }
    // 3번째 인덱스 값의 이름을 기타로 변경
    countObj.기타 = countObj[Object.keys(countObj)[3]];
    countObj["기타"] = valuesForEtc[3];
    delete countObj[Object.keys(countObj)[3]];
    console.log(valuesForEtc[3]);
}

console.log(countObj)

//그래프 그리기

var color = d3.scaleOrdinal()
  .domain(countObj)
  .range(d3.schemeSet2);

var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(countObj))

var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data.key+ " : "+ d.data.value})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 15)

});