// aqui tu cria o state
// importe o método applyMiddleware
import { createStore, applyMiddleware, compose } from 'redux';
// importe o redux-thunk
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './ducks/rootReducer';

// aplique o middleware
const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk)));

export default store;

// npm run cy:open
