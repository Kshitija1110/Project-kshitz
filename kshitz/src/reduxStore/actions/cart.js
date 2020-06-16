import * as actionTypes from './actionTypes';
import axios from 'axios';

export const viewCart=(token)=>{
    return dispatch=>{
        
        axios.get('http://localhost:8080/customer/view-cart',
        {
            headers: {'Authorization': 'Bearer '+token }
        })
        .then(response=>{
           
            dispatch(setCart(response.data));
        })
        .catch(error=>{
            
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
           

        }).catch(error=>{
          

        })

    };

};