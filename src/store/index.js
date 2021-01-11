import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const rootReducer = combineReducers({ reducer });

const extension = window.devToolsExtension ? window.devToolsExtension() : (f) => f;

const store = createStore(rootReducer, compose(applyMiddleware(thunk), extension));

export default store;
