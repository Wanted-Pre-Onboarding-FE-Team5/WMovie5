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




<검색어 추천 기능>
### 검색어 추천
- Auto Complete 기능을 만듭니다. (검색어 추천)
- 검색어를 입력하면 입력된 문자열을 통해 데이터에서 추천 검색어를 출력 해줍니다.
- 검색어가 없을 시 “검색어 없음”으로 노출 됩니다.
- API 호출을 최대한 줄입니다. (debounce)
- 매 호출마다 console.log를 통해 얼마나 호출되었는지 파악할 수 있도록 해주세요.
- fuzzy string matching 지원
예 ) 입력 : 간  추천검색어: 간염, 간암, 간성, 간질병,  | 입력: 간염  추천검색어:간염증