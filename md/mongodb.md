## mongodb 관련

#### 설치
    $ sudo apt-get install mongodb
    
#### 명령어
    버전 확인, 시작
    $ mongod --version
    $ mongo
    $ sudo npm install mongoose

    데이터베이스, 컬렉션 상태확인
    $ use <db이름>
    $ show dbs
    $ show collections

    db 삭제
    $ db.dropDatabase()

    db 만들기
    $ use 데이터베이스이름
    
    전체 내용 출력
    $ db.<collection이름>.find()

    내용 업데이트
    $ db.PatientInfo.update({age:""},{$set: {age:"undefined"}}, {multi: true}) //일괄적용
    $ db.PatientInfo.update({age:""},{$set: {age:"undefined"}}) //하나만 찾아 적용

    csv import
    $ mongoimport --db myDb --collection myCollection --type csv --headerline --file seoul.csv
    
    export
    $ mongodump --db <db이름>
    $ mongodump --db <db이름> --collection <collection이름>
    $ mongoexport --db corona --collection PatientInfo --type=csv --fields age --out PatientInfo_age.csv

    import
    $ mongorestore --db <db이름> --collection <collection이름> <파일경로/파일이름>.bson
