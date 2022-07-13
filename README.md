![화면 기록 2022-07-13 오후 4 06 00](https://user-images.githubusercontent.com/87474789/178672441-cfd10242-bb5f-47b4-8d4c-bae4324e5e65.gif)


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

## 3. 기능 분업

| 팀원 이름  | 기능                                              |
| ----------------- | ------------------------------------------------------------------ |
| [최보성](https://github.com/qhtjd2131) | json-server로 즐겨찾기 토글 구현 <br> recoil로 database에서 mock data 불러오는 기능 구현 <br> 보일러 플레이트 생성, 상세페이지 모달  |
| [김슬기](https://github.com/sgsg9447) | 라우팅 연결 <br> Favorites페이지 레이아웃, 상세페이지 모달  <br>  MovieList, Movie 컴포넌트 레이아웃, database와 연결|
| [이유미](https://github.com/ymStudyLog) | SearchDropdown 컴포넌트 레이아웃 <br> 검색어 추천기능 fuzzy string matching 기능 직접 구현 |
| [김연진](https://github.com/yunjink) | GNB(검색창 포함) 컴포넌트 레이아웃 <br> Search페이지, SearchInput 컴포넌트 기능 구현 |


## 4. 기능 요구 사항 상세 설명

<영화 정보 사이트>

### 기본

- 해당 사이트는 총 두개의 탭을 가집니다. (`검색`, `즐겨찾기`)

### 검색

- 초기 화면은 검색 탭에서 시작합니다.
- 검색 탭은 상단에 `검색 입력 input` , `검색 button` 의 요소를 가집니다.
- 검색어 입력 후 검색을 클릭하면 => 검색 결과 노출
- 검색어 DB에 없는경우 => "검색 결과가 없습니다.” 노출
<br/>
    `<Movielist.js>`
    ```jsx
        const MovieList = (props) => {
      const { movies } = props;

      return (
        <MovieListContainer>
          {movies.length < 1 ? (
            <MovieResultNotFound>
              <NotFoundText>검색 결과가 없습니다.</NotFoundText>
            </MovieResultNotFound>
          ) : (
            <Movie movies={movies} />
          )}
        </MovieListContainer>
      );
    };
    ```
### 영화 선택

- 상세페이지 
  - 검색해서 출력된 영화 리스트 중 하나를 클릭시 모달
    ```jsx
    <MoviePoster
            onClick={() => {
              setMovieInModal(movie);
              openModal();
            }}
          >
    ```
  - 상세페이지는 각 영화의 간단한 설명등이 포함
    ```jsx
      <ModalContent>
          <Header>
            <Title>{movieInModal.title}</Title>
            <Year>{movieInModal.year}</Year>
            <Rating>{movieInModal.rating}</Rating>
            <RunTime>{movieInModal.runTime}</RunTime>
          </Header>
          <Summary>{movieInModal.summary}</Summary>
          <>
    ```
  - 해당 페이지에는 즐겨찾기 `button` 요소
  - 즐겨 찾기를 누르면 즐겨찾기가 다시 누르면 즐겨찾기 취소로 표현
    ```jsx
    const onClickHandler = async (id, data) => {
    closeModal();
    await toggleFavoriteById(id, data);
    await getMovies().then((response) => {
      setMovies(response);
    });
     };
    ```
>트러블 슈팅 : 포스터 중 일부 이미지 깨짐 현상 발생
- 문제 : API로 부터 받아온 이미지중, error코드 404로 패칭 실패
- 해결 : Img onError 속성으로 error 이미지 변경  

### 즐겨찾기

- 즐겨 찾기 탭을 클릭하면 즐겨찾기페이지로 이동
  
    `<APP.js>`

    ```jsx
    <Route path="/favorites" element={<Favorites />}/>
    ```

    `<GNB.jsx>`

    ```jsx
    <NavbarLink to='favorites'>Favorites<NavbarLink>
    ```

- 즐겨찾기 페이지에는 즐겨찾기 된 영화리스트가 보여짐 
    ```jsx
    const Favorites = () => {
      const favoriteMovies = useRecoilValue(favoriteMoviesReadOnly);
      return (
        <FavoritesContainer>
          <MovieList movies={favoriteMovies} />
        </FavoritesContainer>
      );
    };
    ```
- 즐겨찾기 기능 로직
    `<atoms.js>`
    ```jsx
    export const favoriteMoviesReadOnly = selector({
  key: "favoriteMoviesReadOnly ",
  get: ({ get }) => {
    const movies = get(movieState);
    const favoriteMovies = movies.filter((movie) => movie.like);
    return favoriteMovies;
     }, 
    });
    ```

>트러블 슈팅 : 이벤트캡쳐링 발생
- 문제 : 한개의 영화 포스터에 모달, 즐겨찾기 버튼 2개의 기능으로 즐겨찾기 onClick 이벤트시 모달이 열리는 문제 
- 해결 : 즐겨찾기 버튼을 모달보다 상위 계층의 컴포넌트로 이동하여 해결


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

