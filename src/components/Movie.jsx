import React, { useEffect } from "react";
import styled from "styled-components";
import { useMovieModel } from "../models/useMovieModel";

const Movie = () => {
  const { movies, getMovies, patchMovieById } = useMovieModel();

  useEffect(() => {
    getMovies();
  }, []);

  // const onClickImageCallback = (id, data) => {
  //   patchMovieById(id, data).then(getMovies);
  // };

  return (
    <MoviePosterContainer>
      {movies?.map((movie, index) => (
        <span
          key={index}
          // style={{ border: movie.like ? "10px solid blue" : "none" }}
          // onClick={() => onClickImageCallback(movie.id, { like: !movie.like })}
        >
          <MoviePoster>
            <img src={movie.medium_cover_image} alt="poster" />
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
