import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {"comparison":[{"non_constrained_area":838691,"non_constrained_count":1366,"id":"c73097ea3eacde57a363035840e64718","open_space_area":98403,"cadastre_count":1827,"locationScore":10},{"non_constrained_area":214996,"non_constrained_count":593,"id":"c8dfc619703f878a7f1841e85922a130","open_space_area":455343,"cadastre_count":2127,"locationScore":7},{"non_constrained_area":462414,"non_constrained_count":1207,"id":"d987b1e65e0bc23e441238fd555f9577","open_space_area":60880,"cadastre_count":2608,"locationScore":11}],"pointArray":{"c73097ea3eacde57a363035840e64718":[151.242461795669,-33.8170919193559],"c8dfc619703f878a7f1841e85922a130":[151.2105327795557,-33.82393737874619],"d987b1e65e0bc23e441238fd555f9577":[151.23113214479008,-33.82707469783912]},"visualization":{"type":"FeatureCollection","features":[]},"activePoint":"","pointProps":{"c73097ea3eacde57a363035840e64718":{"pointName":"name needed","pointDescription":"description needed"},"c8dfc619703f878a7f1841e85922a130":{"pointName":"name needed","pointDescription":"description needed"},"d987b1e65e0bc23e441238fd555f9577":{"pointName":"name needed","pointDescription":"description needed"}},"visualizationOn":true}



export  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunk)
  ));

window.store =  store

console.log(store.getState())
ReactDOM.render(
  <Provider store={store}>
    <App  />
  </Provider>,
  document.getElementById('root')
)