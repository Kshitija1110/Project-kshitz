import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/index';
import CustomerAddress from '../CustomerAddress/CustomerAddress';
import classes from './CustomerAccount.module.css';
import EditProfile from '../EditAccount/CustomerProfile/EditCustomerProfile';


const CustomerAccount = (props)=>{
    const [showAddress,setShowAddress] = useState(false);
    const [editProfile,setEditProfile] = useState(false);

    const {onSetCustomerAccount,token}=props;

    useEffect(()=>{  
            onSetCustomerAccount(token);
             

    },[onSetCustomerAccount,token]);

    const AddressHandler=()=>{
        setShowAddress(true);
       
    }
    const editHandler=()=>{
        setEditProfile(true);
    }

     

    let customerDetails = null;

   

    if(props.userData.length!==0){

        

        customerDetails = <div >
            <img style={{width:'60%'}} src = {require('/home/kshitija/kshitz/src/assets/Images/'+props.userData.profileImage)} alt='customer dp'/>
   <p> <strong>First Name: {props.userData.firstName}</strong></p>
   <p> <strong>Middle Name: {props.userData.middleName}</strong></p>
   <p> <strong>Last Name: {props.userData.lastName}</strong></p>
  <p><strong>User Name: {props.userData.username}</strong></p>
   <p><strong>Email: {props.userData.email}</strong></p>
   <p><strong>Mobile number: {props.userData.contact}</strong></p>
   <button className={classes.Button} onClick={()=>editHandler()}>Edit Profile</button>
   <button className={classes.Button} onClick={()=>AddressHandler()}>Show Addresses</button>
        </div>

    
    }
    if(showAddress){
        customerDetails=<CustomerAddress/>
    }
    if(editProfile){
        customerDetails=<EditProfile/>
    }


    return(<div className={classes.Box}>
        {customerDetails}
    </div>);

}

const mapStateToProps=state=>{
    return{
        token: state.auth.token,
    userData:state.account.userData,
    };

};

const mapDispatchToProps=dispatch=>{
    return{
        onSetCustomerAccount:(token)=>dispatch(actions.viewCustomerAccount(token)),
        onSetCustomerAddress:(token)=>dispatch(actions.viewCustomerAddress(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomerAccount);