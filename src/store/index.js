import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import { loadState, saveState } from '../helpers/localStorage';

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, persistedState, composeEnhancers(
  applyMiddleware(thunk),
));

store.subscribe(() => {
  saveState({
    login: store.getState().login,
    player: store.getState().player,
    allplayer: store.getState().allplayer,
  });
});

export default store;
