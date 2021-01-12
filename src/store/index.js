import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import tokenReducer from '../reducer';

const rootReducer = combineReducers({ tokenReducer });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
