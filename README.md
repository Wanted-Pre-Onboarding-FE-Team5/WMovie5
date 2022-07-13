## 1. About this project

프로젝트 제목 : WMovie5 <br>

프로젝트 목표 : 기본으로 주어진 기업 과제 assignment 학습 목표 달성

```
<1-2. 영화 정보 사이트 만들기>
- data fetching module을 구현할 수 있다.
- 검색 기능을 구현할 수 있다.
- 즐겨찾기를 구현할 수 있다.

<2-1. 검색어 추천 컴포넌트 개발하기>
- 간단한 검색어 추천 로직을 만들 수 있다.
```

## 2. 디렉토리 구조

디렉토리 모양 - 슬기님이 갖다 쓴다고 하심

## 3. 기능 분업

| 팀원 이름 | 기능                                                                                                                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 최보성    | json-server로 즐겨찾기 토글 구현 <br> recoil로 database에서 mock data 불러오는 기능 구현 <br> 보일러 플레이트 생성, 상세페이지 모달 |
| 김슬기    | 라우팅 연결 <br> Favorites페이지 레이아웃, 상세페이지 모달 <br> MovieList, Movie 컴포넌트 레이아웃, database와 연결                 |
| 이유미    | SearchDropdown 컴포넌트 레이아웃 <br> 검색어 추천기능 fuzzy string matching 기능 직접 구현                                          |
| 김연진    | GNB(검색창 포함) 컴포넌트 레이아웃 <br> Search페이지, SearchInput 컴포넌트 기능 구현                                                |

## 4. 기능 요구 사항 상세 설명

<영화 정보 사이트>

### 기본

- 해당 사이트는 총 두개의 탭을 가집니다. (`검색`, `즐겨찾기`)

### 검색

- 초기 화면은 검색 탭에서 시작합니다.
- 검색 탭은 상단에 `검색 입력 input` , `검색 button` 의 요소를 가집니다.
- 처음 검색 결과 영역에 (검색되지 않은 초기상태) “검색 결과가 없습니다” 등의 표시를 노출해 주어야 합니다.
- 검색어를 입력한 후 검색을 클릭하면 아래로 검색 결과가 노출됩니다.
- 검색 결과가 없는 경우 "검색 결과가 없습니다.”(위와 동일한 컴포넌트)를 노출해야 합니다.
- 검색 결과의 가장 하단으로 내려온 경우 추가로 데이터를 요청하여 그려줍니다. (`infinity scorll`) (추가구현 사항)

### 영화 선택

- 검색해서 출력된 영화 리스트 중 하나를 클릭하면 나오는 상세 페이지 입니다.
- 상세페이지는 각 영화의 간단한 설명등이 포함됩니다.
- 해당 페이지에는 즐겨찾기 `button` 요소를 가집니다.
- 즐겨 찾기를 누르면 즐겨찾기가 다시 누르면 즐겨찾기 취소로 표현되어야 합니다. (icon or 문자열)

### 즐겨찾기

- 즐겨 찾기 탭을 클릭하면 즐겨찾기로 진입합니다.
- 즐겨찾기 페이지에는 즐겨찾기 된 영화리스트가 보여 집니다. (검색 했을 때와 동일)

### 검색어 추천 기능

**SearchDropdown 레이아웃**

- GNB의 SearchInput 컴포넌트 바로 밑에 위치 시킴(css position 속성 사용)

- Body부분의 영화들보다 위로 올라오게 스타일링함(css z-index 속성 사용)

**SearchDropdown 기능**

- useState를 사용하여 match 상태를 생성

- SearchInput(부모)에서 단어를 value props로 넘겨주면 value 값으로 자동 검색어를 찾음.

- fussy string matching 기능은 직접 만들어 보고 실패하면 [Fuse.js](https://fusejs.io/) 라이브러리를 적용하기로 함.

```
/* 같은 기능을 하는 2개의 컴포넌트를 만들어 둠 */

SearchDropdown.jsx //직접 fuzzy string matching 기능 구현
SearchDropdownFuse.jsx //Fuse.js 로 fuzzy string matching 기능 구현
```

- new Fuse()로 만든 새 인스턴스의 첫번째 인자로는 '비교할 db'와 두번째 인자로 '기본 매칭 옵션'을 전달한다.

```JSX
const fuseOptions = {
  findAllMatches: true,
  shouldSort: true,
};

```

- fuse 인스턴스의 search() 메서드로 value를 전달해서 매칭 결과를 찾는다.
- 매칭된 결과가 없으면 match state에 ["검색어 없음"] 값을 넣어준다.

- 매칭된 결과가 있으면 match state에 매칭결과 배열을 넣어서 map()으로 렌더링되게 함.

- 직접 fuzzy string matching 알고리즘을 구현하였으나 기한까지 다 만들지 못해서 정상 작동을 위해 라이브러리 사용. -> 개인 github repository에 올려두었으니 참고 요망. [확인하러 가기](https://github.com/ymStudyLog/fussy_string_matching)

**Recoil 상태 관리**

- database에서 받아온 영화 데이터를 여러 컴포넌트에서 접근할 수 있도록 전역 상태로 관리하기 위해 recoil 적용.

- 전역 상태는 atom으로 관리.
- 전역 상태내부에 전역적으로 사용될 함수 사용시 seletor로 관리.

**Loading 구현**

- 서버 loading : 서버 응답 오류일때 HttpRequest 클래스 내부에서 catch로 error처리 진행.
- 영화 데이터 loading : 영화 데이터 로딩에 시간이 걸릴 때 loading 컴포넌트 구현. (보성님 개인작업물)

**json-server 사용**

- 과제 흐름 상 database의 값을 수정하는 행위는 즐겨찾기 기능 구현시 필요함. 강사님의 코드를 빌려 http request를 수정하여 프로젝트에 적용.  
- patch : 즐겨찾기 기능, id값을 받아 like 값을 객체 형식으로 전달한다.
- get : 서버 오류시 에러 catch하여 빈 배열을 반환함. (서버 loading 구현)