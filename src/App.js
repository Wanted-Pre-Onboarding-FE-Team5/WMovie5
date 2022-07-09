import React, { useEffect } from "react";
import { useMovieModel } from "./models/useMovieModel";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import GNB from "./components/GNB";
import Footer from "./components/Footer"

function App() {
  const { movies, getMovies, patchMovieById } = useMovieModel();

  useEffect(() => {
    getMovies();
  }, []);

  // const onClickImageCallback = (id, data) => {
  //   patchMovieById(id, data).then(getMovies);
  // };

  return (
    <GlobalWrapper>
      <BrowserRouter>
        <GNB />
        <Routes>
          <Route path="/" element={<Home props={movies} />} />
          <Route path="/search" element={<Search props={movies} />} />
          <Route path="/favorites" element={<Favorites props={movies} />} />
        </Routes>

        {/* 아랫 부분은 멘토님 코드입니다(영화 리스트 랜더링 코드). */}
        {/* {movies?.map((movie, index) => (
          <span
            key={index}
            style={{ border: movie.like ? "10px solid blue" : "none" }}
            onClick={() =>
              onClickImageCallback(movie.id, { like: !movie.like })
            }
          >
            <img src={movie.poster} alt="poster" />
          </span>
        ))} */}
        <Footer />
      </BrowserRouter>
    </GlobalWrapper>
  );
}
export default App;

const GlobalWrapper = styled.div`
  width: 100%;
  min-height: 100%;
`;
