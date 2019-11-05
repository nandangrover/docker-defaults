import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducersMap from '../features/featureReducers';

export default createStore(
  combineReducers(reducersMap),
  {},
  applyMiddleware(),
);
