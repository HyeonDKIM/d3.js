/*
references
https://velog.io/@dooreplay/%EC%9C%84%EC%BD%94%EB%93%9C-5-6%EC%9D%BC%EC%B0%A8-TIL-js-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%ED%95%A8%EC%88%98%EC%99%80-json-%EB%8D%B0%EC%9D%B4%ED%84%B0-7gjywv7yz4

*/
var tmp_name = [];

function categoryChange(e) {
  var json_gu = [];
  var json_topo ='./topology/'+String(e.value)+'-topo.json';
  fetch(json_topo) // json파일이 있는 파일의 경로
    .then((res) => res.json()) // 데이터를 json형태로 바꿔주기
    .then(function (data) { // data라는 임의의 값을 인자로 받는 함수.

      //여기 수정 요망!!!!!
      json_gu = data.objects.Seoul.geometries; //json파일을 감싸는 객체가 result로 시작해서 data.result
      for(var i=0; i<json_gu.length; i++){
        var json_gu_tmp = json_gu[i].properties.SIG_ENG_NM;
        tmp_name.push(json_gu_tmp);
        console.log(json_gu_tmp);
      }
      updateName(e);
    });
  }

function updateName(e) {
//예제
    var target = document.getElementById("sido_name");
    console.log(e.value);

    var d = tmp_name;
    console.log(d);
    target.options.length = 0;
   
    for (x in d) {
      var opt = document.createElement("option");
      opt.value = d[x];
      opt.innerHTML = d[x];
      target.appendChild(opt);
    } 
  }
  