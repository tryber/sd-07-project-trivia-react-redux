import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const extension = window.devToolsExtension ? window.devToolsExtension() : (f) => f;

const store = createStore(rootReducer, compose(applyMiddleware(thunk), extension));

export default store;
