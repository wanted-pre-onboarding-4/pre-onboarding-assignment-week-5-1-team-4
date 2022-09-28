# Assginment #7

## 🎯 프로젝트 목표

#### 검색창 구현 + 검색어 추천 기능 구현



## ⏰ 프로젝트 기간

#### 2022-09-27 ~ 2022-09-29



## 🎬 프로젝트 데모

![임상](/Users/seoljaehyeok/Desktop/임상.gif)



## :nut_and_bolt: 과제 요구 사항

- [한국임상정보](https://clinicaltrialskorea.com/) 사이트의 검색영역을 클론하기
- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
  - 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
    - 예)
      - 사용자 입력: 담낭 추천 검색어: **담낭**의 악성 신생물, **담낭**염, **담낭**의 기타 질환, 달리 분류된 질환에서의 **담낭**, 담도 및 췌장의 장애
  - 검색어가 없을 시 “검색어 없음” 표출
- API 호출 최적화
  - API 호출별로 로컬 캐싱 구현
    - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
  - 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
  - API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
- 키보드만으로 추천 검색어들로 이동 가능하도록 구현
  - 사용법 README에 기술



## 💡API 호출 최적화

### 캐싱 구현 방식

caching 기능을 저희는 전역 상태 관리로 다루어 주기로 하였습니다.  

전역상태에서 searches 데이터를 object로 관리를 하고 검색어를 key로, 검색된 결과값의 배열을 value로 저장을 하였습니다. 
다시 똑같은 검색어를 입력 시  전역 상태의 object에서 key indexing을 하여  값이 있으면 저장되어 있는 값을 사용을 하고 없으면 api를 호출하는 방식으로 구현을 하였습니다.  

처음엔 Redux로 관리를 할까 생각하다가  object 하나만 관리를 해주면 되기 때문에 전역상태데이터 관리 로직이 간단하여  Context API를 선택을 하였습니다.

### API 호출 횟수를 줄일 수 있는 방법

API 호출 횟수를 줄일 수 있는 방법은 대표적으로 Debounce를 이용하여 DOM Event를 최적화함으로써 API 호출 횟수를 줄일 수 있습니다.

Debounce란 `delay` 를 설정하고 이 시간 내의 다른 이벤트가 발생하면 timer를 초기화하고 `delay` 시간 동안 이벤트가 발생하지 않으면 이벤트를 처리해주는 프로그래밍 기법입니다.

저희는 `useDebounce` 훅을 만들어 유저의 입력을 `200ms` 만큼 기다리고 만약 이 시간 내에 이벤트가 발생한다면 `delay` 를 초기화시켜 유저의 입력이 모두 끝난 후 API 요청을 할 수 있게 구현했습니다.



## ⌨️ 추천 검색어 이동 방법

- 위로 가기 키와 아래로 가기 키를 이용해서 검색 결과에 접근할 수 있습니다. 

- ESC를 누르게 되면 검색창이 초기화되고 검색 결과 또한 초기화가 됩니다.



## :hammer: 사용 스택

- React
- Axios
- Context API
- styled-components



## 🛠 프로젝트 구조

<details> 
  <summary>펼치기</summary> 
<div style="background-color: #f7f6f2">
 📦server<br />
 📦src<br />
 ┣ 📂hooks<br />
 ┃ ┗ 📜useDebounce.js<br />
 ┣ 📂pages<br />
 ┃ ┣ 📂components<br />
 ┃ ┃ ┣ 📜SearchForm.jsx<br />
 ┃ ┃ ┣ 📜SearchItem.jsx<br />
 ┃ ┃ ┗ 📜SearchList.jsx<br />
 ┃ ┗ 📜Search.jsx<br />
 ┣ 📂services<br />
 ┃ ┗ 📜api.js<br />
 ┣ 📂store<br />
 ┃ ┗ 📜search.js<br />
 ┣ 📂styles<br />
 ┃ ┣ 📜GlobalStyles.js<br />
 ┃ ┗ 📜theme.js<br />
 ┣ 📂utils<br />
 ┃ ┗ 📜func.js<br />
 ┣ 📜App.js<br />
 ┗ 📜index.js<br />
  </div>
</details>




## :handshake: 프로젝트 팀원

| 이름          |               역할                |
| ------------- | :-------------------------------: |
| 설재혁 / 팀장 | 요구사항 초기 버전 구현, 리팩토링 |
| 김명원        | 요구사항 초기 버전 구현, 리팩토링 |
| 박보선        | 요구사항 초기 버전 구현, 리팩토링 |
| 김지혜        | 요구사항 초기 버전 구현, 리팩토링 |
| 이시형        | 요구사항 초기 버전 구현, 리팩토링 |
| 홍주완        | 요구사항 초기 버전 구현, 리팩토링 |
| 이후경        | 요구사항 초기 버전 구현, 리팩토링 |



## 📖 WiKi

- [Commit Convention & Git Flow](https://github.com/wanted-pre-onboarding-4/pre-onboarding-assignment-week-5-1-team-4/wiki/Convention-&-Git-Flow)



## 🖥 Getting Started

1. `Clone` the repository

   ```markdown
   $ git clone https://github.com/wanted-pre-onboarding-4/pre-onboarding-assignment-week-5-1-team-4.git
   ```

2. `Start` Server

   ```bash
   cd server
   npm install
   npm start
   ```


3. `Start` Project

   ```bash
   npm install
   npm start
   ```

   

