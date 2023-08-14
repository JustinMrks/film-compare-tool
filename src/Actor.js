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
    setActState();
    e.preventDefault();
    fetchMovies(setActState, actor, setLoading);
    setCommon();
  };

  return (
    <div className="actor-container">
      <div className="name-form">
        <form>
          <input type="text" value={actor} onChange={handleChange} />
          <button onClick={handleSubmit}>Search</button>
        </form>
      </div>
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
