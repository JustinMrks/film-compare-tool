import React, { useState } from 'react';
import MovieCard from './MovieCard';

const Actor = ({ actState, setActState, fetchMovies, common, setCommon }) => {
  let [actor, setActor] = useState('');
  let [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setActor(e.target.value);
    setCommon();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(setActState, actor, setLoading);
  };

  return (
    <div className="actor-container">
      <form>
        <input type="text" value={actor} onChange={handleChange} />
        <button onClick={handleSubmit}>Search</button>
      </form>
      {!loading ? (
        actState && !common ? (
          actState.movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))
        ) : (
          <> </>
        )
      ) : (
        <p className="loading-msg"> Loading... </p>
      )}
    </div>
  );
};

export default Actor;
