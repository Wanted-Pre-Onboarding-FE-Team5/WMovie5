import React, { useCallback, useRef, useState } from "react";
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
  // const onClickImageCallback = (id, data) => {
  //   patchMovieById(id, data).then(getMovies);
  // };

  const [isOpenModal, setIsOpenModal] = useRecoilState(
    movieDetailModalOpenState
  );
  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const setMovies = useSetRecoilState(movieState);

  const { toggleFavoriteById, getMovies } = useMovieModel();

  const containerRef = useRef();

  //포스터 클릭 → ref? 즐겨찾기기능 → ref아니면 모달열기
  // const onClickHandler = async (e, id, data) => {
  //   console.log("e", e.target);
  //   console.log("ref", containerRef.current);
  //   console.log(e.target == containerRef.current);
  //   if (e.target === containerRef.current) {
  //     setIsOpenModal(false);
  //     await toggleFavoriteById(id, data);
  //     await getMovies().then((response) => {
  //       setMovies(response);
  //     });
  //   } else {
  //     setIsOpenModal(true);
  //   }
  // };

  const onClickHandler = async (id, data) => {
    setIsOpenModal(false);
    await toggleFavoriteById(id, data);
    await getMovies().then((response) => {
      setMovies(response);
    });
  };

  return (
    <MoviePosterContainer>
      {isOpenModal && <MovieDetailModal movieInModal={movieInModal} />}
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
