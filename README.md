![apple-icon-60x60](https://github.com/FC-TOY-10/ddock-ple/assets/108085046/3f3cd6bd-0e1a-4a18-9e72-4498b86ebc1a)

# 똑플

### 🔗 배포주소

[똑플](https://ddock-ple.netlify.app/)

### 📄 프로젝트 소개

가계부 API를 이용하여 소비 기록과 소비 습관을 기를 수 있는 가계부 만들기  
똑플 : 똑똑한 소비 플랜

### 🗓 프로젝트 기간

2023.07.05 ~ 2023.07.23

### 📌 프로젝트 기능

#### 로그인 페이지

- 회원가입 페이지로 이동 가능
- 이메일 인증 후 로그인 가능
- 구글 아이디로 간편 로그인 가능
- 비로그인 상태에선 회원가입 페이지 외 다른 페이지 접속 불가
- 로그아웃시 로그인 페이지로 이동

#### 메인 페이지

- 월간 수입 + 지출 = 총액 표시
- 이번 달 예산 등록
- 총액/ 예산에 따른 비율을 스피너로 표시

#### 월간 페이지

- fullCalendar 기능 연동
- 등록된 입금, 지출 내역 fullCalnedar 연동후 노출
  - 입금, 지출 내역 데이터 비교
- 등록된 입금, 지출 내역 아래 리스트로 노출
- 리스트 내역 수정 및 삭제 기능
-

#### 등록 페이지

- 날짜 선택 datePicker 기능 연동
- 금액 입력후 입금, 지출 클릭시 데이터 구분
- 지출 등록시 카테고리 별 지출 등록 가능

#### 주간 페이지

- 월간 페이지에 등록한 입금, 지출 목록만 생성
- 주(week)마다 구분해서 리스트 생성
- 해당 주를 클릭하면 일(day)별로 목록 생성
- 수정, 삭제 버튼으로 일 목록 수정, 삭제 가능

#### 통계 페이지

- 주간 통계, 월간 통계 탭 구분 기능
- 주간 수입, 지출 데이터 차트 표현
  - 주간 수입, 지출 데이터 라인 차트 연동
  - 카테고리 별 지출 횟수 데이터 도넛 차트 연동
  - 지난주 총 금액 데이터 비교
- 월간 수입, 지출 데이터 차트 표현
  - 월간 자산 분석 데이터 파이 차트 연동
  - 월간 지출 TOP 3 카테고리 데이터 막대 그래프 연동
  - 월간 카테고리 별 지출 분석 레이더 차트 연동

#### 검색 페이지

- 검색 기간 필터링 기능
  - DatePicker 연동
- 검색 카테고리 필터링 기능
- 검색 결과 목록 노출 및 총 지출 금액 노출

### ⚒️ 기술 스택

<div style="display: flex; gap: 4px">
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/VITE-646CFF?style=flat&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/StyledComponents-DB7093?style=flat&logo=styledcomponents&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=white"/>
<img src="https://img.shields.io/badge/Zustand-133011?style=flat&logo=&logoColor=white"/>
</div>

### 👩🏻‍💻🧑🏻‍💻 개발팀 소개

|             **[이은비](https://github.com/EungBug)**             |   **[김하은](https://github.com/hahahaday12)**   |         **[황인승](https://github.com/hwanginseung)**          |
| :--------------------------------------------------------------: | :----------------------------------------------: | :------------------------------------------------------------: |
| 프로젝트 팀장,<br> Github 관리, <br>통계 페이지,<br> 검색 페이지 | 월간 페이지,<br>캘린더 구현,<br>소비 등록 페이지 | 로그인, 로그아웃,<br>회원가입,<br>메인 페이지,<br> 주간 페이지 |

### 📂 폴더구조

```
📦src
 ┣ 📂apis
 ┣ 📂components
 ┃ ┣ 📂chart
 ┃ ┣ 📂common
 ┃ ┣ 📂home
 ┃ ┣ 📂login
 ┃ ┣ 📂monthly
 ┃ ┣ 📂search
 ┃ ┗ 📂weekly
 ┣ 📂constants
 ┣ 📂pages
 ┣ 📂types
 ┣ 📂utils
 ┣ 📜GlobalStyle.tsx
 ┣ 📜firebase.ts
 ┣ 📜main.tsx
 ┣ 📜store.ts
 ┗ 📜vite-env.d.ts
```
