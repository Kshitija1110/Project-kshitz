import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import authReducer from './reduxStore/reducers/auth';
import registerReducer from './reduxStore/reducers/register';
import {Provider} from 'react-redux';
import productReducer from './reduxStore/reducers/products';
import showFieldsReducer from './reduxStore/reducers/showFields';
import cartReducer from './reduxStore/reducers/cart';
import accountReducer from './reduxStore/reducers/account';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose;

const rootReducer= combineReducers(
  {
    auth:authReducer,
    register:registerReducer,
    product: productReducer,
    showFields: showFieldsReducer,
    cart:cartReducer,
    account:accountReducer
  }
)


const store=createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
 <React.StrictMode>
   <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
