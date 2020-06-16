import React from 'react';
import { connect } from 'react-redux';
import ViewProducts from '../ViewProducts/ViewProducts';
import SellerProducts from '../SellerProduct/SellerProduct';
import jwt from 'jwt-decode';


const Product = (props)=>{
    let account = null;

    if(!props.isAuthenticated){
        account = <ViewProducts/>
    }
    if(props.isAuthenticated){
        let decodedToken = jwt(props.token);
        const authorities = decodedToken.authorities[0];
        if(authorities==='ROLE_SELLER'){

            account = <SellerProducts/>
        }
        else if(authorities==='ROLE_CUSTOMER'){
            account = <ViewProducts/>
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

export default connect(mapStateToProps)(Product);