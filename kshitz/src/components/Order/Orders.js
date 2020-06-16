import React,{useEffect} from 'react';
import classes from './Orders.module.css';
import { connect } from 'react-redux';
import * as actions from '../../reduxStore/actions/index';
import { Redirect } from 'react-router-dom';

const Orders=(props)=>{

    const {onViewOrders,token,onsetAuthRedirectPath,orders,isAuthenticated}=props;

    useEffect(()=>{

        if(isAuthenticated){
        onViewOrders(token);
        }

    },[onViewOrders,token,isAuthenticated]);

    let showOrders = null;

    if(orders.length!==0 && isAuthenticated){
        
        let order = {...orders};
      showOrders =  Object.keys(order).map(igkey=>{
            return [...Array(order[igkey])].map(key=>{  
                
                return <div className={classes.Box} key ={igkey}>
                   <p> Amount Paid: <strong>{key.amountPaid}</strong> </p>
                   <p> Date of order:  <strong>{key.dateCreated}</strong> </p>
                   <p> Payment method: <strong>{key.paymentMethod}</strong></p>
                   <h3>Address:</h3>
                   <p> City:  <strong>{key.city}</strong></p>
                   <p> State: <strong>{key.state}</strong></p>
                   <p> Country: <strong>{key.country}</strong></p>
                   <p> Zip code: <strong>{key.zipCode}</strong></p>
                   <p> Label: <strong>{key.label}</strong></p>

                </div>
            })
        })
    }
    if(!isAuthenticated){
        onsetAuthRedirectPath('/orders');
        showOrders = <Redirect to ='/login'/>
    }

    return(<div>
        {showOrders}
    </div>);
}

const mapStateToProps=state=>{
    return{

        token: state.auth.token,
        orders:state.order.orders,
        isAuthenticated :state.auth.token!==null
        

    };
};

const mapDisptachToProps=dispatch=>{
    return{

        onViewOrders:(token)=>dispatch(actions.viewOrders(token)),
        onsetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))

    };
};
export default connect(mapStateToProps,mapDisptachToProps)(Orders);