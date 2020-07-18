## Virtual machine 설정

#### visual code 포트포워딩 : 어댑터에 브리지
    1. remote Development 검색 후 install
    2. F1 -> Remote-SSH: Connect to Host...
    3. vm사용자명@ip주소 입력
    4. 비밀번호 입력

#### visual code 포트포워딩 : NAT
    1번과 2번은 어댑터와 동일하게
    3. virtual machine -> 설정 -> 네트워크 -> 고급 -> 포트포워딩
    4. 호스트 ip (본 컴퓨터), 게스트 ip (기본 10.0.2.15) 입력, 포트 22 
    5. virtual machine linux sshd 설치
      $ sudo apt-get install openssh-server
      $ service ssh start/restart
    6. 어댑터의 3, 4번과 동일한 단계 거치면 끝!
    
    웹 서버 다룰 시에는
    포트포워딩에 호스트 ip, 게스트 ip와 열고자 하는 포트 입력 (규칙 추가)
    호스트 ip:포트번호로 접속
    
#### remote 관련
    $ scp <옮길 파일명> <옮기는 대상 host>@<ip주소>:<대상 폴더>
    
#### 포트포워딩 성공 후 권한 없는 에러 뜰때
    $ sudo chown -R <내컴퓨터이름> .
