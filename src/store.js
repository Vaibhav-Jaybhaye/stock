import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { stockReducer } from 'container/App/reducer';

export const store = createStore(combineReducers({ stock: stockReducer }), applyMiddleware(thunk, logger))