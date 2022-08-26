import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import CharacterReducer from './store/reducer/CharacterReducer';

// const rootReducer = combineReducers({
//   chars: CharacterReducer,
// });

const store = configureStore({
  reducer: CharacterReducer,
}); //createStore(rootReducer, applyMiddleware(thunk));

// //export type
export default store;
