export default (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVOURITES':
      return {
        ...state,
        favourites: [action.payload, ...state.favourites],
      };
    case 'REMOVE_HERO_FROM_FAVOURITES':
      return {
        ...state,
        favourites: state.favourites.filter(
          (hero) => hero.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
