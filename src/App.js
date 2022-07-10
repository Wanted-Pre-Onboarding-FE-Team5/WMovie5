import React, { useEffect } from "react";
import { useMovieModel } from "./models/useMovieModel";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import GNB from "./components/GNB";

function App() {
  const { movies } = useMovieModel();

  return (
    <GlobalWrapper>
      <BrowserRouter>
        <GNB />
        <Routes>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/search" element={<Search movies={movies} />} />
          <Route path="/favorites" element={<Favorites movies={movies} />} />
        </Routes>
      </BrowserRouter>
    </GlobalWrapper>
  );
}
export default App;

const GlobalWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;
