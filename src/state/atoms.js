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
