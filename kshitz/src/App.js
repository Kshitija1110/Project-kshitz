import React, {useEffect,Suspense} from 'react';
import Layout from './containers/Layout/Layout';
import classes from  './App.module.css';
import { connect } from 'react-redux';
import * as actions from './reduxStore/actions/index';
import {Route,Switch, Redirect} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import CoverPage from './components/CoverPage/CoverPage';
import Spinner from './components/UI/Spinner/Spinner';


const Account = React.lazy(()=>{
  return import('./components/UserAccounts/Accounts/Accounts');
});
const Orders = React.lazy(()=>{
  return import('./components/Order/Orders');
});
const OrderCart = React.lazy(()=>{
  return import('./components/Order/OrderCart/OrderCart');
});
const OrderProduct = React.lazy(()=>{
  return import('./components/Order/OrderProduct/OrderProduct');
});
const Update = React.lazy(()=>{
  return import('./UpdateHandler/UpdateHandler');
});
const Product = React.lazy(()=>{
  return import('./components/Products/Product/Product');
});
const Cart = React.lazy(()=>{
  return import('./components/Cart/ViewCart/ViewCart');
});
const ProductVariation = React.lazy(()=>{
  return import('./components/Products/ViewProductVariation/ProductVariations');
});
const Category = React.lazy(()=>{
  return import('./components/Category/Category');
});
const AdminUser = React.lazy(()=>{
  return import('./components/Admin/AdminUser/AdminUser');
});
const AdminProduct = React.lazy(()=>{
  return import('./components/Admin/AdminProduct/AdminProduct');
});
const AdminCategory = React.lazy(()=>{
  return import('./components/Admin/AdminCategory/AdminCategory');
});




const App=(props)=> {

  const {onTryAutoSignUp} = props;

  useEffect(()=>{
    onTryAutoSignUp();
  },[onTryAutoSignUp]);

  
  if(props.role==='ADMIN' || props.role==='SELLER' ){
    props.onsetAuthRedirectPath('/');
}

  let routes =(<Switch>
        
      <Route path="/login" component={Auth}/>
     <Route path= "/products/product-variation" render={props=><ProductVariation {...props}/>}/>
      <Route path="/product" render={props=><Product {...props}/>}/>
      <Route path="/cart" render={props=><Cart {...props}/>}/>
      <Route path="/category" render={props=><Category {...props}/>}/>
      <Route path="/orders" render={props=><Orders {...props}/>}/>
      <Route path="/account" render={props=><Account {...props}/>}/>
      <Route path="/" component={CoverPage}/>
      
      <Redirect to="/login"/>
      
      
      </Switch>);

  

if(props.isAuthenticated){
   routes=(<Switch>
        
        <Route path="/login" component={Auth}/>
        <Route path="/cart" render={props=><Cart {...props}/>}/>
        <Route path="/category" render={props=><Category {...props}/>}/>
        <Route path="/order/cart" render={props=><OrderCart {...props}/>}/>
        <Route path="/order/product" render={props=><OrderProduct {...props}/>}/>
        <Route path="/orders" render={props=><Orders {...props}/>}/>
        <Route path="/admin/users" render={props=><AdminUser {...props}/>}/>
        <Route path="/update" render={props=><Update {...props}/>}/>
        <Route path="/admin/category" render={props=><AdminCategory {...props}/>}/>
        <Route path="/admin/products" render={props=><AdminProduct {...props}/>}/>
        <Route path="/account" render={props=><Account {...props}/>}/>
       <Route path= "/products/product-variation" render={props=><ProductVariation {...props}/>}/>
        <Route path="/product" render={props=><Product {...props}/>}/>
        <Route path="/" component={CoverPage}/>

        
        
        </Switch>);
}

  return (
    <div className={classes.App}>
     <Layout>
     <Suspense fallback={<Spinner/>}>{routes}</Suspense>
</Layout>
    </div>
  );
}

const mapStateToProps=state=>{
  return{
  token: state.auth.token,
  isAuthenticated :state.auth.token!==null,
  role:state.auth.role
  }
}

const mapDispatchToProps=dispatch=>{
  return {
  onTryAutoSignUp:()=>dispatch(actions.authCheckState()),
  onsetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
