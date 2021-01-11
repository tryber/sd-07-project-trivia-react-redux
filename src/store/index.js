// aqui tu cria o state
// importe o método applyMiddleware
import { createStore, compose } from 'redux';
// importe o redux-thunk
// import thunk from 'redux-thunk';
import rootReducer from './ducks/rootReducer';

const composed = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// aplique o middleware
const store = createStore(rootReducer, composed);

export default store;
