import React, { useState } from 'react';
import styled from 'styled-components';
import MovieDetailModal from './MovieDetailModal';

const Movie = (props) => {
  const { movies } = props;
  // const onClickImageCallback = (id, data) => {
  //   patchMovieById(id, data).then(getMovies);
  // };

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal((open) => !open);
    console.log(isOpenModal);
  };

  return (
    <MoviePosterContainer>
      <MovieDetailModal movies={movies} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      {movies?.map((movie, index) => (
        <span
          key={index}
          // style={{ border: movie.like ? "10px solid blue" : "none" }}
          // onClick={() => onClickImageCallback(movie.id, { like: !movie.like })}
        >
          <p>{movie.title_english}</p>
          <MoviePoster onClick={toggleModal}>
            <img src={movie.medium_cover_image} alt='poster' />
          </MoviePoster>
        </span>
      ))}
    </MoviePosterContainer>
  );
};

export default Movie;

const MoviePosterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MoviePoster = styled.div`
  width: 200px;
  height: 300px;
  margin: 10px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
