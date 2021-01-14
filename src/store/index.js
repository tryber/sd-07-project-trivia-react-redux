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
    user: store.getState().user,
    player: store.getState().player,
  });
});

export default store;
