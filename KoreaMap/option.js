function categoryChange(e) {

   // var json_topo = require('./topology/'+e.value+'-topo.json');

  //  var json_gu_length = json_topo.properties.SIG_ENG_NM.length;

    //console.log(json_gu_length);

//예제
    var good_a = ["ㅁ", "ㄴ", "ㅇ", "ㄹ"];
    var good_b = ["ㅂ", "ㅈ", "ㄷ", "ㄱ"];
    var good_c = ["ㅋ", "ㅌ", "ㅊ", "ㅍ"];
    var target = document.getElementById("sido_name");
   
    console.log(e.value);

    if(e.value == "Seoul") {
        var d = good_a;
    }
    else if(e.value == "b") var d = good_b;
    else if(e.value == "c") var d = good_c;
   
   target.options.length = 0;
   
    for (x in d) {
      var opt = document.createElement("option");
      opt.value = d[x];
      opt.innerHTML = d[x];
      target.appendChild(opt);
    } 
  }
  