import * as actionTypes from './actionTypes';
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

    const customerDetails={
            email: email,
            firstName: firstname,
            middleName: middlename,
            userName: username,
            profileImage: fileupload,
            lastName: lastname,
            contact: contact,
            password: password,
            confirmPassword: confirmpassword
    };

    return dispatch=>{
        console.log('inside dispatch');
        console.log(email,contact);

        //dispatch(registerSuccess('hi'));

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
            console.log(response.data);
            dispatch(registerSuccess(response.data));
        }).catch(error=>{
            console.log(error.response);
            dispatch(registerFail(error.response));
        })

    };

};
export const registerSeller=(username,firstname,middlename,lastname,email,contact,password,confirmpassword,companyname,gst,city,state,country,zipcode,label)=>{

   

    return dispatch=>{
        console.log('inside dispatch');
        console.log(email,contact);

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
            console.log(response.data);
            dispatch(registerSuccess(response.data));
        }).catch(error=>{
            console.log(error.response);
            dispatch(registerFail(error.response));
        })

    };

};