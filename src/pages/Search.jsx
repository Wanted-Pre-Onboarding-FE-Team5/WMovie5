import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import MovieList from '../components/MovieList';
import { useRecoilState } from 'recoil';
import { movieState } from '../state/atoms';
import styled from 'styled-components';
//import { useMovieModel } from "../models/useMovieModel";

const Search = () => {
  //recoil로 데이터를 받아오는 useRecoilState() 필요시 남기고 가공하기
  //recoil - useRecoilValue()메서드를 사용하면 state만 받아올 수 있음! const movies = useRecoilvalue(movieState)

  /* onclick 이벤트시 like 바뀌는 patch http request 요청하는 함수 필요시 사용, 필요없으면 삭제 가능
  const { toggleFavoriteById, getMovies } = useMovieModel();
  
  const onClickHandler = async (id, data) => {
    await toggleFavoriteById(id, data);
    await getMovies().then((response) => {
      setMovies(response);
    });
  };
 */

  const [movies, setMovies] = useRecoilState(movieState);
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  console.log('useLocation:', location);

  useEffect(() => {
    if (location.search.length === 0) {
      navigate('/');
    }
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
      // 문자열 맨 앞의 ?를 생략
    });
    console.log('query:', query);
    setSearchText(query.q);
  }, [location]);

  const filterTitle = movies.filter((text) => {
    return text.title_english.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
  });

  return (
    <SearchContainer>
      <MovieList movies={filterTitle} />
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div``;
