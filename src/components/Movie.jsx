import React, { useRef, useState } from "react";
import styled from "styled-components";
import MovieDetailModal from "./MovieDetailModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { movieDetailModalOpenState, movieState } from "../state/atoms";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useMovieModel } from "../models/useMovieModel";
const Movie = (props) => {
  const { movies } = props;
  const [movieInModal, setMovieInModal] = useState([]);

  const [isOpenModal, setIsOpenModal] = useRecoilState(
    movieDetailModalOpenState
  );
  const openModal = () => {
    setIsOpenModal(true);
  };

  const setMovies = useSetRecoilState(movieState);

  const { toggleFavoriteById, getMovies } = useMovieModel();

  // const containerRef = useRef();

  const onClickHandler = async (id, data) => {
    setIsOpenModal(false);
    await toggleFavoriteById(id, data);
    await getMovies().then((response) => {
      setMovies(response);
    });
  };
  const onErrorImg = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZXJyb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60";
  };
  return (
    <MoviePosterContainer>
      {isOpenModal && <MovieDetailModal movieInModal={movieInModal} />}
      {movies?.map((movie, index) => (
        <MoviePosterCard key={index}>
          {!isOpenModal && (
            <button
              // ref={containerRef}
              onClick={() => {
                onClickHandler(movie.id, { like: !movie.like });
              }}
            >
              {movie.like ? (
                <MdFavorite style={{ color: "red" }} />
              ) : (
                <MdFavoriteBorder />
              )}
            </button>
          )}
          <MoviePoster
            onClick={() => {
              setMovieInModal(movie);
              openModal();
            }}
          >
            <img
              src={movie.medium_cover_image}
              onError={onErrorImg}
              alt="poster"
            />
            <p> {movie.title}</p>
          </MoviePoster>
        </MoviePosterCard>
      ))}
    </MoviePosterContainer>
  );
};

export default Movie;

const MoviePosterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  button {
    position: absolute;
    z-index: 10;
    background-color: transparent;
    font-size: 30px;
    border: none;
    color: white;
    top: 5%;
    left: 75%;
  }
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
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
    font-weight: bold;
    opacity: 0;
    text-align: center;
    margin: 0 auto;
  }

  :hover {
    transform: scale(1.1);
    img {
      opacity: 0.3;
    }
    p,
    button {
      opacity: 1;
    }
  }
`;

const MoviePosterCard = styled.span`
  position: relative;
`;
