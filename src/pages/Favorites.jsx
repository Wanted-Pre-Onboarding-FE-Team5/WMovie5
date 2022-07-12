import React, { useState } from "react";
import MovieList from "../components/MovieList";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { favoriteMoviesReadOnly , movieState } from "../state/atoms";
//import { useMovieModel } from "../models/useMovieModel";

const Favorites = () => {
  const favoriteMovies = useRecoilValue(favoriteMoviesReadOnly );
  return (
    <FavoritesContainer>
      <MovieList movies={favoriteMovies}  />
    </FavoritesContainer>
  );
};

export default Favorites;

const FavoritesContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #191b22;
`;
