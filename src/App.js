import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import GNB from "./components/GNB";

function App() {
  return (
    <GlobalWrapper>
      <BrowserRouter>
        <GNB />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </GlobalWrapper>
  );
}
export default App;

const GlobalWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #191b22;
`;
