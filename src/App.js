import axios from 'axios';
import './App.css';
import { useState } from 'react';

import Actor from './Actor';

function App() {
  const [act1, setAct1] = useState();
  const [act2, setAct2] = useState();
  const [errMsg, setErrMsg] = useState('');

  //options for the fetch to allow us to hit the proper endpoints
  const options = {
    headers: {
      'X-RapidAPI-Key': '400baa31efmsh90843526a9ed21fp1aefcfjsna50abfee7ad2',
      'X-RapidAPI-Host': 'actor-movie-api1.p.rapidapi.com',
    },
    params: { apiKey: '62ffac58c57333a136053150eaa1b587' },
  };

  //function to fetch the filmography and add it to state
  const fetchMovies = (setActFunction, actorName) => {
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
            character: item.character,
            img: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`,
          };
        });
        setActFunction({ actor: actorName, movies: [...dataArray] });
      })
      .catch((err) => setErrMsg(err));
  };

  return (
    <div className="App">
      <Actor actState={act1} setActState={setAct1} fetchMovies={fetchMovies} />
      <button className="compare-button">Compare</button>
      <Actor actState={act2} setActState={setAct2} fetchMovies={fetchMovies} />
    </div>
  );
}

export default App;
