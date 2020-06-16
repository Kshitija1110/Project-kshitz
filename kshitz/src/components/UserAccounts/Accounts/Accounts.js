import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../reduxStore/actions/index';
import CustomerAccount from '../CustomerAccount/CustomerAccount';
import SellerAccount from '../SellerAccount/SellerAccount';
import jwt from 'jwt-decode';


const Account = (props)=>{
    let account = null;

    if(!props.isAuthenticated){
        props.onsetAuthRedirectPath('/account');
        account = <Redirect to = '/login'/>
    }
    if(props.isAuthenticated){
        let decodedToken = jwt(props.token);
        const authorities = decodedToken.authorities[0];
        if(authorities==='ROLE_SELLER'){

            account = <SellerAccount/>
        }
        else if(authorities==='ROLE_CUSTOMER'){
            account = <CustomerAccount/>
        }
    }

   


    return (<div>

        {account}

    </div>)
}

const mapStateToProps = state =>{
        return{
        token: state.auth.token,
        isAuthenticated :state.auth.token!==null 
        }
}
const mapDispatchToProps= dispatch=>{
    return{
    onsetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);