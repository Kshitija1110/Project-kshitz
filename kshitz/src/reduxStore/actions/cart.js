import * as actionTypes from './actionTypes';
import axios from 'axios';

export const viewCart=(token)=>{
    return dispatch=>{
        
        axios.get('http://localhost:8080/customer/view-cart',
        {
            headers: {'Authorization': 'Bearer '+token }
        })
        .then(response=>{
            console.log(response.data);
            dispatch(setCart(response.data));
        })
        .catch(error=>{
            console.log(error.response.data);
        })
    };
};

export const setCart=(data)=>{
    return{
        type:actionTypes.SET_CART,
        data:data
    };
};

export const addToCart=(variationId,token)=>{

    return dispatch=>{

        



        axios.post('http://localhost:8080/customer/add-to-cart/'+variationId,
        {
            quantity:1
        }
        ,{
            headers: {'Authorization': 'Bearer '+token }
        } )
        .then(response=>{
            console.log(response.data);

        }).catch(error=>{
            console.log(error.response.data)

        })

    };

};