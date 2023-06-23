import axios from 'axios';
import './App.css';
import { useState } from 'react';

import Actor from './Actor';

function App() {
  const [act1, setAct1] = useState();
  const [act2, setAct2] = useState();
  const [errMsg, setErrMsg] = useState('');
  const [common, setCommon] = useState();

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
            img: item.poster_path,
          };
        });
        setActFunction({ actor: actorName, movies: [...dataArray] });
      })
      .catch((err) => setErrMsg(err));
  };

  const compare = () => {
    if (act1 && act2) {
      let compArr = act1.movies.filter((x) =>
        act2.movies.some((y) => x.title === y.title)
      );
      console.log(compArr);
      setErrMsg();
    } else {
      setErrMsg('Need to have two actors to compare!');
    }
  };

  return (
    <div className="App">
      <Actor actState={act1} setActState={setAct1} fetchMovies={fetchMovies} />
      <button className="compare-button" onClick={compare}>
        Compare
      </button>
      <Actor actState={act2} setActState={setAct2} fetchMovies={fetchMovies} />
    </div>
  );
}

export default App;
