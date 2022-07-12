import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MovieList from '../components/MovieList';
import qs from 'qs';

const Search = ({ movies }) => {
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  console.log('useLocation', location);

  useEffect(() => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
      // 문자열 맨 앞의 ?를 생력
    });
    setSearchText(query.q);
  }, [location]);
  console.log(searchText);


  return (

    <SearchResultContainer>
      <MovieList value={searchText} />
    </SearchResultContainer>
  );
};

export default Search;



const SearchResultContainer = styled.div``;
