var SERVER_PORT = 8090; // 서버포트
var FILE_DEFAULT = "main.html";

// 모듈 로드
var
  http = require('http'),
  URL  = require('url'),
  path = require('path'),
  fs   = require('fs');

var sever = http.createServer(checkRequest);
sever.listen(SERVER_PORT, function(){
  console.log("서버가 기동되었습니다");
  console.log("http://localhost:" + SERVER_PORT);
});

// 서버에 요청(request)이 있을 경우의 처리
function checkRequest(req, res) {
  var uri = URL.parse(req.url, true);
  var pathname = uri.pathname;
  if (pathname == "/") pathname = FILE_DEFAULT;
  console.log(pathname);
  
  // 파일의 존재 확인
  var filename = path.join(__dirname, pathname);
  if (!fs.existsSync(filename)) {
    res.writeHead(404, {'Content-Type':'text/html'});
    res.end("404 file not found");
    return;
  }

  // 디렉토리인 경우, 에러로 처리
  var stat = fs.statSync(filename);
  if (stat && stat.isDirectory()) {
    res.writeHead(403, {'Content-Type':'text/html'});
    res.end("403");
    return;
  }

  // 파일을 보냄
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end(fs.readFileSync(filename, "utf-8"));
}
