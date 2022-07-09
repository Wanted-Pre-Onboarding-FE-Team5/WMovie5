import React, { useEffect } from "react";
import { useMovieModel } from "./models/useMovieModel";
import GNB from "./components/GNB";
import Footer from "./components/Footer";

function App() {
  const { movies, getMovies, patchMovieById } = useMovieModel();

  useEffect(() => {
    getMovies();
  }, []);

  const onClickImageCallback = (id, data) => {
    patchMovieById(id, data).then(getMovies);
  };

  console.log({ movies });
  return (
    <div className="App">
      <GNB />
      {movies?.map((movie, index) => (
        <span
          key={index}
          style={{ border: movie.like ? "10px solid blue" : "none" }}
          onClick={() => onClickImageCallback(movie.id, { like: !movie.like })}
        >
          <img src={movie.poster} alt="poster" />
        </span>
      ))}
      <Footer />
    </div>
  );
}
export default App;
