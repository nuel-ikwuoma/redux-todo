import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { todoReducer, filterReducer, notificationReducer } from '../reducers';

// combine all reducers
const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
  notificationState: notificationReducer,
});

const logger = createLogger();

// STORE
const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, logger)
);

// get initial state  -> For Testing
console.log("INITIAL_STATE", typeof store.getState());

export default store;
