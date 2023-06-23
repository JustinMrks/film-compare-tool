import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img className="poster" src={movie.img} alt="poster for the movie" />
      <h1> {movie.title} </h1>
    </div>
  );
};

export default MovieCard;
