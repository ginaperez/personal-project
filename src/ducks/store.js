import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import cartReducer from './cartReducer';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

const store = createStore(cartReducer)

export default createStore(reducer, applyMiddleware(promiseMiddleware));