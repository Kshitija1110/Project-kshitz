import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/index';
import {Redirect} from 'react-router-dom';

const ViewCart = (props)=>{

    const {onViewCart,token,isAuthenticated,cartData} = props;

    const [isRedirect,setIsRedirect] = useState(null);

    useEffect(()=>{
        console.log('cart ka useeffect');
        if(isAuthenticated){
            console.log('inside authenticated');
        onViewCart(token);
        }
        else{
            console.log('outside authenticated');
            setIsRedirect(<Redirect to = '/login'/>);
            
        }
    },[onViewCart,token,isAuthenticated]);

     console.log(isRedirect);
     
     let cart=<h1>No items in cart !!!!</h1>


     if(cartData.length!==0){

        const cartDetails = { ...cartData};

       cart =  Object.keys(cartDetails).map(igkey=>{
            console.log(cartDetails[igkey].productVariation.primaryImageName);
            console.log(cartDetails[igkey].quantity);
            console.log(cartDetails[igkey].productVariation.price);
             return [...Array(cartDetails[igkey])].map(key=>{  
                 return <div>
                   <img style={{width:'60%'}} src = {require('/home/kshitija/kshitz/src/assets/Images/'+cartDetails[igkey].productVariation.primaryImageName)}/>
           <p>quantity: {cartDetails[igkey].quantity}</p>
           <strong>Price: {cartDetails[igkey].productVariation.price}</strong>
               </div>
             });

        
        });
        
        console.log(cartDetails);


     }
     

    return (<div>
        {isRedirect}
        {cart}
        <h1>This is cart</h1>
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

        onViewCart:(token)=>dispatch(actions.viewCart(token))

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewCart);