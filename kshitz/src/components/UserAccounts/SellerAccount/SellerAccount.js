import React,{ useEffect,useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/index';
import classes from './SellerAccount.module.css';
import SellerAddress from '../SellerAddress/SellerAddress';
import EditProfile from '../EditAccount/SellerProfile/EditSellerProfile';


const SellerAccount=(props)=>{

    const {onSetSellerAccount,token}=props;

    useEffect(()=>{  
        onSetSellerAccount(token);
         

},[onSetSellerAccount,token]);

const [showAddress,setShowAddress] = useState(false);
const [editProfile,setEditProfile] = useState(false);

const AddressHandler=()=>{
    setShowAddress(true);
}
const editHandler=()=>{
    setEditProfile(true);
}


let sellerDetails = null;

if(props.userData.length!==0){

    sellerDetails = <div >
<p> <strong>First Name: {props.userData.firstName}</strong></p>
<p> <strong>Middle Name: {props.userData.middleName}</strong></p>
<p> <strong>Last Name: {props.userData.lastName}</strong></p>
<p><strong>User Name: {props.userData.username}</strong></p>
<p><strong>Email: {props.userData.email}</strong></p>
<p><strong>Company Name: {props.userData.companyName}</strong></p>
<p><strong>Company Contact: {props.userData.companyContact}</strong></p>
<button className={classes.Button} onClick={()=>editHandler()}>Edit Profile</button>
<button className={classes.Button} onClick={()=>AddressHandler()}>Show Address</button>


    </div>
}

if(showAddress){
    sellerDetails = <SellerAddress/>
}
if(editProfile){
    
    sellerDetails=<EditProfile/>
}

    return (
        <div className={classes.Box}>
            {sellerDetails}
        </div>
    )

}

const mapStateToProps=state=>{
    return{
        token: state.auth.token,
    userData:state.account.userData,
    };

};

const mapDispatchToProps=dispatch=>{
    return{
        onSetSellerAccount:(token)=>dispatch(actions.viewSellerAccount(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SellerAccount);