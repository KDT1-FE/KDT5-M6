# KDT5-M6
🤝 검색어 자동완성 사이트 및 소비패턴 기록 서비스 구현, 팀 프로젝트

Calendar & List 등 내가 소비한 금액 및 품목들을 기입하고, 월단위로 얼마를 썼는지, 어떤 항목에 비중을 두었는지 등을 기록하는

웹 서비스를 구현합니다.



웹/모바일웹 구현 모두 무방하며, 다양한 차트를 활용할 수 있습니다.


react를 필수로 사용해야 합니다.
과제 수행 및 리뷰 기간은 별도 공지를 참고하세요!



과제 수행 및 제출 방법

KDT기수번호_이름



E.g, KDT0_BaeJinHo

현재 저장소를 로컬에 클론(Clone)합니다.
자신의 본명으로 브랜치를 생성합니다.(구분 가능하도록 본명을 꼭 파스칼케이스로 표시하세요, git branch KDTX_BaeJinHo)
자신의 본명 브랜치에서 과제를 수행합니다.
과제 수행이 완료되면, 자신의 본명 브랜치를 원격 저장소에 푸시(Push)합니다.(main 브랜치에 푸시하지 않도록 꼭 주의하세요, git push origin KDTX_BaeJinHo)
저장소에서 main 브랜치를 대상으로 Pull Request 생성하면, 과제 제출이 완료됩니다!(E.g, main <== KDTX_BaeJinHo)
main 혹은 다른 사람의 브랜치로 절대 병합하지 않도록 주의하세요!
Pull Request에서 보이는 설명을 다른 사람들이 이해하기 쉽도록 꼼꼼하게 작성하세요!
Pull Request에서 과제 제출 후 절대 병합(Merge)하지 않도록 주의하세요!
과제 수행 및 제출 과정에서 문제가 발생한 경우, 바로 담당 멘토나 강사에서 얘기하세요!


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
GET /categories
```
Response: 

Status: 200 OK
```javascript
["food", "clothing", "electronics"]
```

3. 검색어에 해당하는 소비 항목 및 금액 조회 API
   
Request:
```javascript
GET /expenses/search?q=food
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
GET /expenses/summary?period=daily
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
DELETE /expenses/123
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
GET /expenses/calendar?year=2023&month=7
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


