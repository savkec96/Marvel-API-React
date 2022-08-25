import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import FavouriteHeroes from './FavouriteHeroes';

function Favourites() {
  const { favourites } = useContext(GlobalContext);
  return (
    <>
      {favourites.map((fav, i) => (
        <FavouriteHeroes fav={fav} key={i} />
      ))}
    </>
  );
}

export default Favourites;
