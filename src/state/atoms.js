import { atom, selector } from "recoil";
import { movieRequest } from "../services/movieService";

// atom => state
// selector => selector

const movieSelector = selector({
  key: "movieSelector",
  get: async () => {
    const response = await movieRequest.get();
    return response.data;
  },
});

export const movieState = atom({
  key: "movieData",
  default: movieSelector,
});

export const movieSearchResultState = atom({
  key: "movieSearchResultState",
  default: [],
});

export const movieDetailModalOpenState = atom({
  key: "movieDetailModalOpenState",
  default: false,
});

export const favoriteMoviesReadOnly = selector({
  key: "favoriteMoviesReadOnly ",
  get: ({ get }) => {
    const movies = get(movieState);
    const favoriteMovies = movies.filter((movie) => movie.like);
    return favoriteMovies;
  },
});

export const movieInModalState = atom({
  key: "movieInModalState",
  default: undefined,
});
