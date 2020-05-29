import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setProductData=(data)=>{
    return{
    type:actionTypes.SET_PRODUCTDATA,
    data:data

    };

};
export const setProductVariation=(data)=>{
    return{
    type:actionTypes.SET_PRODUCTVARIATION,
    data:data

    };

};

export const setProductId=(productId,variationId)=>{
    return{
        type:actionTypes.SET_PRODUCTID,
        productId:productId,
        variationId:variationId
    };
};



export const viewProductVariation=(id)=>{

    return dispatch=>{
        axios.get('http://localhost:8080/view-all-product-variation/'+id).then(response=>{
            console.log(response.data);
            dispatch(setProductVariation(response.data));
        }).catch(error=>{
            console.log(error.response);
        })
    }

}

export const viewProducts=(count)=>{
    return dispatch=>{
        axios.get('http://localhost:8080/view-all-products/'+count).then(response=>{
            console.log(response.data);
            dispatch(setProductData(response.data));
        }).catch(error=>{
            console.log(error.response);
        })
    }
}