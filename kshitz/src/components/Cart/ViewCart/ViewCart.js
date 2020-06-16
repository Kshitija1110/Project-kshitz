import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/index';
import {Redirect} from 'react-router-dom';
import classes from './ViewCart.module.css';

const ViewCart = (props)=>{

    const {onViewCart,token,isAuthenticated,cartData,onsetAuthRedirectPath} = props;

    const [isRedirect,setIsRedirect] = useState(null);

    useEffect(()=>{
       
        if(isAuthenticated){
           
        onViewCart(token);
        }
        else{
           
            onsetAuthRedirectPath('/cart');
            setIsRedirect(<Redirect to = '/login'/>);
            
        }
    },[onViewCart,token,isAuthenticated,onsetAuthRedirectPath]);

    const checkoutHandler=()=>{
        setIsRedirect(<Redirect to = '/order/cart'/>);
    }

   
     
     let cart=<h1>No items in cart !!!!</h1>


     if(cartData.length!==0){

        const cartDetails = { ...cartData};

       cart =  Object.keys(cartDetails).map(igkey=>{
            
             return [...Array(cartDetails[igkey])].map(key=>{  
                
                 return <div key ={igkey}>
                   <img style={{width:'60%'}} src = {require('/home/kshitija/kshitz/src/assets/Images/'+cartDetails[igkey].productVariation.primaryImageName)} alt='cart product'/>
           <p>quantity: {cartDetails[igkey].quantity}</p>
           <strong>Price: {cartDetails[igkey].productVariation.price}</strong>
               </div>
             });

        
        });
        
       


     }
     

    return (<div>
        {isRedirect}
        {cart}
        <button className={classes.Button3} onClick={()=>checkoutHandler()}>Checkout</button>
        </div>);
};

const mapStateToProps=state=>{
    return{
    token: state.auth.token,
    isAuthenticated :state.auth.token!==null,
    cartData:state.cart.cartData
    }
}

const mapDispatchToProps=dispatch=>{
    return{

        onViewCart:(token)=>dispatch(actions.viewCart(token)),
        onsetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewCart);