import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import classes from './SellerAddress.module.css';
import * as actions from '../../../reduxStore/actions/index';
import EditAddress from './EditAddress/EditAddress';


const SellerAddress=(props)=>{

    const {onSetEditAddress,onSetSellerAddress,token,sellerAddress}=props;

    useEffect(()=>{
        onSetSellerAddress(token);

    },[onSetSellerAddress,token]);

    const [showEdit,setShowEdit] = useState(false);

    let addressDetails = null;

    const editHandler=(id)=>{
        
     onSetEditAddress(sellerAddress[0].address);
     setShowEdit(true);
    }

    

    if(sellerAddress.length!==0){
        

        addressDetails = <div >
<h1>Address:</h1>
             <p>City: {sellerAddress[0].address.city}</p>
             <p>State: {sellerAddress[0].address.state}</p>
             <p>Country: {sellerAddress[0].address.country}</p>
             <p>Zipcode: {sellerAddress[0].address.zipCode}</p>
             <p>Label: {sellerAddress[0].address.label}</p>
             <button className={classes.Button} onClick={()=>editHandler()}  >Edit Address</button>
        </div>

    }
    if(showEdit){

        addressDetails = <EditAddress/>
    }

    return(<div>
        {addressDetails}
    </div>)
};

const mapStateToProps=state=>{
    return{

        sellerAddress:state.account.sellerAddress,
        token:state.auth.token,

    };
};
const mapDispatchToProps=dispatch=>{
    return{
        onSetSellerAddress:(token)=>dispatch(actions.viewSellerAddress(token)),
        onSetEditAddress:(data)=>dispatch(actions.setEditAddressData(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SellerAddress);