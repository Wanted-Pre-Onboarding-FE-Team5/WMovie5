import React from "react";
import MovieList from "../components/MovieList";
import { useRecoilState } from "recoil";
import { movieState } from "../state/atoms";
//import { useMovieModel } from "../models/useMovieModel";

const Favorites = () => {
  //recoil로 데이터를 받아오는 useRecoilState() 필요시 남기고 가공하기
  //recoil - useRecoilValue()메서드를 사용하면 state만 받아올 수 있음! const movies = useRecoilvalue(movieState)
  const [movies, setMovies] = useRecoilState(movieState);

  /* onclick 이벤트시 like 바뀌는 patch http request 요청하는 함수 필요시 사용, 필요없으면 삭제 가능
  const { toggleFavoriteById, getMovies } = useMovieModel();
  
  const onClickHandler = async (id, data) => {
    await toggleFavoriteById(id, data);
    await getMovies().then((response) => {
      setMovies(response);
    });
  };
 */
  return (
    <div>
      <MovieList />
    </div>
  );
};

export default Favorites;
