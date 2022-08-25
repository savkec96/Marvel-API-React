import React, { useContext } from 'react';
import './Heroes.css';
import { GlobalContext } from '../context/GlobalState';

function Heroes({ marvel, i }) {
  const { addHeroToFavourite, favourites } = useContext(GlobalContext);
  let storedFav = favourites.find((f) => f.id === marvel.id);

  return (
    <div className='marvel_hero' key={i}>
      <img
        className='marvel_hero_image'
        src={`${marvel.thumbnail.path}.${marvel.thumbnail.extension}`}
        alt={`${marvel.name} image`}
      />
      <h2 className='marvel_hero_name'>{marvel.name}</h2>
      <button
        className='marvel_add_to_fav'
        disabled={storedFav ? true : false}
        onClick={() => addHeroToFavourite(marvel)}
      >
        Add to favourites
      </button>
    </div>
  );
}

export default Heroes;
