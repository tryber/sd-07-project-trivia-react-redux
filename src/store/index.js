import { createStore } from 'redux';
import player from '../reducers';

const store = createStore(
  player,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
