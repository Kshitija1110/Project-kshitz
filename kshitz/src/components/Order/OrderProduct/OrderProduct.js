import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/index';
import classes from './OrderProduct.module.css';

const OrderProduct = (props)=>{

    const {onSetCustomerAddress,token}=props;

    useEffect(()=>{
        onSetCustomerAddress(token);
    },[onSetCustomerAddress,token]);

    const [continueProduct,setContinueProduct] = useState(false);

    const  orderHandler=(id)=>{

        props.onOrderProduct(props.token,id,props.variationId,1);
        setContinueProduct(true);
    }

    

let orderProduct = null;




 if(props.addressData.length!==0){
        let addresses = { ...props.addressData};
        let number =0;
       

     orderProduct =  Object.keys(addresses).map(igkey=>{
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
    if(continueProduct){
        orderProduct = <h1>Your order has been successfully placed!!!</h1>
    }



    return(<div>
    {orderProduct}
         
    </div>);
}

const mapStateToProps=state=>{
    return{
        token: state.auth.token,
        addressData:state.account.customerAddress,
        cartDetails:state.order.cartDetails,
        variationId:state.product.variationId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onSetCustomerAddress:(token)=>dispatch(actions.viewCustomerAddress(token)),
        onOrderProduct:(token,addressId,variationId,quantity)=>dispatch(actions.orderProduct(token,addressId,variationId,quantity))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderProduct);