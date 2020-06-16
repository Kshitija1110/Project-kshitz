import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from 'axios';


export const registerSuccess=(message)=>{
    return{
        type:actionTypes.REGISTER_SUCCESS,
        message:message
    };
};

export const registerFail=(error)=>{
    return{
        type:actionTypes.REGISTER_FAIL,
        error:error
    };
};

export const registerCustomer=(username,firstname,middlename,lastname,email,fileupload,contact,password,confirmpassword)=>{
    return dispatch=>{
        

        axios.post('http://localhost:8080/register-customer',
        {
            email: email,
            firstName: firstname,
            middleName: middlename,
            userName: username,
            profileImage: fileupload,
            lastName: lastname,
            contact: contact,
            password: password,
            confirmPassword: confirmpassword

        },
        {
            headers: { 
                'Content-Type' : 'application/json',
                'Accept-Language':'german'
            }
        }).then(response=>{
            dispatch(registerSuccess(response.data));
        }).catch(error=>{
            dispatch(registerFail(error.response));
            dispatch(actions.setError(error.response));
        })

    };

};
export const registerSeller=(username,firstname,middlename,lastname,email,contact,password,confirmpassword,companyname,gst,city,state,country,zipcode,label)=>{

   

    return dispatch=>{

        axios.post('http://localhost:8080/register-seller',
        {
            email: email,
            firstName: firstname,
            middleName: middlename,
            username: username,
            lastName: lastname,
            companyContact: contact,
            password: password,
            confirmPassword: confirmpassword,
            companyName: companyname,
            gst:gst,
            city:city,
            country:country,
            state:state,
            zipCode:zipcode,
            label:label
 },
        {
            headers: { 
                'Content-Type' : 'application/json',
                'Accept-Language':'german'
            }
        }).then(response=>{
            dispatch(registerSuccess(response.data));
        }).catch(error=>{
            dispatch(registerFail(error.response));
            dispatch(actions.setError(error.response));
        })

    };

};