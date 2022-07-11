import React from 'react';
import styled from 'styled-components';
import SearchResult from '../components/SearchResult';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { useRecoilState } from "recoil";
import { movieState } from "../state/atoms";
//import { useMovieModel } from "../models/useMovieModel";

const Search = () => {
  //recoil로 데이터를 받아오는 useRecoilState() 필요시 남기고 가공하기
  //recoil - useRecoilValue()메서드를 사용하면 state만 받아올 수 있음! const movies = useRecoilvalue(movieState)
  const [movies, setMovies] = useRecoilState(movieState);

  /* onclick 이벤트시 like 바뀌는 patch http request 요청하는 함수 필요시 사용, 필요없으면 삭제 가능
  const { toggleFavoriteById, getMovies } = useMovieModel();
  
  const onClickHandler = async (id, data) => {
    await toggleFavoriteById(id, data);
    await getMovies().then((response) => {
      setMovies(response);
    });
  };
 */

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
      <SearchResult value={searchText} />
    </SearchResultContainer>
  );
};

export default Search;



const SearchResultContainer = styled.div``;
