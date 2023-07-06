# KDT5-M6 가계부 토이 팀프로젝트

🤝 검색어 자동완성 사이트 및 소비패턴 기록 서비스 구현, 팀 프로젝트

Calendar & List 등 내가 소비한 금액 및 품목들을 기입하고, 월단위로 얼마를 썼는지, 어떤 항목에 비중을 두었는지 등을 기록하는
웹 서비스를 구현합니다.

웹/모바일웹 구현 모두 무방하며, 다양한 차트를 활용할 수 있습니다.

## 필수 구현

- [ ] 지출 내역 입력 폼 (지출 금액, 지출항목, 지출 날짜)
- [ ] 지출 내역 목록(일반 리스트형, 칼렌더 형 표기 가능)
- [ ] 지출 내역 수정 및 삭제

## 선택 구현

- [ ] 지출 내역 칼렌더로 표기
- [ ] 지출 내역 월별 내역, 주별 내역, 일별 내역 표기
- [ ] 차트를 이용해서 소비 내역 표기 하기
- [ ] 모바일 형태로 구현할지, 웹 형태로 구현할지는 자유

URL 예제 : http://52.78.195.183:3003/api/expenses
API

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

react router dom

[react icons](https://react-icons.github.io/react-icons)

ant design
