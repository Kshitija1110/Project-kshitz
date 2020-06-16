import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as actions from './index';


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
export const setSellerAddress=(address)=>{
    return{
        type:actionTypes.SET_SELLER_ADDRESS,
        address:address
    };
};
export const setEditAddressData=(address)=>{
    return{
        type:actionTypes.SET_EDIT_ADDRESS_DATA,
        address:address
    };
};


export const viewCustomerAddress=(token)=>{
    return dispatch=>{

        axios.get('http://localhost:8080/customer/customer-address',{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{

            dispatch(setCustomerAddress(response.data));
        }).catch(error=>{
           
        })
    

    }
}
export const viewSellerAddress=(token)=>{
    return dispatch=>{

        axios.get('http://localhost:8080/seller/seller-address',{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            
            dispatch(setSellerAddress(response.data));
        }).catch(error=>{
          
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

            dispatch(viewCustomerAddress(token));
        }).catch(error=>{
           
        })

    }
}
export const updateCustomerProfile=(token,firstName,middleName,lastName,contactNumber)=>{
    return dispatch=>{
        axios.patch('http://localhost:8080/customer/update-customer',
        {
            firstName:firstName,
            middleName:middleName,
            lastName:lastName,
            contactNumber:contactNumber
 },{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
           
            dispatch(viewCustomerAccount(token));
        }).catch(error=>{

        })

    }
}
export const updateSellerProfile=(token,firstName,middleName,lastName,contactNumber,gst,companyName)=>{
    return dispatch=>{
        axios.patch('http://localhost:8080/seller/update-seller',
        {
            firstName:firstName,
            middleName:middleName,
            lastName:lastName,
            companyContact:contactNumber,
            gst:gst,
            companyName:companyName
 },{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            
        }).catch(error=>{
           
        })

    }
}

export const updateCustomerAddress=(token,id,city,state,country,zipcode,label)=>{
    return dispatch=>{
        axios.patch('http://localhost:8080/customer/update-customer-address/'+id,
        {
            city:city,
            country:country,
            state:state,
            zipCode:zipcode,
            label:label
            
 },{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
        
        }).catch(error=>{
           
        })

    }
}

export const updateSellerAddress=(token,city,state,country,zipcode,label)=>{
    return dispatch=>{
        axios.patch('http://localhost:8080/seller/update-seller-address/',
        {
            city:city,
            country:country,
            state:state,
            zipCode:zipcode,
            label:label
            
 },{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
           
        }).catch(error=>{
           
        })

    }
}

export const updatePassword=(token,oldPassword,newPassword,confirmPassword)=>{
    return dispatch=>{
        axios.patch('http://localhost:8080/customer/update-customer-password',
        {
            oldPassword:oldPassword,
            newPassword:newPassword,
            confirmPassword:confirmPassword
 },{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            dispatch(actions.setMessage('Password updated successfully!!!'));
            dispatch(actions.setErrorNull());
          
        }).catch(error=>{
            dispatch(actions.setSuccessFail());
            dispatch(actions.setError(error.response));
        })

    }
}

export const updateSellerPassword=(token,oldPassword,newPassword,confirmPassword)=>{
    return dispatch=>{
        axios.patch('http://localhost:8080/seller/update-seller-password',
        {
            oldPassword:oldPassword,
            newPassword:newPassword,
            confirmPassword:confirmPassword
 },{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            dispatch(actions.setMessage('Password updated successfully!!!'));
            dispatch(actions.setErrorNull());
           
        }).catch(error=>{
            dispatch(actions.setSuccessFail());
            dispatch(actions.setError(error.response));
        })

    }
}

export const deleteAddress=(token,id)=>{
    return dispatch=>{
        axios.delete('http://localhost:8080/customer/delete-customer-address/'+id,
       {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            
            dispatch(viewCustomerAddress(token));
        }).catch(error=>{

            
           
        })

    }
}

export const viewCustomerAccount=(token)=>{
    return dispatch=>{

    
        axios.get('http://localhost:8080/customer/user-details',{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
           
            dispatch(setCustomerAccount(response.data));
        }).catch(error=>{
            
        })
    }
}
export const viewSellerAccount=(token)=>{
    return dispatch=>{

    
        axios.get('http://localhost:8080/seller/seller-details',{
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
           
            dispatch(setCustomerAccount(response.data));
        }).catch(error=>{
            
        })
    }
}