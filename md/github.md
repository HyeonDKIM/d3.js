## 모르면 좀 보고 써먹자 Github 사용법 간단 정리

#### git 설치
    $ sudo apt-get install git-core
    $ git config --global user.name "HyeonDKIM"
    $ git config --global user.email "aquaifnt7@gmail.com"
    
#### repository 만들기
    $ mkdir 플젝이름
    $ git init
    $ vim README
    $ git add README
    
    id, pw 입력으로 업데이트
    # git push origin master 
    
    저장소를 복제할 때에는
    $ sudo git clone https://github.com/주소
    $ sudo git fetch origin

#### git 명령어
    저장소 업데이트
    $ sudo git pull
    
    git 상태 확인
    $ git status
    
    커밋 전 변경된 모든 파일 추가
    $ sudo git add -A
    
    커밋
    $ sudo git commit -m "커밋메시지"
    $ sudo git push
    
    
