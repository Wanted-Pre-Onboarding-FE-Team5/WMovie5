![화면 기록 2022-07-13 오후 4 06 00](https://user-images.githubusercontent.com/87474789/178672441-cfd10242-bb5f-47b4-8d4c-bae4324e5e65.gif)

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

```
📦src
 ┣ 📂components
 ┃ ┣ 📜Footer.jsx
 ┃ ┣ 📜GNB.jsx
 ┃ ┣ 📜Loading.jsx
 ┃ ┣ 📜Movie.jsx
 ┃ ┣ 📜MovieDetailModal.jsx
 ┃ ┣ 📜MovieList.jsx
 ┃ ┣ 📜SearchDropdown.jsx
 ┃ ┗ 📜SearchInput.jsx
 ┣ 📂database
 ┃ ┗ 📜database.json
 ┣ 📂http
 ┃ ┗ 📜httpRequest.js
 ┣ 📂models
 ┃ ┣ 📜useModalModel.js
 ┃ ┗ 📜useMovieModel.js
 ┣ 📂pages
 ┃ ┣ 📜Favorites.jsx
 ┃ ┣ 📜Home.jsx
 ┃ ┗ 📜Search.jsx
 ┣ 📂services
 ┃ ┗ 📜movieService.js
 ┣ 📂state
 ┃ ┗ 📜atoms.js
 ┣ 📂styles
 ┃ ┗ 📜globalStyle.js
 ┣ 📂utils
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useOnClickOutside.js
 ┃ ┃ ┣ 📜useOnKeyDown.js
 ┃ ┃ ┗ 📜useOnLoadImage.js
 ┃ ┣ 📜debounce.js
 ┃ ┗ 📜getQueryString.js
 ┣ 📜App.js
 ┣ 📜index.js
 ┗ 📜reset.css
```

## 기능 분업

| 팀원 이름                               | 기능                                                                                                     |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [최보성](https://github.com/qhtjd2131)  | - Boiler Plate 생성 <br> - Recoil 상태관리 (데이터베이스, 즐겨찾기, 모달) <br> - Loading Image           |
| [김슬기](https://github.com/sgsg9447)   | - 각 페이지 라우팅 <br> - 데이터베이스 연결 <br> - Layout : MovieList, Movie, MoviDetailModal, Favorites |
| [이유미](https://github.com/ymStudyLog) | - 검색어 추천기능 fuzzy string matching 기능 구현 <br> - Layout : SearchDropdown 컴포넌트 <br>           |
| [김연진](https://github.com/yunjink)    | - Search 기능 구현 (debounce)<br> - Layout : Global Navigation Bar(GNB), Search, SearchInput             |

## 기능 요구 사항 상세 설명

<br>

**Global Navigation Bar**

- Home, Favorites 페이지 링크와 검색창으로 구성 <br>
- 검색창은 SearchInput 컴포넌트로 분리

<br>

**SearchInput** 

- debounce 함수 구현
- 사용자의 검색어(inputValue)와 <br>
  debounce 함수를 적용한 검색어(debouncedValue)를
  분리하여 상태관리
- 검색어 입력 후 엔터로 전송하면 `/search` 로 이동

<br>

**Search Page**

- 제목으로 데이터베이스 필터하여 검색

<br>

**MovieList**

- MovieDatailModal
  - 검색해서 출력된 영화 리스트 중 하나를 클릭시 모달
  - 상세페이지는 각 영화의 간단한 설명등이 포함
  - 해당 페이지에는 즐겨찾기 `button` 요소
  - 즐겨 찾기를 누르면 즐겨찾기가 다시 누르면 즐겨찾기 취소로 표현

> 트러블 슈팅 : 포스터 중 일부 이미지 깨짐 현상 발생

- 문제 : API로 부터 받아온 이미지중, error코드 404로 패칭 실패
- 해결 : Img onError 속성으로 error 이미지 변경  
 
  <br>

**Favorites**

- 즐겨 찾기 탭을 클릭하면 즐겨찾기페이지로 이동
- 즐겨찾기 페이지에는 즐겨찾기 된 영화리스트가 보여짐
- 즐겨찾기 기능 로직
> 트러블 슈팅 : 이벤트캡쳐링 발생

- 문제 : 한개의 영화 포스터에 모달, 즐겨찾기 버튼 2개의 기능으로 즐겨찾기 onClick 이벤트시 모달이 열리는 문제
- 해결 : 즐겨찾기 버튼을 모달보다 상위 계층의 컴포넌트로 이동하여 해결

  <br>

**SearchDropdown 레이아웃**

- GNB의 SearchInput 컴포넌트 바로 밑에 위치 시킴(css position 속성 사용)

- Body부분의 영화들보다 위로 올라오게 스타일링함(css z-index 속성 사용)

<br>

**SearchDropdown 기능**

- useState를 사용하여 match 상태를 생성

- SearchInput(부모)에서 단어를 value props로 넘겨주면 value 값으로 자동 검색어를 찾음

- fussy string matching 기능은 직접 만들어 보고 실패하면 [Fuse.js](https://fusejs.io/) 라이브러리를 적용하기로 함

```
/* 같은 기능을 하는 2개의 컴포넌트를 만들어 둠 */

SearchDropdown.jsx //직접 fuzzy string matching 기능 구현
SearchDropdownFuse.jsx //Fuse.js 로 fuzzy string matching 기능 구현
```

- new Fuse()로 만든 새 인스턴스의 첫번째 인자로는 '비교할 db'와 두번째 인자로 '기본 매칭 옵션'을 전달한다
- fuse 인스턴스의 search() 메서드로 value를 전달해서 매칭 결과를 찾는다
- 매칭된 결과가 없으면 match state에 ["검색어 없음"] 값을 넣어준다

- 매칭된 결과가 있으면 match state에 매칭결과 배열을 넣어서 map()으로 렌더링되게 함

- 직접 fuzzy string matching 알고리즘을 구현하였으나 기한까지 다 만들지 못해서 정상 작동을 위해 라이브러리 사용 -> 개인 github repository에 올려두었으니 참고 요망. [확인하러 가기](https://github.com/ymStudyLog/fussy_string_matching)

<br>

**Recoil**

- database에서 받아온 영화 데이터를 여러 컴포넌트에서 접근할 수 있도록 전역 상태로 관리하기 위해 recoil 적용

- 전역 상태는 atom으로 관리
- 전역 상태내부에 전역적으로 사용될 함수 사용시 seletor로 관리

<br>

**Loading**

- 서버 loading : 서버 응답 오류일때 HttpRequest 클래스 내부에서 catch로 error처리 진행
- 영화 데이터 loading : 영화 데이터 로딩에 시간이 걸릴 때 loading 컴포넌트 구현(보성님 개인작업물)

<br>

**json-server**

- patch : 즐겨찾기 기능, id값을 받아 like 값을 객체 형식으로 전달
- get : 서버 오류시 에러 catch하여 빈 배열을 반환 (서버 loading 구현)
