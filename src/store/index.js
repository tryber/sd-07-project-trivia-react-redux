import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composedThunkAndDevtools = compose(
  applyMiddleware(thunk),
);

const store = createStore(rootReducer, composedThunkAndDevtools);

export default store;
