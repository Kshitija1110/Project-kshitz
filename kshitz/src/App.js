import React from 'react';
import Layout from './containers/Layout/Layout';
import classes from  './App.module.css';
import {Route,Switch, Redirect} from 'react-router-dom';
import Cart from './components/Cart/ViewCart/ViewCart';
import ProductVariation from './components/Products/ViewProductVariation/ProductVariations';
import Auth from './containers/Auth/Auth';
import Product from './components/Products/ViewProducts/ViewProducts';
import CoverPage from './components/CoverPage/CoverPage';
import CustomerAccount from './components/UserAccounts/CustomerAccount/CustomerAccount';

function App() {
  let routes=(<Switch>
        
        <Route path="/login" component={Auth}/>
        <Route path="/cart" component ={Cart}/>
        <Route path="/account" component={CustomerAccount}/>
       <Route path= "/products/product-variation" component={ProductVariation}/>
        <Route path="/product" component={Product}/>
        <Route path="/" component={CoverPage}/>
        <Redirect to="/"/>
        
        
        </Switch>);
  return (
    <div className={classes.App}>
     <Layout>
       {routes}
</Layout>
    </div>
  );
}

export default App;
