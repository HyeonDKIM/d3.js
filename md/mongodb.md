## mongodb 관련

#### 설치
    $ sudo apt-get install mongodb
    
#### 명령어
    버전 확인, 시작
    $ mongod --version
    $ mongo

    데이터베이스, 컬렉션 상태확인
    $ use <db이름>
    $ show dbs
    $ show collections
    
    전체 내용 출력
    $ db.<collection이름>.find()
    
    export
    $ mongodump --db <db이름>
    $ mongodump --db <db이름> --collection <collection이름>

    import
    $ mongorestore --db <db이름> --collection <collection이름> <파일경로/파일이름>.bson
