import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

import Actor from './Actor';
import MovieCard from './MovieCard';

function App() {
  const [act1, setAct1] = useState();
  const [act2, setAct2] = useState();
  const [errMsg, setErrMsg] = useState('');
  const [common, setCommon] = useState();

  useEffect(() => {
    setErrMsg('');
  }, [act1, act2, common]);

  //options for the fetch to allow us to hit the proper endpoints
  const options = {
    headers: {
      'X-RapidAPI-Key': '400baa31efmsh90843526a9ed21fp1aefcfjsna50abfee7ad2',
      'X-RapidAPI-Host': 'actor-movie-api1.p.rapidapi.com',
    },
    params: { apiKey: '62ffac58c57333a136053150eaa1b587' },
  };

  //function to fetch the filmography and add it to state
  const fetchMovies = (setActFunction, actorName, setLoading) => {
    setLoading(true);
    setErrMsg();
    axios
      .get(
        `https://actor-movie-api1.p.rapidapi.com/getid/${actorName}`,
        options
      )
      .then((res) => {
        const dataArray = res.data.map((item) => {
          return {
            //extracting only the information we need from the api
            title: item.title,
            overview: item.overview,
            img: item.poster_path,
          };
        });
        setActFunction({ actor: actorName, movies: [...dataArray] });
        setLoading(false);
      })
      .catch((err) => {
        setErrMsg(`Couldn't find any actors with the name "${actorName}"`);
        setLoading(false);
      });
  };

  const compare = () => {
    if (act1 && act2) {
      let compArr = act1.movies.filter((x) =>
        act2.movies.some((y) => x.title === y.title)
      );
      setCommon(compArr);
      setErrMsg();
    } else {
      setErrMsg('Need to have two actors to compare!');
    }
  };

  return (
    <div className="App">
      <section className="upper">
        <Actor
          actState={act1}
          setActState={setAct1}
          fetchMovies={fetchMovies}
          common={common}
          setCommon={setCommon}
        />
        {!common ? (
          <div className="center">
            <button className="compare-button" onClick={compare}>
              Compare
            </button>
            <p className="err-msg">{errMsg}</p>
          </div>
        ) : (
          <></>
        )}

        <Actor
          actState={act2}
          setActState={setAct2}
          fetchMovies={fetchMovies}
          common={common}
          setCommon={setCommon}
        />
      </section>
      {common ? (
        <section className="lower">
          {common.length === 0 ? (
            <h1> No shared movies! </h1>
          ) : (
            common.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))
          )}
        </section>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
