import React from 'react';
import MovieList from '../components/MovieList';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { movieState } from '../state/atoms';
//import { useMovieModel } from "../models/useMovieModel";

const Home = () => {
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
    <MainContainer>
      <MovieList movies={movies} />
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #191b22;
`;
