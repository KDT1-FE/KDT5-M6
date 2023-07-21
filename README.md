# KDT5-M6 가계부 토이 팀프로젝트

## 프로젝트 소개 💵

`SOBI`는 소비내역이 달력에 표시되며 월별 소비금액을 그래프로 볼 수 있는 웹 어플리케이션 입니다.

[SOBI 보러가기](https://sobi-salad.vercel.app/)

로컬에서 테스트 하실 경우
root 폴더에 .env 파일 생성 후

```
VITE_USER_ID=team3
```

~숫자 바꾸면 다른 조 데이터도 볼 수 있어요~

## 문과이과 팀 소개

| 팀원 |   `이`정우   |                     `이`시우                     |         `문`현수          |            `문`대현            |
| :--: | :----------: | :----------------------------------------------: | :-----------------------: | :----------------------------: |
| 담당 | 총괄<br>차트 | 소비내역 생성<br>소비내역 수정<br> 소비내역 삭제 | 소비내역 불러오기<br>달력 | 소비내역 검색<br>검색 자동완성 |

## API

1. 소비 기록 작성 API
   Request:

```javascript
POST /expenses
Content-Type: application/json
{
  "amount": 100,
  "userId": "user123",
  "category": "food",
  "date": "2023-07-04T10:30:00.000Z"
}
```

Response:

```javascript
Status: 201 Created
{
  "message": "Expense created successfully"
}
```

2. 소비 품목 목록 API
   Request:

```javascript
GET /categories?userId={userId}
```

Response:
Status: 200 OK

```javascript
['food', 'clothing', 'electronics'];
```

3. 검색어에 해당하는 소비 항목 및 금액 조회 API
   Request:

```javascript
GET /expenses/search?q={keyword}&userId={userId}
```

Response:

```javascript
Status: 200 OK
[
  {
    "amount": 100,
    "userId": "user123",
    "category": "food",
    "date": "2023-07-04T10:30:00.000Z"
  },
  {
    "amount": 80,
    "userId": "user456",
    "category": "food",
    "date": "2023-07-03T14:20:00.000Z"
  }
]
```

4. 일별, 주별, 월별 소비 조회 API
   Request:

```javascript
GET /expenses/summary?period={period}&userId={userId}
period : daily, weekly, monthly
```

Response:

```javascript
Status: 200 OK
[
  {
    "_id": "2023-07-04",
    "totalAmount": 180
  },
  {
    "_id": "2023-07-03",
    "totalAmount": 80
  }
]
```

5. 소비 기록 수정 API
   Request:

```javascript
PUT /expenses/123
Content-Type: application/json
{
  "amount": 150,
  "userId": "user123",
  "category": "food",
  "date": "2023-07-04T10:30:00.000Z"
}
```

Response:

```javascript
Status: 200 OK
{
  "message": "Expense updated successfully"
}
```

6. 소비 기록 삭제 API
   Request:

```javascript
DELETE / expenses / 123;
```

Response:

```javascript
Status: 200 OK
{
  "message": "Expense deleted successfully"
}
```

7. 소비 기록 달력 호출 API
   Request:

```javascript
GET /expenses/calendar?year=2023&month=7&userId={userId}
```

Response:

```javascript
Status: 200 OK
{
  "1": [
    {
      "amount": 100,
      "userId": "user123",
      "category": "food",
      "date": "2023-07-01T10:30:00.000Z"
    }
  ],
  "4": [
    {
      "amount": 80,
      "userId": "user456",
      "category": "food",
      "date": "2023-07-04T14:20:00.000Z"
    }
  ]
}
```

<br><br>

## 사용한 기술, 라이브러리

### Environment

<img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=flat&logo=visualstudiocode&logoColor=white"/><br>
<img src="https://img.shields.io/badge/GIT-F05032?style=flat&logo=git&logoColor=white"/><br>
<img src="https://img.shields.io/badge/GIT HUB-181717?style=flat&logo=github&logoColor=white"/><br>

### Config

<img src="https://img.shields.io/badge/NPM-CB3837?style=flat&logo=npm&logoColor=white"/><br>
<img src="https://img.shields.io/badge/VITE-646CFF?style=flat&logo=vite&logoColor=white"/><br>

### Development

<img src="https://img.shields.io/badge/REACT-61DAFB?style=flat&logo=React&logoColor=white"/><br>
<img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=flat&logo=typescript&logoColor=white"/><br>
<img src="https://img.shields.io/badge/REACT ROUTER-CA4245?style=flat&logo=reactrouter&logoColor=white"/> <br>
<img src="https://img.shields.io/badge/ANT DESIGHN-0170FE?style=flat&logo=antdesign&logoColor=white"/> <br>
<br><br>

## 화면 구성

#### SOBI 웹페이지 tour

![2023-07-21_11-26-16](https://github.com/KDT5-FE-M6-team3/toy3/assets/87072568/5ad530c0-35da-4d41-b9a2-9b796c956001)

- Ant Design의 tour 기능을 활용.
- 방문 여부를 로컬에 저장하여 첫방문시에만 활성화된다.
<hr>

#### 메인 화면

<img width="1280" alt="image" src="https://github.com/KDT5-FE-M6-team3/toy3/assets/87072568/d65c2a38-6878-4dd6-8449-de5b6cbc531b"><br>

- 일소비 금액별로 색이 다르게 표시된다.
- 일소비 내역 횟수가 해당 날짜에 숫자로 표시된다.
- 우측 하단 + 버튼을 눌러 소비내역을 등록할 수 있다.
- 우측 상단 검색창을 통해 소비내역을 검색 할 수 있다.
<hr>

#### 소비내역 등록 모달

<img width="1279" alt="image" src="https://github.com/KDT5-FE-M6-team3/toy3/assets/87072568/f2b4ef1c-722c-40c5-89a9-1dc3d09b039f">

- Date picker로 날짜와 시간을 선택할 수 있다.
- 유효성 검사를 통과해야 소비내역을 등록할 수 있다.
- 유효성 검사 결과와 등록 결과 등을 팝업 메세지로 사용자에게 알려준다.
<hr>

#### 서랍 메뉴

<img width="1280" alt="image" src="https://github.com/KDT5-FE-M6-team3/toy3/assets/87072568/b22f9d50-4ff0-418d-b63f-58e06c8ebe9c">

- 페이지를 이동할 수 있다.
- 좌측 하단에 Color picker로 사용자가 원하는 강조색을 선택할 수 있다.
<hr>

#### 강조색 선택

![2023-07-21_11-25-06](https://github.com/KDT5-FE-M6-team3/toy3/assets/87072568/560307c0-c14d-4dc8-98d8-d28388476899)

- 리액트 내장 context api를 사용하여 강조색을 전역상태관리.
- 로컬 저장소에 색의 hex값을 저장하여 새로고침을 하거나 브라우저를 종료하여도 강조색이 유지된다.
<hr>

#### 소비 통계 페이지

![2023-07-21_11-23-55](https://github.com/KDT5-FE-M6-team3/toy3/assets/87072568/75e79b0f-bd42-4597-a253-df31ddefdd73)

- 월별 소비액을 그래프로 나타낸다.
- chartjs 라이브러리 사용.
- 통신 중에는 skeleton 로딩 ui를 보여준다.
- 기간을 선택할 수 있다.
- api 통신 성공 여부를 배너 메세지로 표시한다.
<hr>

## 고찰

#### 이정우

- 협업

  - 깃허브 이슈기능 활용
    <img width="892" alt="image" src="https://github.com/KDT5-FE-M6-team3/toy3/assets/87072568/d1fad683-8257-46f2-a284-8b2378b2c42b">
    - 기능 단위로 이슈를 발행, 진행상황등을 깃허브 내에서 파악 할 수 있음.
    - 기능의 단위를 어느정도로 잡아야할지 판단이 어려움
      - 예를 들어 월별 소비 금액 차트 내에서도 여러 세부 기능을 나뉘는데 세부 기능마다 이슈를 생성해야 하는지
      - 그렇다고 너무 큰 단위의 기능의 경우 한번에 PR하는 양이 많아지는 문제가 발생
  - commit 단위 및 메세지

    <img width="347" alt="image" src="https://github.com/KDT5-FE-M6-team3/toy3/assets/87072568/be0145a5-1e2b-45fd-8607-1e2b7c2891df">

    - 컨벤션이 초반에는 비교적 잘 지켜졌지만 후반부에는 잘 지켜지지 않음.
      <br><br>

- Ant Design

  - 리액트 컴포넌트 기반의 UI라이브러리.
  - 몇가지 규약만 지켜주면 빠른시간내에 완성도 있고 일관성있는 UI를 만들 수 있다.
  - 다양한 기능들을 최대한 사용해보고자 하였음
    - Tour, Table, Modal, Skeleton, Drawer, Date Picker, Color Picker, Autocomplete 등...
  - 그러나 커스터마이징 제약이 있다는 점, CSS를 잘 다루는 못하는 초보자의 경우 antD 의존성이 크게 올라가므로 배우는 입장에서는 scss나 tailwind가 더 적절하다고 생각함.
    <br><br>

- ChartJS

  - 공식 문서를 보면서 필요한 기능들을 적용하였음.
  - 커스터마이징 항목이 매우 많은 것은 장점이자 단점.
    <br><br>

- Context API

  - [src/context/AccentColorContext.tsx](https://github.com/KDT5-FE-M6-team3/toy3/blob/d0fd36c67b6cbb448276620a8cb0f01a1077365a/src/context/AccentColorContext.tsx#L1-L46)
  - [src/hooks/useAccentColor.ts](https://github.com/KDT5-FE-M6-team3/toy3/blob/d0fd36c67b6cbb448276620a8cb0f01a1077365a/src/hooks/useAccentColor.ts#L1C1-L14C3)
  - 외부 전역상태 라이브러리를 사용하지 않고 리액트 내장 기능을 사용.
  - 커스텀 hook을 사용할 필요까지는 없었으나 일반적인 경우에 hook을 만들어서 사용하므로 적용해 보았음.
    <br><br>

- SPA에서 Server state 와 Client state 동기화 문제

  - 소비내역을 등록, 수정, 삭제가 발생할 때마다 서버로부터 최신의 데이터를 받아와야 한다.
  - 본 프로젝트에서는 togglefetch 라는 변수를 useState로 선언하고 소비내역의 변경이 발생하는 handling 함수에서 `setToggleFetch((prev) => !prev)`를 해준다. 그리고 통신이 일어나는 useEffect의 dependency에 togglefetch를 넣어주었다.

    ```js
    const [togglefetch, setToggleFetch] = useState(false);

    useEffect(() => {
      const getData = async () => {
        setLoading(true);
        try {
          const response = await getExpenses(year, month);
          setMonthlyExpenses(response);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, [month, year, togglefetch]);
    ```

  - 이 방법은 페이지전환이 발생하지 않는 SPA에서 server state와 client state 동기화 문제를 가장 쉽게(~새로고침~) 해결할 수 있는 방법이다.
  - 다른 방법으로 get 요청 없이 client state를 setState로 업데이트 시켜주는 방법이 있다.
    - 본 프로젝트에서는 서버에서 생성되는 데이터가 \_id밖에 없으므로 이 전략이 가능함.
    - 예를 들어 새로운 소비내역을 post 요청으로 db에 저장하고, 동시에 `setState((prev) => [...prev, newData])`
    - 이러한 경우 post요청만 실행되고 get요청은 실행되지 않아도 되어 자원을 아낄 수 있다.
    - state가 변경되었으므로 화면은 재랜더링 된다.
  - 또 다른 방법으로 `react-query` 라이브러리를 사용하는 방법이 있다.
  <hr>

#### 이시우

  <img width="1470" alt="수정모달" src="https://github.com/KDT5-FE-M6-team3/toy3/assets/125563995/6f2fa634-00ea-4d84-9d42-864e8c886d5a">
  <img width="1470" alt="등록모달" src="https://github.com/KDT5-FE-M6-team3/toy3/assets/125563995/748a2991-6e03-41aa-93a2-6fadce25f11c">

- 형식 비슷한 기능의 모달(수정,등록)을 한가지 모달 폼 활용해 두가지 기능을 구현하는 부분에서 시행착오를 겪었지만, 코드의 효율을 높일수 있었습니다.
  <br><br>
- 이슈를 활용한 프로젝트 관리를 처음 접해보아서 초반에 커밋단위, PR단위를 어느정도로 해야할지 감을 잡기 힘들었지만, 이번 경험을 통해 추후 진행될 프로젝트에서 이슈,프로젝트를 활용 할 수 있을것 같습니다.
  <br><br>
- 주석 작성을 통해서 다시 한번 코드의 구조를 확실하게 이해할수 있었고, 이를 팀원들 간에 설명하는 시간을 통해 전체 프로젝트를 더 확실하게 이해할 수 있었습니다.
<hr>

#### 문현수

- React calendar 라이브러리 사용
  - 이번 프로젝트에서 react-calendar라는 라이브러리를 사용했는데, 어느 요소에 어떤 기능이 들어있는지 잘 파악이 되지 않아서 어려웠습니다. 특히 생각한 기능이 있었는데, 생각한대로 하기에는 react-calendar을 사용하기엔 어려움이 있었습니다.
  - 그렇다고 해서 만들어서 사용하는 것은 시간이 더 오래걸렸을 것 같다는 생각이 들었습니다.
  - 다음 번에는 주어진 상황과 기획한 대로 구현할 수 있는 방법을 선택하면 좋을 것 같습니다.
    <br><br>
- 프로젝트를 진행한 이후에 팀원들끼리 모여서 본인이 맡은 부분에 대해서 설명하는 시간을 가졌는데, 굉장히 유의미한 시간이었던 것 같습니다. 물론 프로젝트 규모가 크다면 이렇게 하는 것은 어렵겠지만, 이렇게 브리핑하면서 전반적인 프로젝트의 코드나 맡지 않은 파트에 대해서도 이해할 수 있어서 좋았던 것 같습니다.
  <br><br>
- 프로젝트를 진행할 때, 타입스크립트에 대한 이해가 좀 낮아서 타입을 일단 any로 설정해놓고 진행한 적이 있는데, 타입스크립트에 대한 공부가 좀 더 필요하다고 생각했습니다.
<hr>

#### 문대현

- 검색 기능을 구현하면서 서버에 등록되어 있는 데이터를 불러오는 데 있어 어려움이 있었습니다. 검색 결과를 모달 화면에 표시하고 표시된 데이터를 클릭 시 클릭한 날짜에 해당하는 모든 데이터를 불러오는 과정에 어려움이 있었고 그 외에도 코드를 구현하는 데 있어 어려움이 있을 때마다 팀장님께서 도움을 주셔서 문제 해결을 하는데 많은 도움이 되었습니다. 이번 프로젝트를 진행하며 쌓은 경험이 추후 프로젝트를 진행할 때 많은 도움이 될 것 같습니다.
  <br><br>
- 이번에 antd 라이브러리를 처음 사용해 보며 antd라는 유용한 라이브러리 경험을 하게 되어 추후 진행될 프로젝트에 유용하게 사용할 수 있을 것 같습니다.
  <br><br>
- 프로젝트 마무리 정리를 하며 팀원들 간에 본인이 맡은 파트에 대해 설명하는 유익한 시간을 가졌습니다. 다른 팀원의 파트는 주석 처리로 설명을 잘 해 놓았다 하더라도 텍스트 만으로는 이해하기 어려운 부분이 있지만 이번 발표로 각자 맡은 파트를 설명하는 시간을 가져 각자의 코드를 이해하는데 많은 도움이 된 것 같습니다.
