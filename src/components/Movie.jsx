import React, {useRef} from "react";
import styled from "styled-components";
import MovieDetailModal from "./MovieDetailModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { movieDetailModalOpenState, movieInModalState,movieState } from "../state/atoms";
import useModalModel from "../models/useModalModel";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useMovieModel } from "../models/useMovieModel";
const Movie = (props) => {
  const { movies } = props;
  const [movieInModal, setMovieInModal] = useRecoilState(movieInModalState);
  const {isOpenModal, openModal, closeModal} = useModalModel(movieDetailModalOpenState);
  const containerRef = useRef();
  const setMovies = useSetRecoilState(movieState);
  const { toggleFavoriteById, getMovies } = useMovieModel();
  const onClickHandler = async (id, data) => {
    closeModal();
    await toggleFavoriteById(id, data);
    await getMovies().then((response) => {
      setMovies(response);
    });
  };
  return (
    <MoviePosterContainer>
      {movies?.map((movie, index) => (
        <MoviePosterCard key={index}>
          {!isOpenModal && (
            <button
              ref={containerRef}
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
            <img src={movie.medium_cover_image} alt="poster" />
            <p> {movie.title}</p>
          </MoviePoster>
        </MoviePosterCard>
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
  button {
    position: absolute;
    z-index: 10;
    background-color: transparent;
    font-size: 30px;
    border: none;
    color: white;
    top: 5%;
    left: 75%;

    /* opacity: 0; */
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

//TODO : 모달 열렸을 시 호버 이미지가 왜 보이지 ?
//TODO : 에러 사진 해결
//TODO : 즐겨찾기 기능 연결
//TODO : 즐겨찾기 눌렀을 때 모달 안뜨게하기
