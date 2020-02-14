## node js & express 기본
#### node js
    $ sudo apt-get update
    $ sudo apt-get install -y node.js

#### express
    $ mkdir 폴더명
    $ npm init
    $ npm install express.js
  
#### express server 기본 틀
포트 번호는 내맘

    const express = require('express')
    const app = express()
    app.get('/', (req, res) => {
      res.send('hello world!')
    })
    app.listen(3000, () => { //포트번호 설정
      console.log('3000 port open')
    })
  
#### routing 예시
    const express = require('express')
    const app = express()
    app.get('/', (req, res) => { res.send('index page') })
    app.get('/test', (req, res) => { res.send('test page') })
    app.get('/member', (req, res) => { res.send('member page') })
    app.get('/board', (req, res) => { res.send('board page') })
    app.listen(3000, () => {
      console.log('3000 port open')
    })
