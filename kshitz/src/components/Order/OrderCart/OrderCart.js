import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/index';
import classes from './OrderCart.module.css';

const Order = (props)=>{

    const {onViewCartDetails,onSetCustomerAddress,token,onOrderCart,addressData,cartDetails,}=props;
    useEffect(()=>{
        onViewCartDetails(token);
        onSetCustomerAddress(token);
    },[onSetCustomerAddress,token,onViewCartDetails]);

    const [showAddress,setShowAddress] = useState(false);
    const [continueCart,setContinueCart] = useState(false);

    const  orderHandler=(id)=>{

        onOrderCart(token,id);
        setContinueCart(true);
    }

    

let orderCart = null;

if(cartDetails.length!==0){
 orderCart =<div>
    <h1>Total amount : {props.cartDetails.amountPaid}</h1>
<h1>Payment Method: {props.cartDetails.paymentMethod}</h1>
<button onClick={()=>continueHandler()}>Continue?</button>
</div>
}

const continueHandler=()=>{

   setShowAddress(true);

}
 if(addressData.length!==0 && showAddress){
        let addresses = { ...addressData};
        let number =0;
        

     orderCart =  Object.keys(addresses).map(igkey=>{
             return [...Array(addresses[igkey])].map(key=>{  
                 
                 
                 return <div key ={igkey}>
                     <h1>Address: {++number}</h1>
             <p>City: {key.address.city}</p>
             <p>State: {key.address.state}</p>
             <p>Country: {key.address.country}</p>
             <p>Zipcode: {key.address.zipCode}</p>
             <p>Label: {key.address.label}</p>
             <button className={classes.Button3} onClick={()=>orderHandler(key.id)} >Continue with this Address?</button>
            
            
             </div>
             });

        
        });
        
    }
    if(continueCart){
        orderCart = <h1>Your order has been successfully placed!!!</h1>
    }



    return(<div>
    {orderCart}
         
    </div>);
}

const mapStateToProps=state=>{
    return{
        token: state.auth.token,
        addressData:state.account.customerAddress,
        cartDetails:state.order.cartDetails
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onSetCustomerAddress:(token)=>dispatch(actions.viewCustomerAddress(token)),
        onOrderCart:(token,addressId)=>dispatch(actions.orderCart(token,addressId)),
        onViewCartDetails:(token)=>dispatch(actions.viewCartDetails(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Order);