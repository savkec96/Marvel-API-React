import React, { useContext } from 'react';
import './FavouriteHeroes.scss';
import { GlobalContext } from '../context/GlobalState';

function FavouriteHeroes({ fav, i }) {
  const { removeHeroFromFavourites } = useContext(GlobalContext);
  return (
    <div className='fav_hero' key={i}>
      <img
        className='fav_hero_image'
        src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`}
        alt={`${fav.name} image`}
      />
      <div className='fav_slide'>
        <p className='fav_description'>
          {fav.description.substring(0, 250)}...
        </p>
      </div>

      <h2 className='fav_hero_name'>{fav.name}</h2>
      <button
        className='fav_remove'
        onClick={() => removeHeroFromFavourites(fav.id)}
      >
        Remove
      </button>
    </div>
  );
}

export default FavouriteHeroes;
