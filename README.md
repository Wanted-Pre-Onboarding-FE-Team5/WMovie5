## WMovie5

> **Wanted Pre Onboarding Frontend 5th - 5팀** <br>
> Week 1-2. 영화 정보 사이트 <br>
> Week 2-1. 검색어 추천

```
[ 영화 정보 사이트 ]
- data fetching module을 구현할 수 있다.
- 검색 기능을 구현할 수 있다.
- 즐겨찾기를 구현할 수 있다.

[ 검색어 추천 ]
- 간단한 검색어 추천 로직을 만들 수 있다.
```

## 디렉토리 구조

디렉토리 모양 - 슬기님이 갖다 쓴다고 하심

## 기능 분업

| 팀원 이름 | 기능                                                                                                     |
| --------- | -------------------------------------------------------------------------------------------------------- |
| 최보성    | - Boiler Plate 생성 <br> - Recoil 상태관리 (데이터베이스, 즐겨찾기, 모달) <br> - Loading Image           |
| 김슬기    | - 각 페이지 라우팅 <br> - 데이터베이스 연결 <br> - Layout : MovieList, Movie, MoviDetailModal, Favorites |
| 이유미    | - 검색어 추천기능 fuzzy string matching 기능 구현 <br> - Layout : SearchDropdown 컴포넌트 <br>           |
| 김연진    | - Search 기능 구현 (debounce)<br> - Layout : Global Navigation Bar(GNB), Search, SearchInput             |

## 기능 요구 사항 상세 설명

<br>

**Global Navigation Bar**

- Home, Favorites 페이지 링크와 검색창으로 구성 <br>
- 검색창은 SearchInput 컴포넌트로 분리

<br>

**SearchInput** <br>

- debounce 함수 구현
- 사용자의 검색어(inputValue)와 <br>
  debounce 함수를 적용한 검색어(debouncedValue)를
  분리하여 상태관리
- 검색어 입력 후 엔터로 전송하면 `/search` 로 이동

<br>

**Search Page**

- 제목으로 데이터베이스 필터하여 검색
