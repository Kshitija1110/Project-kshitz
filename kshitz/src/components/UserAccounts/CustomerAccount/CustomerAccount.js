import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../reduxStore/actions/index';
import CustomerAddress from '../CustomerAddress/CustomerAddress';
import classes from './CustomerAccount.module.css';


const CustomerAccount = (props)=>{
    const [authRedirect,setAuthRedirect] = useState();
    const [showAddress,setShowAddress] = useState(false);
    const [editProfile,setEditProfile] = useState(false);

    useEffect(()=>{
        if(!props.isAuthenticated){
            setAuthRedirect(<Redirect to = '/login'/>);
    
        }
        else {
            props.onSetCustomerAccount(props.token);

        }

    },[props.isAuthenticated,props.onSetCustomerAccount,props.token]);

    const AddressHandler=()=>{
        setShowAddress(true);

    }
    const editHandler=()=>{
        setEditProfile(true);
    }


    let customerDetails = null;

    if(props.customerData.length!==0){

        customerDetails = <div >
            <img style={{width:'60%'}} src = {require('/home/kshitija/kshitz/src/assets/Images/'+props.customerData.profileImage)}/>
   <p> <strong>First Name: {props.customerData.firstName}</strong></p>
   <p> <strong>Middle Name: {props.customerData.middleName}</strong></p>
   <p> <strong>Last Name: {props.customerData.lastName}</strong></p>
  <p><strong>User Name: {props.customerData.username}</strong></p>
   <p><strong>Email: {props.customerData.email}</strong></p>
   <p><strong>Mobile number: {props.customerData.contact}</strong></p>
   <button className={classes.Button} >Edit Profile</button>
   <button className={classes.Button} onClick={()=>AddressHandler()}>Show Addresses</button>
        </div>

       
        console.log(props.customerData.firstName);
    }
    if(showAddress){
        customerDetails=<CustomerAddress/>
    }
    // if(editProfile){
    //     customerDetails=<EditProfile/>
    // }


    return(<div className={classes.Box}>
        {authRedirect}
        {customerDetails}
    </div>);

}

const mapStateToProps=state=>{
    return{
        token: state.auth.token,
    isAuthenticated :state.auth.token!==null,
    customerData:state.account.customerData,
    };

};

const mapDispatchToProps=dispatch=>{
    return{
        onSetCustomerAccount:(token)=>dispatch(actions.viewCustomerAccount(token)),
        onSetCustomerAddress:(token)=>dispatch(actions.viewCustomerAddress(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomerAccount);