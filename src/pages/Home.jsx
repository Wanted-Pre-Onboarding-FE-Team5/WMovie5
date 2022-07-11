import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useMovieModel } from "../models/useMovieModel";
import { movieState } from "../state/atoms";

const Home = () => {
  const [movies, setMovies] = useRecoilState(movieState);
  const { toggleFavoriteById, getMovies } = useMovieModel();

  const onClickHandler = async (id, data) => {
    await toggleFavoriteById(id, data);
    await getMovies().then((response) => {
      setMovies(response);
    });
  };

  return (
    <MainContainer>
      <MovieList />
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

