import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieList from "../components/MovieList";
import { useRecoilValue } from "recoil";
import { movieState } from "../state/atoms";
import styled from "styled-components";
import getQueryString from "../utils/getQueryString";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const movies = useRecoilValue(movieState);
  const [searchText, setSearchText] = useState(() => {
    return getQueryString(location.search);
  });

  useEffect(() => {
    if (location.search.length === 0) navigate("/");
    setSearchText(getQueryString(location.search));
  }, [location]);

  const filterTitle = movies.filter((text) => {
    return text.title_english
      .toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase());
  });
  return (
    <SearchContainer>
      <MovieList movies={filterTitle} />
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #191b22;
`;
