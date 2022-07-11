import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useMovieModel } from "../models/useMovieModel";
import { movieState } from "../state/atoms";

const Home = () => {
  const [movies, setMovies] = useRecoilState(movieState);
  const { toggleFavoriteById, getMovies } = useMovieModel();

  const onClickHandler = async (id, data) => {
    await toggleFavoriteById(id, data);
    await getMovies().then((response) => {
      setMovies(response);
    });
  };

  return (
    <div>
      {/* <div>
        {movies?.map((d, index) => (
          <div
            key={index}
            onClick={() => {
              onClickHandler(d.id, { like: !d.like });
            }}
            style={d.like ? { border: "3px solid blue" } : {}}
          >
            {d.medium_cover_image}
          </div>
        ))}
      
      </div> */}
    </div>
  );
};

export default Home;
