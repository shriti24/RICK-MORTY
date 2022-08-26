import { CharState, CharAction } from '../../types';
const initialState: CharState = {
  pgNumber: 1,
};

const CharacterReducer = (state = initialState, action: CharAction) => {
  switch (action.type) {
    case 'GET_NEXT_RES':
      return { ...state, pgNumber: action.payload + 1 };
    default:
      return state;
  }
};

export default CharacterReducer;
