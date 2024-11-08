# 🌏 Space_Var

## ☑️ 프로젝트 소개

#### 주제: 우주 여행 예약 사이트

- `space_var`는 **우주 여행의 꿈을 현실로 만드는 웹 사이트입니다.** `HTML`, `CSS`, `JavaScript`를 활용하여 개발했으며, 목성, 화성, 토성 등 다양한 태양계의 행성을 목적지로 설정할 수 있고, 우주를 배경으로 한 영상을 통해 신비로운 분위기를 연출합니다. 간단한 폼 입력을 통해 원하는 행성으로의 여행을 예약할 수 있으며, 방문자들에게 우주 여행에 대한 설렘을 전달하는 특별한 웹 사이트라 할 수 있습니다.

#### 페이지 소개

##### 첫 화면 `entry.html`

![0](https://github.com/user-attachments/assets/9bc01ddb-0255-4082-9997-894feaf5246e)
![0-1](https://github.com/user-attachments/assets/6d3ac7fd-58a1-4f65-81bc-45f0bdaeacb7)

- 로고를 누르면 로고를 중심으로 검은색 배경이 퍼지는 애니메이션이 실행됩니다.

    <br/>

##### 메인 화면 `start.html`

![1](https://github.com/user-attachments/assets/2cdb0d60-d28a-48a6-8e57-0f883685a079)
![1-2](https://github.com/user-attachments/assets/7f415050-bd9a-4077-8b0f-c7027017768d)
![1-3](https://github.com/user-attachments/assets/21b88b29-4f0f-4d4b-a555-a2902f7ce662)

- 헤더의 company 버튼을 누르면, `company.html` 페이지로 이동합니다.
- 헤더의 book now 버튼을 누르면, `seats.html` 페이지로 이동합니다.
- 스크롤을 내리면 특정 위치에 도달할 때마다 섹션이 바뀌는 효과를 적용했습니다.

  <br/>

##### 회사 소개 `company.html`

![company](https://github.com/user-attachments/assets/fce4fd3c-99d2-4aaf-856c-b058a83df4d8)

- 첫 번째 섹션에선 **space_var** 회사를 자세하게 소개합니다.
- 두 번째 섹션에선 태양계 행성들의 공전 모습을 본따 CSS 애니메이션으로 구현하여 도착지 행성들을 소개합니다.
- 세 번째 섹션에선 우주비행사(CREW)를 소개합니다.
- 네 번째 섹션에선 space_var의 위치를 지도로 나타냅니다.
- 마지막 섹션의 버튼을 누르면, `seats.html` 페이지로 이동합니다.

  <br/>

##### 좌석 예약 페이지 `seats.html`

![seat](https://github.com/user-attachments/assets/b0f8e29d-2a02-4def-8e14-8b10729d3957)

- 자세한 예약 정보 입력 전, 좌석을 먼저 선택하는 페이지입니다.
- A1~A4, B1~B4 중 한 좌석을 선택하면, 아래에 선택한 좌석이 보입니다.
- Reset 버튼으로 초기화 할 수 있습니다.
- Payment to payment 버튼을 누르면, `book.html` 페이지로 이동합니다.

  <br/>

##### 예약 및 결제 정보 입력 페이지 `book.html`

![book-1](https://github.com/user-attachments/assets/d3c0f7b6-961c-405f-b776-da53ee06ebf3)
![book-2](https://github.com/user-attachments/assets/9e0b89f3-2753-429d-9509-aa319418b8b9)
![book-3](https://github.com/user-attachments/assets/e9546392-d5f4-489a-a2a1-978a8a9398d0)
![book-4](https://github.com/user-attachments/assets/44d57d24-7bcd-4eaa-a0d0-e20e0ea9c778)

- 도착지 행성을 선택하면 해당 행성에 따라 사이드 섹션의 배경이 바뀝니다.
- 도착지 행성을 선택했을 때 해당 행성 이미지의 크기가 살짝 커집니다.
- 캐러셀을 통해 추가적인 행성 또한 선택할 수 있습니다.
- 행성 선택 후 해당 행성 여행 가격이 나타납니다.
- 예약자 정보를 입력할 때 양식에 맞지 않으면 입력란의 테두리가 빨간색으로 바뀝니다.
- 전화번호와 이메일 입력란 가장자리의 CERTIFICATION 버튼을 눌렀을 때 VERIFIED/FAILD로 버튼 상태가 바뀝니다.
- 실제 검증 API를 구현한 것이 아니라, 그렇게 보이게만 구현하였습니다.
  (양식에 맞지 않으면 FAILD로 바뀌고, 양식에 맞으면 VERIFIED로 바뀌도록 구현하였습니다.)
- 행성 선택 및 모든 검증이 완료되면 BOOK NOW 버튼이 활성화됩니다.
- 활성화 된 BOOK NOW 버튼을 누르면 티켓 모양으로 예약내역이 나타납니다.
- 예약 내역의 GO TO MAIN PAGE를 누르면, `start.html` 페이지로 이동합니다.

  <br/>

#### 기술 스택

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

#### Figma

- [Figma 작업물 보러가기 ](https://www.figma.com/design/odjqqMzSFQ0WwYxJPaLFTz/%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B0%80%EB%8B%A5%EB%A7%8C-%EB%9F%AC%ED%94%84%ED%95%98%EA%B2%8C?node-id=0-1&node-type=canvas&t=sILVeWTtZRq9499O-0)

## ☑️ 팀 소개

### 제로 마일리지

- 우주여행을 떠나도 마일리지를 쌓을 수 없는 현실을 반영한 이름입니다. 개발에 있어서도 마일리지를 쌓기 위해 끝없이 노력하겠다는 의미를 담고 있으며, 초심을 지키며 차근차근 개발 능력을 키워나가고자 합니다.

### 팀원 소개

#### 👨‍🚀 [김민섭](https://github.com/mycreature) `INTJ`

💭 보다 전문적인 코드를 작성하는 개발자가 되고 싶습니다.

#### 👩‍🚀 [김수진](https://github.com/ksj0621) `INFJ`

💭 소비자와 개발자를 연결해주는 개발자가 되고 싶습니다!

#### 👩‍🚀 [박정혜](https://github.com/YellowFiber) `INTJ`

💭 효율적인 코드를 만들기 위해 노력하는 개발자가 되고 싶습니다.

#### 👩‍🚀 [신명희](https://github.com/mh0223) `ISFP`

💭 펠리컨적 사고(일단 시도해보자)를 추구하며 도전하는 개발자가 되고 싶습니다!

#### 👨‍🚀 [지윤환](https://github.com/yoonwhan-ji) `ISFJ`

💭 트러블 슈팅을 잘하는 개발자가 되고 싶습니다.
