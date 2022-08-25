import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './img/marvel_logo.png';
import { Search, Star } from 'react-ionicons';
import './Navbar.scss';

function Navbar({ search }) {
  const [inputText, setInputText] = useState('');

  const onSearchInput = (q) => {
    setInputText(q);
    search(q);
  };

  return (
    <nav className='marvel_navbar'>
      <Link to='/'>
        <img className='marvel_logo' src={logo} alt='Marvel logo' />
      </Link>
      <div className='marvel_search'>
        <input
          className='marvel_search_input'
          type='text'
          placeholder='Enter character name...'
          onChange={(e) => onSearchInput(e.target.value)}
          value={inputText}
        />
        <Search
          className='marvel_search_icon'
          color={'#e03131'}
          title={'Search'}
        />
      </div>
      <Link to='/favourites'>
        <Star
          className='marvel_favourites_icon'
          color={'#e03131'}
          rotate
          title={'Favourites'}
        />
      </Link>
    </nav>
  );
}

export default Navbar;
