
import React from "react";
import MovieList from "../components/MovieList";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { movieState } from "../state/atoms";

const Home = () => {
  const movies = useRecoilValue(movieState);
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
