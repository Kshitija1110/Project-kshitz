import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setCartDetails=(cartDetails)=>{

    return{
        type:actionTypes.SET_CART_DETAILS,
        cartDetails:cartDetails
    }

}

export const orderCart=(token,addressId)=>{
    const body = null;

        return dispatch=>{
            axios.post('http://localhost:8080/customer/buy-cart/'+addressId,
            body,
            {
                headers: {'Authorization': 'Bearer '+token }
            }).then(response=>{
                
            }).catch(error=>{
               
            })
    
        }
    

}
export const orderProduct=(token,addressId,variationId,quantity)=>{

        return dispatch=>{
            axios.post('http://localhost:8080/customer/buy-product/'+addressId,
            {
                productVariationId:variationId,
                quantity:quantity
            },
            {
                headers: {'Authorization': 'Bearer '+token }
            }).then(response=>{
                
            }).catch(error=>{
               
            })
    
        }
    

}
export const setOrders=(orders)=>{
    return{
        type:actionTypes.SET_ORDERS,
        orders:orders
    };
};
export const viewOrders=(token)=>{

    return dispatch=>{
        axios.get('http://localhost:8080/customer/view-orders',
        {
            headers: {'Authorization': 'Bearer '+token }
        }).then(response=>{
            
            dispatch(setOrders(response.data));

        }).catch(error=>{
            
        })

    }


}
export const viewCartDetails=(token)=>{

        return dispatch=>{
            axios.get('http://localhost:8080/customer/view-cart-details',
            {
                headers: {'Authorization': 'Bearer '+token }
            }).then(response=>{
                
                dispatch(setCartDetails(response.data));
            }).catch(error=>{
                
            })
    
        }
    

}