import React from "react";
import styled from "styled-components";
import MovieDetailModal from "./MovieDetailModal";
import { useRecoilState } from "recoil";
import { movieDetailModalOpenState, movieInModalState } from "../state/atoms";
import useModalModel from "../models/useModalModel";

const Movie = (props) => {
  const { movies } = props;
  const [movieInModal, setMovieInModal] = useRecoilState(movieInModalState);
  const {isOpenModal, openModal} = useModalModel(movieDetailModalOpenState);
 
  return (
    <MoviePosterContainer>
      {movies?.map((movie, index) => (
        <span key={index}>
          <MoviePoster
            onClick={() => {
              setMovieInModal(movie);
              openModal();
            }}
          >
            <img src={movie.medium_cover_image} alt="poster" />
          </MoviePoster>
        </span>
      ))}
      {isOpenModal && <MovieDetailModal movieInModal={movieInModal} />}
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
