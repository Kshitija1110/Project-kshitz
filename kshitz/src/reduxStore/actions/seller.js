import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as actions from './index';


export const setSellerProduct=(data)=>{
    return{
        type:actionTypes.SET_SELLER_PRODUCT,
        data:data
    };
};
export const setSellerProductVariotion=(data)=>{
    return{
        type:actionTypes.SET_SELLER_PRODUCT_VARIATION,
        data:data
    };
};
export const setMetadataCategory=(data)=>{
    return{
        type:actionTypes.SET_METADATA_CATEGORY,
        data:data
    };

};

export const viewSellerProduct=(token)=>{

    return dispatch=>{

        axios.get('http://localhost:8080/seller/view-all-products',
        {
            headers: {'Authorization': 'Bearer '+token }
        })
        .then(response=>{
            dispatch(setSellerProduct(response.data));
        }).catch(error=>{
            
        })
    }

}
export const viewSellerProductVariation=(token,productId)=>{

    return dispatch=>{

        axios.get('http://localhost:8080/seller/view-all-product-variations/'+productId,
        {
            headers: {'Authorization': 'Bearer '+token }
        })
        .then(response=>{
            dispatch(setSellerProductVariotion(response.data));
        }).catch(error=>{
            
        })
    }

}

export const viewMetaDataCategory=(token,id)=>{

    return dispatch=>{

        axios.get('http://localhost:8080/seller/view-metadata-by-category/'+id,
        {
            headers: {'Authorization': 'Bearer '+token }
        })
        .then(response=>{
            dispatch(setMetadataCategory(response.data));
        }).catch(error=>{
            
        })
    }

}

export const addProduct=(token,categoryId,name,description,brand)=>{

    return dispatch=>{

        axios.post('http://localhost:8080/seller/add-product',
        {
           categoryId:categoryId,
           name:name,
           description:description,
           brand:brand
        },
        {
            headers: {'Authorization': 'Bearer '+token }
        })
        .then(response=>{
            dispatch(actions.setMessage('Product added successfully!!!'));
            dispatch(actions.setErrorNull());
        }).catch(error=>{
            dispatch(actions.setSuccessFail());
            dispatch(actions.setError(error.response));
            
        })
    }

}
export const addProductVariation=(token,productId,quantity,price,imagepath,metadata)=>{


    let value = metadata.split(',');
    

    return dispatch=>{

        axios.post('http://localhost:8080/seller/add-product-variation',
        {
           productId:productId,
           quantity:quantity,
           price:price,
           imagePath:imagepath,
           metadata:{
            Colour:value[0],
            Size:value[1]
           }
           
        },
        {
            headers: {'Authorization': 'Bearer '+token }
        })
        .then(response=>{
            dispatch(actions.setMessage('Product variation added successfully!!!'));
            dispatch(actions.setErrorNull());
        }).catch(error=>{
            dispatch(actions.setSuccessFail());
            dispatch(actions.setError(error.response));
            
        })
    }

}
export const updateProduct=(token,productId,name,description)=>{

    return dispatch=>{

        axios.put('http://localhost:8080/seller/update-product/'+productId,
        {
           name:name,
           description:description
        },
        {
            headers: {'Authorization': 'Bearer '+token }
        })
        .then(response=>{
            dispatch(actions.setMessage('Product updated successfully!!!'));
            dispatch(actions.setErrorNull());
        }).catch(error=>{
            dispatch(actions.setSuccessFail());
            dispatch(actions.setError(error.response));
            
        })
    }

}
export const updateProductVariation=(token,id,price,quantity,colour,size,image)=>{

    return dispatch=>{

        axios.put('http://localhost:8080/seller/update-product-variation/'+id,
        {
          price:price,
          quantity:quantity,
          primaryImage:image,
          metadata:{
              Colour:colour,
              Size:size
          }
        },
        {
            headers: {'Authorization': 'Bearer '+token }
        })
        .then(response=>{
            dispatch(actions.setMessage('Product variation updated successfully!!!'));
            dispatch(actions.setErrorNull());
        }).catch(error=>{
            dispatch(actions.setSuccessFail());
            dispatch(actions.setError(error.response));
            
        })
    }

}

export const deleteProduct=(token,id)=>{
    return dispatch=>{
        axios.delete('http://localhost:8080/seller/delete-product/'+id,
       {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            dispatch(viewSellerProduct(token));
        }).catch(error=>{
            dispatch(actions.setError(error.response));
        })

    }
}