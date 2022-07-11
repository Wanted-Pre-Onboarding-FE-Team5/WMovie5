import React from "react";
import styled from "styled-components";
import Movie from "./Movie";

const MovieList = () => {
  return (
    <MovieListContainer>
      <Movie />
    </MovieListContainer>
  );
};

export default MovieList;

const MovieListContainer = styled.div`
  border: 1px solid #fff;
  width: 95%;
  min-height: 100vh;
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
