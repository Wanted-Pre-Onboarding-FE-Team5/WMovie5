import React from "react";
import styled from "styled-components";
import Movie from "./Movie";

const MovieList = (props) => {
  const { movies } = props;
  console.log("movies.length", movies.length);

  return (
    <MovieListContainer>
      {movies.length < 1 ? (
        <MovieResultNotFound>
          <NotFoundText>검색결과가없습니다.</NotFoundText>
        </MovieResultNotFound>
      ) : (
        <Movie movies={movies} />
      )}
    </MovieListContainer>
  );
};

export default MovieList;

const MovieListContainer = styled.div`
  width: 95%;
  min-height: 100vh;
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieResultNotFound = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  text-align: center;
  justify-content: center;
`;

const NotFoundText = styled.h1`
  font-size: 24px;
  color: white;
  font-weight: bold;
  padding-top: 200px;
`;
