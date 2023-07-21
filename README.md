# 💰 모아요 (MOAYO)

<p>React, TypeScript, Rest API를 활용한 간편 가계부 프로젝트입니다.</p>

<br />

## 프로젝트 소개

> **패스트캠퍼스 프론트엔드 개발 부트캠프 5기**<br />
> **개발 기간** : 2023. 07. 05 ~ 2023. 07. 21<br />
> **배포 주소** : [가계부 체험하기!📱](https://ozazat.github.io/moayo/)

<br />

## 개발자 소개

| **[김가은](https://github.com/KIMKAEUN)** | **[김경원](https://github.com/ruddnjs3769)** | **[김준희](https://github.com/dev-junehee)** | **[정재현](https://github.com/debeck6)** |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: |
|<a href="https://github.com/KIMKAEUN"><img src="https://avatars.githubusercontent.com/u/129493066?v=4" width=150px alt="김가은" /> | <a href="https://github.com/ruddnjs3769"><img src="https://avatars.githubusercontent.com/u/84277185?v=4" width=150px alt="김경원" /> | <a href="https://github.com/dev-junehee"><img src="https://avatars.githubusercontent.com/u/116873887?v=4" width=150px alt="김준희" /> | <a href="https://github.com/iskra17"><img src="https://avatars.githubusercontent.com/u/128365197?v=4" width=150px alt="정재현" /> 
|Search 페이지|Main 페이지<br/>(일일, 주간, 월간, 전체)|Main 페이지<br/>(일일, 주간, 월간, 전체)|Calendar 페이지<br/>Chart 페이지|

<br />

## 사용기술 및 개발환경

### Development

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat&logo=styledcomponents&logoColor=white" />
<br />
<img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Ant Design-0170FE?style=flat&logo=antdesign&logoColor=white" />
<img src="https://img.shields.io/badge/Zustand-000000?style=flat&logo=Zustand&logoColor=white" />
</p>

### Config

<p>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white"/></a>
<img src="https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white"/></a>
</p>

### Deployment

<img src="https://img.shields.io/badge/GitHub Pages-181717?style=flat&logo=GitHub Pages&logoColor=white"/></a>

### Environment

<p>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/></a>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a>
</p>

### Cowork Tools
<p>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white" />
<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white" />
<img src="https://img.shields.io/badge/Zoom-2D8CFF?style=flat&logo=Zoom&logoColor=white" />
<img src="https://img.shields.io/badge/discord-5865F2?style=flat&logo=discord&logoColor=white" />
</p>

<br />

## 프로젝트 테스트

### clone project

```bash
$ git clone git@github.com:ozazat/moayo.git
```

### go to project

```bash
$ cd moayo
```

### install npm

```bash
$ npm install
```

### start project

```bash
$ npm run dev
```

<br />



## 프로젝트 상세 기능

### Main
+ DatePicker 이용하여 날짜별 데이터 출력
+ 일일, 월간, 연간, 전체 통계(지출, 수입, 총합) 출력
+ 일일, 주간, 월간, 전체 리스트 출력
+ 가계추가(/add) 페이지 이동 버튼 구현
#### 일일 (/main/daily)
+ 선택한 달을 기준으로, 각 일별 데이터 출력 (기본값 : 현재 연도, 월, 일)
+ 일별 지출, 수입 통계 표시
+ 컴포넌트로 태그, 내용, 금액, 시간 표시
+ 컴포넌트 클릭 시 수정(/edit) 페이지로 이동
#### 주간 (/main/weekly)
+ 선택한 달을 기준으로, 각 주간별 데이터 출력 (기본값 : 현재 연도, 월)
+ 주간별 지출, 수입 통계 표시
+ 주간 데이터 클릭 시 해당 주간의 일일 데이터 출력 (태그, 내용, 금액, 시간 등)
#### 월간 (/main/monthly)
+ 월별 기간, 지출, 수입 통계 표시
+ 선택한 연도를 기준으로, 각 월별 데이터 출력 (기본값 : 현재 연도)
+ 월간별 지출, 수입 통계 표시
+ 각 월 컴포넌트 클릭 시 해당 월의 모든 주간별 통계 표시 (지출, 수입)
### Add
+ ➕ 버튼 클릭 시 가계 추가 페이지로 이동
+ 날짜, 시간, 금액, 태그, 내용 입력 가능
+ 지출, 수입 버튼으로 구분하여 사용
+ 날짜, 시간: 각각 HTML Input 태그의 date, time 타입 이용 (기본값 : 현재 날짜, 시간)
+ 태그: HTML select 태그 이용, 지출, 수입 활성화 여부에 따라 변경됨

### Edit
+ 일일 데이터 클릭 시 해당 데이터 수정 페이지 이동
+ 날짜, 시간, 금액, 태그, 내용 등 기존 데이터 수정 기능
+ 삭제하기 버튼 클릭시 데이터 삭제 기능 

### Calendar
+ Fullcalendar 라이브러리 이용
+ 월별 통계(지출, 수입) 출력
+ DatePicker 이용하여 월 달력 출력
+ 달력 일일 칸에 일일 수입, 지출, 합계 출력
+ 해당 일 클릭시, 일일 리스트(/main/daily) 페이지로 이동 후 해당 일자로 스크롤
+ 가계추가(/add) 버튼 출력
### Chart
+ Chartjs 라이브러리 이용
+ 주간, 월간, 연간, 전체 파이 차트를 수입과 지출로 나누어 출력
+ 해당 기간의 카테고리 별 수입 및 지출 리스트를 금액별로 내림차순으로 정렬하여 출력
### Search
+ 태그 및 내용을 이용해서 검색
+ 출력된 목록 클릭시 해당 일로 이동하여 수정 및 삭제 가능
### Account
+ pixabay API를 이용하여 닉네임에 해당하는 동물 이미지를 호출함
+ 응답 받은 데이터 중 인기순(좋아요 수)으로 정렬한 후, 프로필 이미지로 출력


### 기타 기능
+ uuid 사용하여 중복 없는 사용자 id 및 무작위 닉네임 자동생성, localStorage로 관리
+ loadable 사용하여 코드 스플릿 및 로딩 컴포넌트 추가
+ day.js 및 moment 사용하여 날짜 포멧팅


<br />

## 프로젝트 회고

iOS 환경에서 주간 리스트가 나오지 않는 에러사항이 있습니다. <br/>
크롬이나 다른 데스크탑 브라우저와 안드로이드OS에서는 문제 없이 출력되는 것을 확인했습니다. <br/>
해당 오류에 대해 알고 계신 분이 있다면 메일 부탁드립니다..!
