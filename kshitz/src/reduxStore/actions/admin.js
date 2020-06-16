import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as actions from './index';


export const adminViewCustomer=(data)=>{
    return{
        type:actionTypes.ADMIN_VIEW_CUSTOMER,
        data:data
    };
};

export const adminViewSeller=(data)=>{
    return{
        type:actionTypes.ADMIN_VIEW_SELLER,
        data:data
    };
};

export const adminViewProduct=(data)=>{
    return{
        type:actionTypes.ADMIN_VIEW_PRODUCT,
        data:data
    };
};

export const setAdminCustomer=(token)=>{

    return dispatch=>{

        axios.get('http://localhost:8080/admin/customer-details',
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            dispatch(actions.setErrorNull());
            
            dispatch(adminViewCustomer(response.data));
        }).catch(error=>{
            
        })

    }
}

export const setAdminSeller=(token)=>{

    return dispatch=>{

        axios.get('http://localhost:8080/admin/seller-details',
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            dispatch(actions.setErrorNull());
            
            dispatch(adminViewSeller(response.data));
        }).catch(error=>{
            
        })

    }
}
export const setAdminProduct=(token)=>{

    return dispatch=>{

        axios.get('http://localhost:8080/admin/view-product',
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            dispatch(actions.setErrorNull());
           
            dispatch(adminViewProduct(response.data));
        }).catch(error=>{
            
        })

    }
}

export const activateCustomer=(token,id)=>{

    const body = null;

    return dispatch=>{

        axios.put('http://localhost:8080/admin/activate-customer/'+id,body,
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
           
            dispatch(setAdminCustomer(token));
        }).catch(error=>{
            
        })

    }
}

export const deactivateCustomer=(token,id)=>{

    const body = null;

    return dispatch=>{

        axios.put('http://localhost:8080/admin/deactivate-customer/'+id,body,
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            
            dispatch(setAdminCustomer(token));
        }).catch(error=>{
           
        })

    }
}
export const activateSeller=(token,id)=>{

    const body = null;

    return dispatch=>{

        axios.put('http://localhost:8080/admin/activate-seller/'+id,body,
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            
            dispatch(setAdminSeller(token));
        }).catch(error=>{
            
        })

    }
}

export const deactivateSeller=(token,id)=>{

    const body = null;

    return dispatch=>{

        axios.put('http://localhost:8080/admin/deactivate-seller/'+id,body,
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            
            dispatch(setAdminSeller(token));
        }).catch(error=>{
           
        })

    }
}

export const activateProduct=(token,id)=>{

    const body = null;

    return dispatch=>{

        axios.put('http://localhost:8080/admin/activate-product/'+id,body,
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
           
            dispatch(setAdminProduct(token));
        }).catch(error=>{
            
        })

    }
}

export const deactivateProduct=(token,id)=>{

    const body = null;

    return dispatch=>{

        axios.put('http://localhost:8080/admin/deactivate-product/'+id,body,
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            
            dispatch(setAdminProduct(token));
        }).catch(error=>{
           
        })

    }
}

export const setAdminCategoryData=(data)=>{
    return{
        type:actionTypes.SET_ADMIN_CATEGORY_DATA,
        data:data
    };
};

export const adminCategoryData=()=>{

    return dispatch=>{

        axios.get('http://localhost:8080/view-all-category')
        .then(response=>{
            dispatch(actions.setErrorNull());
            dispatch(setAdminCategoryData(response.data));
        }).catch(error=>{
            
            

        })
    }
}



export const addChildCategory=(token,id,name)=>{
    return dispatch=>{

        axios.post('http://localhost:8080/admin/add-category',
        {
            name:name,
            id:id
        }
        ,
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            
            dispatch(adminCategoryData());
            dispatch(actions.setMessage('Category added successfully!!!'));
            dispatch(actions.setErrorNull());
        }).catch(error=>{
           
            dispatch(actions.setError(error.response));
            dispatch(actions.setSuccessFail());
            dispatch(actions.setError(error.response));
        })

    }
}

export const setAdminMetadata=(data)=>{
    return{
        type:actionTypes.SET_ADMIN_METADATA,
        data:data
    };
};
export const adminMetadata=(token)=>{

    return dispatch=>{

        axios.get('http://localhost:8080/admin/view-metadata-fields',
        {
            headers: {'Authorization': 'Bearer '+token }
        })
        .then(response=>{
            dispatch(actions.setErrorNull());
            dispatch(setAdminMetadata(response.data));
            
        }).catch(error=>{
           


        })
    }
}

export const addMetadataFields=(token,name)=>{
    return dispatch=>{

        axios.post('http://localhost:8080/admin/add-metadata-fields',
        {
            name:name

        }
        ,
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
           
            dispatch(adminMetadata(token));
            dispatch(actions.setMessage('Metadata field added successfully!!!'));
            dispatch(actions.setErrorNull());
        }).catch(error=>{
            
            dispatch(actions.setError(error.response));
            dispatch(actions.setSuccessFail());
            dispatch(actions.setError(error.response));
        })

    }
}

export const addFieldValueCategory=(token,categoryId,metadataId,value)=>{
    return dispatch=>{

        axios.post('http://localhost:8080/admin/add-field-value-category',
        {
            metadataId:metadataId,
            categoryId:categoryId,
            value:value

        }
        ,
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            console.log(response.data);
            
            dispatch(actions.setMessage(' Field Value added successfully!!!'));
            dispatch(actions.setErrorNull());
            
        }).catch(error=>{
            console.log(error.response);
            
            dispatch(actions.setError(error.response));
            dispatch(actions.setSuccessFail());
            dispatch(actions.setError(error.response));
        })

    }
}

