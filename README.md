## 파일 구조

```
src/
├── apis/                     # API 요청 관련 함수
├── assets/                   # 이미지, 폰트 등 정적 파일
├── components/
│   └── PostForm.jsx          # 포스트 컴포넌트
├── layouts/
│   └── MainLayout/           # 공통 레이아웃 (사이드바, 네비게이션 등)
│       ├── index.css
│       └── index.jsx
├── pages/
│   ├── EditPost/
│   │   └── index.jsx         # 게시글 수정 페이지
│   │
│   ├── Home/
│   │   └── index.jsx         # 홈 페이지
│   │
│   ├── PostDetail/
│   │   └── index.jsx         # 게시글 상세 페이지 (ID 별 조회)
│   │
│   └── postList/
│       └── index.jsx         # 게시글 리스트 페이지
│
├── routes/
│   └── router.jsx            # React Router 설정 파일
│
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

<br>

## 커밋 메시지 규칙

| 타입 이름 | 내용                                                  |
| --------- | ----------------------------------------------------- |
| feat      | 새로운 기능에 대한 커밋                               |
| fix       | 버그 수정에 대한 커밋                                 |
| build     | 빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋 |
| chore     | 그 외 자잘한 수정에 대한 커밋                         |
| ci        | ci 관련 설정 수정에 대한 커밋                         |
| docs      | 문서 수정에 대한 커밋                                 |
| style     | 코드 스타일 혹은 포맷 등에 관한 커밋                  |
| refactor  | 코드 리팩토링에 대한 커밋                             |
| test      | 테스트 코드 수정에 대한 커밋                          |
| perf      | 성능 개선에 대한 커밋                                 |
