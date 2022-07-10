import React from "react";
import styled from "styled-components";
import MovieList from "../components/MovieList";

const Home = () => {
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
