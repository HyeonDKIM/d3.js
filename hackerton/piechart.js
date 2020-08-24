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

// 주상병코드 받았다고 가정
var getcode = "A00";

// 데이터 정제
d3.json("./tmp.json", function(data) {
    var counter = 0; // value 개수 세기
    console.log(data)
    var countObj={};
    data.forEach(function(d) {
        var maininjurycode = d.maininjurycode;
        var treatment = d.treatment;

        // 주상병코드 체크
        if(maininjurycode === getcode){
            // 데이터 카운트용 객체생성
            if(countObj[treatment] === undefined) {
                countObj[treatment] = 1;
                counter++;
            } else {
                countObj[treatment] = countObj[treatment] + 1;
                counter++;
            }
        }
    });

// key value 정렬후 새로운 객체생성
valuesForSort = Object.values(countObj);
keysForSort = Object.keys(countObj);
var percentage = 100 / counter;

for(var i=0; i<valuesForSort.length; i++){
    var tmp = i;
    for(var j=i+1; j<valuesForSort.length; j++){
        if(valuesForSort[tmp]<=valuesForSort[j]) tmp = j;
    }
    if(i !== tmp){
        var temp_v = valuesForSort[i];
        var temp_k = keysForSort[i];
        valuesForSort[i] = valuesForSort[tmp];
        keysForSort[i] = keysForSort[tmp];
        valuesForSort[tmp] = temp_v;
        keysForSort[tmp] = temp_k;
    }
}

for(var i=0; i<valuesForSort.length; i++){
    valuesForSort[i] = valuesForSort[i]*percentage;
    valuesForSort[i] = valuesForSort[i].toFixed(1);
}

console.log(valuesForSort)
console.log(keysForSort)

var sortedObj = {};

for(var i=0; i<valuesForSort.length; i++){
    sortedObj[keysForSort[i]] = valuesForSort[i];
}
console.log(sortedObj);

// 상위 3요소 외 전부 기타로 묶기
valuesForEtc = Object.values(sortedObj);
keysForEtc = Object.keys(sortedObj)
//console.log(valuesForEtc[0]);
//console.log(valuesForEtc.length)

if(valuesForEtc.length>3){
    console.log("상위 3요소 제외 전부 기타로 변형합니다.");
    // 상위 3요소 외 전부 삭제하고, 값은 3번째 인덱스에 고정
    for(var i=4; i<valuesForEtc.length; i++){
        valuesForEtc[3] = Number(valuesForEtc[3])+Number(valuesForEtc[i]);
        //console.log(valuesForEtc[3]);
        //console.log(sortedObj);
        delete sortedObj[Object.keys(sortedObj)[i]]; //4~번째부터의 인덱스 삭제
        console.log("변형작업완료");
    }
    // 3번째 인덱스 값의 이름을 기타로 변경
    sortedObj.기타 = sortedObj[Object.keys(sortedObj)[3]];
    sortedObj["기타"] = valuesForEtc[3]; // 기타 생성, 3번째 인덱스 값 넣기
    //console.log(valuesForEtc[3])
    delete sortedObj[Object.keys(sortedObj)[3]]; // 기존 3번째 인덱스 항목을 삭제
}

//그래프 그리기

var color = d3.scaleOrdinal()
  .domain(sortedObj)
  .range(d3.schemeSet2);

var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(sortedObj))

var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

svg
  .selectAll('pie')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

svg
  .selectAll('pie')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data.key+ " ("+ d.data.value+"%)"})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 15)

});