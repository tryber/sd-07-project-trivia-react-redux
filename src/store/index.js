import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const maracutaia = (desenvolvendo = true) => {
  if (desenvolvendo === true) {
    const composed = compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
    return composed;
  }
  return applyMiddleware(thunk);
};

const store = createStore(reducer, maracutaia(true));

export default store;
