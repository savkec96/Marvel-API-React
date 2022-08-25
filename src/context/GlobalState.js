import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
  favourites: localStorage.getItem('favourites')
    ? JSON.parse(localStorage.getItem('favourites'))
    : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.favourites));
  }, [state]);

  // actions
  const addHeroToFavourite = (hero) => {
    dispatch({ type: 'ADD_TO_FAVOURITES', payload: hero });
  };

  const removeHeroFromFavourites = (id) => {
    dispatch({ type: 'REMOVE_HERO_FROM_FAVOURITES', payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        favourites: state.favourites,
        addHeroToFavourite,
        removeHeroFromFavourites,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
