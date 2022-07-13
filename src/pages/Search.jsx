import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import MovieList from "../components/MovieList";
import { useRecoilState } from "recoil";
import { movieState } from "../state/atoms";
import styled from "styled-components";

const Search = () => {

  const [movies, setMovies] = useRecoilState(movieState);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (location.search.length === 0) {
      navigate("/");
    }
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    setSearchText(query.q);
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

const SearchContainer = styled.div``;
