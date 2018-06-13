import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { firebaseMiddleware } from './configureFirebase';
import rootReducer from '../reducers';
import rootSagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithFirebase = compose(
  firebaseMiddleware,
  applyMiddleware(sagaMiddleware)
)(createStore);

function configureStore(initialState) {
  const store = createStoreWithFirebase(rootReducer, initialState);

  sagaMiddleware.run(rootSagas);

  return store;
}

export { configureStore };