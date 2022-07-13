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

| 팀원 이름  | 기능                                              |
| ----------------- | ------------------------------------------------------------------ |
| 최보성 | json-server로 즐겨찾기 토글 구현 <br> recoil로 database에서 mock data 불러오는 기능 구현 <br> 보일러 플레이트 생성, 상세페이지 모달  |
| 김슬기 | 라우팅 연결 <br> Favorites페이지 레이아웃, 상세페이지 모달  <br>  MovieList, Movie 컴포넌트 레이아웃, database와 연결|
| 이유미 | SearchDropdown 컴포넌트 레이아웃 <br> 검색어 추천기능 fuzzy string matching 기능 직접 구현 |
| 김연진 | GNB(검색창 포함) 컴포넌트 레이아웃 <br> Search페이지, SearchInput 컴포넌트 기능 구현 |


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
- 검색 결과의 가장 하단으로 내려온 경우 추가로 데이터를 요청하여 그려줍니다.  (`infinity scorll`)  (추가구현 사항)

### 영화 선택

- 검색해서 출력된 영화 리스트 중 하나를 클릭하면 나오는 상세 페이지 입니다.
- 상세페이지는 각 영화의 간단한 설명등이 포함됩니다.
- 해당 페이지에는 즐겨찾기 `button` 요소를 가집니다.
- 즐겨 찾기를 누르면 즐겨찾기가 다시 누르면 즐겨찾기 취소로 표현되어야 합니다. (icon or 문자열)

### 즐겨찾기

- 즐겨 찾기 탭을 클릭하면 즐겨찾기로 진입합니다.
- 즐겨찾기 페이지에는 즐겨찾기 된 영화리스트가 보여 집니다. (검색 했을 때와 동일)

<검색어 추천 기능>
- Auto Complete 기능을 만듭니다. (검색어 추천)
- 검색어를 입력하면 입력된 문자열을 통해 데이터에서 추천 검색어를 출력 해줍니다.
- 검색어가 없을 시 “검색어 없음”으로 노출 됩니다.
- API 호출을 최대한 줄입니다. (debounce)
- 매 호출마다 console.log를 통해 얼마나 호출되었는지 파악할 수 있도록 해주세요.
- fuzzy string matching 지원
예 ) 입력 : 간  추천검색어: 간염, 간암, 간성, 간질병,  | 입력: 간염  추천검색어:간염증