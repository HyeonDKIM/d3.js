var width_pie = 450
    height_pie = 450
    margin_pie = 40

var radius = Math.min(width_pie, height_pie) / 2 - margin_pie

// 주상병코드 받았다고 가정
var get_maininjurycode = "A00";
// 부상병코드 받았다고 가정
var get_viceinjurycode = "A03";
var pie_main = "pie_main";
var pie_vice = "pie_vice";
var table_main = "table_main";
var table_vice = "table_vice";


if (get_viceinjurycode===""){
    make_charts(get_maininjurycode);
    console.log("부상병코드 없음");
}
else{
    make_charts(get_maininjurycode, pie_main, table_main);
    make_charts(get_viceinjurycode, pie_vice, table_vice);
}


function make_charts(get_code, tag_pie, tag_table){

    var svg_pie = d3.select("#"+tag_pie)
    .append("svg")
      .attr("width", width_pie)
      .attr("height", height_pie)
    .append("g")
      .attr("transform", "translate(" + width_pie / 2 + "," + height_pie / 2 + ")");

    // 데이터 정제
    d3.json("./tmp.json", function(err, data) {
        if (err) throw error;
        var counter = 0; // value 개수 세기
        console.log(data)
        var countObj={};
        data.forEach(function(d) {
            var injurycode = d.injurycode;
            var treatment = d.treatment;
    
            // 주, 부상병코드 체크
            if(injurycode === get_code){
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
    //console.log(sortedObj)
    
    //그래프 그리기-------------------------------------------------------
    
    var color = d3.scaleOrdinal()
      .domain(sortedObj)
      .range(d3.schemeSet2);
    
    var pie = d3.pie()
      .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(sortedObj))
    
    var arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    
    svg_pie
      .selectAll("pie")
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
    
    svg_pie
      .selectAll("pie")
      .data(data_ready)
      .enter()
      .append('text')
      .text(function(d){ return d.data.key+ " ("+ d.data.value+"%)"})
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 15)
    
    // 차트 그리기-----------------------------------------------
    
    var tableArr = new Array();
    
    
    for(var i=0; i<Object.values(sortedObj).length; i++){
        var tableObj = new Object();
        tableObj.Rank = i+1;
        tableObj.Treatment = Object.keys(sortedObj)[i];
        tableObj.Percentage = Object.values(sortedObj)[i];
        tableArr.push(tableObj);
    }
    
   // console.log(tableArr);
    
    
      var table = d3.select('#'+tag_table).append('table');
      var titles = ["Rank", "Treatment", "Percentage"];
      var headers = table.append('thead').append('tr')
                       .selectAll('th')
                       .data(titles).enter()
                       .append('th')
                       .text(function (d) {
                            return d;
                        })
    
      
      var rows = table.append('tbody').selectAll('tr')
                   .data(tableArr).enter()
                   .append('tr');
      rows.selectAll('td')
        .data(function (d) {
            return titles.map(function (k) {
                return { 'value': d[k], 'name': k};
            });
        }).enter()
        .append('td')
        .attr('data-th', function (d) {
            return d.name;
        })
        .text(function (d) {
           //console.log(d.value)
            return d.value;
        });
    });
}
