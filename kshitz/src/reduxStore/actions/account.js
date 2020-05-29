import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setCustomerAccount=(data)=>{
    return{

        type:actionTypes.SET_CUSTOMER_ACCOUNT,
        data:data

    };
};

export const setCustomerAddress=(address)=>{
    return{
        type:actionTypes.SET_CUSTOMER_ADDRESS,
        address:address
    };
};

export const viewCustomerAddress=(token)=>{
    return dispatch=>{

        axios.get('http://localhost:8080/customer/customer-address',{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            console.log(response.data);
            dispatch(setCustomerAddress(response.data));
        }).catch(error=>{
            console.log(error.response);
        })
    

    }
}

export const addCustomerAddress=(token,city,state,country,zipcode,label)=>{
    return dispatch=>{

        axios.post('http://localhost:8080/customer/add-customer-address',{
            city:city,
            country:country,
            state:state,
            zipCode:zipcode,
            label:label
 },{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            console.log(response.data);
        }).catch(error=>{
            console.log(error.response);
        })

    }
}
export const updateCustomerProfile=(token,data)=>{
    return dispatch=>{
        axios.patch('http://localhost:8080/customer/update-customer',{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            console.log(response.data);
            dispatch(setCustomerAccount(response.data));
        }).catch(error=>{
            console.log(error.response);
        })

    }
}
export const viewCustomerAccount=(token)=>{
    return dispatch=>{

    
        axios.get('http://localhost:8080/customer/user-details',{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            console.log(response.data);
            dispatch(setCustomerAccount(response.data));
        }).catch(error=>{
            console.log(error.response);
        })
    }
}