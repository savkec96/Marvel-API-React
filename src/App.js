import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import md5 from 'md5';
import Navbar from './components/Navbar';
import './App.css';
import Header from './components/Header';
import Heroes from './components/Heroes';
import Favourites from './components/Favourites';
import { GlobalProvider } from './context/GlobalState';

const API_URL = process.env.REACT_APP_BASE_URL;

function App() {
  const [marvelHero, setMarvelHero] = useState([]);
  const [query, setQuery] = useState('');
  const base_URL = `${API_URL}/v1/public/characters`;
  const ApiKeyPrivate = process.env.REACT_APP_PRIVATE_KEY;
  const ApiKeyPublic = process.env.REACT_APP_PUBLIC_KEY;
  let ts = Date.now().toString();
  let offset = 0;

  const getHash = (timeStamp, keyPr, keyPu) => {
    return md5(timeStamp + keyPr + keyPu).toString();
  };

  let hash = getHash(ts, ApiKeyPrivate, ApiKeyPublic);

  const loadMoreMarvelHeroesBySearch = () => {
    fetch(
      `${base_URL}?nameStartsWith=${query}&ts=${ts}&apikey=${ApiKeyPublic}&hash=${hash}`
    )
      .then((res) => res.json())
      .then(({ data }) => {
        const newMarvelHero = [];
        data.results.forEach((m) => {
          if (
            m.thumbnail.path !==
              'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' &&
            m.thumbnail.path !==
              'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708'
          ) {
            newMarvelHero.push(m);
          }
        });
        setMarvelHero(newMarvelHero);
      });
  };

  const loadMoreMarvelHeroes = () => {
    fetch(
      `${base_URL}?ts=${ts}&apikey=${ApiKeyPublic}&hash=${hash}&limit=20&offset=${offset}`
    )
      .then((res) => res.json())
      .then(({ data }) => {
        const newMarvelHero = [];
        data.results.forEach((m) => {
          if (
            m.thumbnail.path !==
              'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' &&
            m.thumbnail.path !==
              'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708'
          ) {
            newMarvelHero.push(m);
          }
        });
        setMarvelHero((oldMarvelHero) => [...oldMarvelHero, ...newMarvelHero]);
      });
    offset += 20;
  };

  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >
      e.target.documentElement.scrollHeight
    ) {
      loadMoreMarvelHeroes();
    }
  };

  useEffect(() => {
    if (query !== '') {
      loadMoreMarvelHeroesBySearch();
    } else {
      loadMoreMarvelHeroes();
      window.addEventListener('scroll', handleScroll);
    }
  }, [query]);

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar search={(q) => setQuery(q)} />
        <Header />
        <div className='main_container'>
          <Routes>
            <Route
              exact
              path='/'
              element={marvelHero.map((marvel, i) => {
                return <Heroes marvel={marvel} key={i} />;
              })}
            />
            <Route path='/favourites' element={<Favourites />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
