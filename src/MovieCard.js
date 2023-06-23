import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      {movie.img !== null ? (
        <img
          className="poster"
          src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.img}
          alt="poster for the movie"
        />
      ) : (
        <div className="poster">{movie.title}</div>
      )}

      <h1> {movie.title} </h1>
    </div>
  );
};

export default MovieCard;
