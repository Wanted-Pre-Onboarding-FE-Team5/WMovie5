import { movieRequest } from "../services/movieService";
export const useMovieModel = () => {
  const getMovies = async () => {
    return (await movieRequest.get()).data;
  };
  const toggleFavoriteById = async (id, data) => {
    return await movieRequest.patch(id, data);
  };

  return {
    toggleFavoriteById,
    getMovies,
  };
};
