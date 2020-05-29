import React from 'react';
import Input from '../../UI/Form/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../reduxStore/actions/index';
import classes from './EditCustomerProfile.module.css';

const EditCustomerProfile =(props)=>{

    return(<div>
        hahahhahah

    </div>);
}

const mapStateToProps=state=>{
    return{
        token: state.auth.token,
        customerData:state.account.customerData
    };

};

const mapDispatchToProps=dispatch=>{
    return{
        
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCustomerProfile);
