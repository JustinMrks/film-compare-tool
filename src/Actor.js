import React, { useState } from 'react';
import MovieCard from './MovieCard';

const Actor = ({ actState, setActState, fetchMovies }) => {
  let [actor, setActor] = useState('');

  const handleChange = (e) => {
    setActor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(setActState, actor);
  };

  return (
    <div className="actor-container">
      <form>
        <input type="text" value={actor} onChange={handleChange} />
        <button onClick={handleSubmit}>Search</button>
      </form>
      {actState ? (
        actState.movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))
      ) : (
        <p> No actor found </p>
      )}
    </div>
  );
};

export default Actor;
