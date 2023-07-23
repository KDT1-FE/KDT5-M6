
![logo](https://github.com/yolo-wallet/yolo-wallet/assets/73880776/61166f2c-9cc2-4198-b7a5-54d24a788ffd)

# 5 Toy project YOLO Wallet

## 프로덕트 소개

### 소개

<strong>YOLO Wallet</strong>은 사용자의 소비 현황을 기록 및 추적 할 수 있는 웹 어플리케이션입니다.

### 기간

2023.07.05 ~ 2023.07.23 (18일)

### 역할

|                   박현준 (조장)                    | 정태욱                                           | 백진욱                                                    | 김현준                                              |
| :------------------------------------------------: | ------------------------------------------------ | --------------------------------------------------------- | --------------------------------------------------- |
| 렌딩 페이지 <br/> 지출내역 CRUD <br/>지출내역 검색 | 총괄<br/>github 관리</br>API 및 로그인 구현</br> | 켈린더 페이지</br>켈린더 구현</br>지출 내역 년, 월별 조회 | 차트 페이지<br/>차트 구현<br/> 클라이언트 상태 관리 |

### Link

[YOLO Wallet 구경하기](https://yolo-wallet.vercel.app/)

[YOLO Wallet Wiki](https://github.com/yolo-wallet/yolo-wallet/wiki)

[프로젝트 Github 저장소로 이동하기]

### Technologies & Tools

#### Front-end

<div style="display : flex">
  
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white" alt="Next.js" />

<img src="https://img.shields.io/badge/TypeScript-13324B?style=flat-square&logo=TypeScript&logoColor=white" alt="typeScript" />

<img src="https://img.shields.io/badge/Tailwind_CSS-40AEF0?style=flat-square&logo=Tailwind-CSS&logoColor=white" alt="tailwind" />

<img src="https://img.shields.io/badge/Ant_Design-26689A?style=flat-square&logo=Ant-Design&logoColor=white" alt="tailwind" />

<img src="https://img.shields.io/badge/Day.js-00A98F?style=flat-square&logo=Day.js&logoColor=white" alt="dayjs" />

<img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=Chart.js&logoColor=white" alt="chart.js" />

</div>

#### Back-end


<div style="display : flex">
  
<img src="https://img.shields.io/badge/Sanity-AA344D?style=flat-square&logo=Sanity&logoColor=white" alt="Sanity" />

<img src="https://img.shields.io/badge/TypeScript-13324B?style=flat-square&logo=TypeScript&logoColor=white" alt="typescript" />

<img src="https://img.shields.io/badge/Next--auth-512BD4?style=flat-square&logo=Next.js&logoColor=white" alt="next-auth" />

</div>


#### Deploy

<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white" alt="vercel" />

### 페이지 구성
 
- 렌딩 페이지

| 렌딩 페이지 (로그인 전) |  렌딩 페이지 (로그인 후) |
|:-------------------------------------:|:------:|
| ![lending_before_login](https://github.com/yolo-wallet/yolo-wallet/assets/73880776/4d13a197-230b-4c15-93a0-e4224a78ef47) | ![lending_after_login](https://github.com/yolo-wallet/yolo-wallet/assets/73880776/b21acc05-e190-46fb-bb61-b402f7a5b476) |

| 켈린더 페이지 |
|:----:|
| ![calendar_page](https://github.com/yolo-wallet/yolo-wallet/assets/73880776/dd91f5be-19cc-42a0-b5af-c1c448fb744d) |

| 차트 페이지 |
|:----:|
| ![chart](https://github.com/yolo-wallet/yolo-wallet/assets/73880776/22c1456f-c489-47d7-8720-77bd8763318c) |

| DB Managment 페이지 (Sanity Lake) |
|:----:|
| ![db_page](https://github.com/yolo-wallet/yolo-wallet/assets/73880776/47043ef6-2d2e-49bc-887a-f5e30189d140) |


### 다이어그램

![YOLO_Diagram](https://github.com/yolo-wallet/yolo-wallet/assets/73880776/89fb6431-e97d-4ca6-ac26-f0201c93c9c6)


## 회고


### 백지욱

제가 맡은 역할은 캘린더 페이지였습니다.

next.js를 처음 사용했던것도 있고 기본기가 부족해서 그런지

처음 구상했던거보다 많은걸 구현하지 못하였습니다.

구현을 하더라도 디자인적으로 깔끔 하지 못하게 구현못할껀 깔끔하게 포기했습니다.

또한 이것저것 시도하다가 라이브러리를 포기하지 못하고 사용하였습니다.

저희 조는 태욱님께서 서버를 따로 만들고 예시 api를 만들었다던지

좋은 코드 나쁜코드를 이야기 해주셨습니다.

토이프로젝트2는 많은걸 배워갈 시간이였다고 생각합니다

----

### 정태욱

#### 좋았던 점

1. Headless CMS (Sanity), Next-Auth 사용

Headless CMS와 Next-Auth로 백엔드와 소셜 로그인 구현을 구현했다.

Headless CMS (Sanity)는 schema를 작성하는 방법과 GROQ라는 자체 쿼리언어가 직관적이라 문서를 join하는 것과 transaction 처리가 간단했다.

Next-Auth는 내부적으로 로그인에 필요한 인증을 모두 처리해주고,

서버에서 사용할 수 있는 getServerSession과 클라이언트에서 사용할 수 있는 useSession hook을 제공하기 때문에 간단하게 로그인을 구현 할 수 있었다.

2. Github Organization 활용

Github의 Organization, issue template, Wiki, Project 칸반 보드, Git flow를 활용해 프로젝트를 관리했다.

#### 아쉬웠던 점

1. Optimistic UI

클라이언트에서 인터렉션한 작업이 많았고

react-query나 SWC를 사용해서 클라이언트에서 API 요청이 일어나면 일부 요청은 revalidate되지 않고

캐싱된 데이터를 Optimistic하게 제공함으로 API의 요청을 최소한으로 줄여보고 싶었는데

아쉽게도 페이지를 담당하지 않아서 적용해보지 못했다.

2. Server Component, Server Side Caching

Next.js 12의 pages directory를 사용했기 때문에 CSS 프레임워크나 라이브러리의 모든 소스를 클라이언트로 전송해야 했고,

Next.js 13의 fetch API로 프론트 서버에서 API의 호출 결과를 캐싱함으로 DB에 부하를 줄이고 요청 속도를 높이고 싶었는데 아쉽게도 12버전을 사용했기 때문에 적용하지 못했다.

---

### 박현준

Next.js를 처음 사용해 봄으로 인해 처음에 어색함이나 어려움을 겪었으나 사용하면 할수록 정돈된 느낌으로 너무나 편했습니다.

Next.js에서는 Antd(라이브러리) 사용 시 Dynamic import를 통해 가져와야 함.

![image](https://github.com/yolo-wallet/yolo-wallet/assets/73880776/1e1fd77a-d1e0-471f-99b7-61fc683bb499)


```js
   import dynamic from 'next/dynamic'
    const DatePicker = dynamic(() => import('antd').then((lib) => lib.DatePicker), {
      ssr: false,
      loading: () => <div>loading...</div>
    })
    
    export default function DatePickerForm() {
      return <DatePicker />
    }
```

Github 이슈 기능 첫 활용으로 실시간으로 동료들 진행현황 확인 가능하며 확실하고 체계화된 팀 프로젝트가 가능했다.

폴더 구조를 좀 더 명확하게 이해할 수 있었다.

모르는 부분을 끝까지 혼자 해결해 보려고 노력해봤지만 그럼에도 모르겠는 오류가 생기거나 깃허브 관련해서는 아직 겁이 좀 많아서 태욱 님에게 정말 많은 도움을 받았고 정말 많은 공부를 할 수 있어서 좋았다.

팀원들끼리 필요한 요구사항을 전달하며 수정 작업을 하는 게 너무 좋았다.

컨벤션을 확실히 정해놓고 시작하는 첫 프로젝트인 만큼 여러 가지로 아쉬움도 많지만 그에 비례해 배운 점도 많았기에 다음에는 더 잘할 수 있을 거란 자신감도 조금은 생겼습니다.








