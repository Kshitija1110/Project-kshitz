import * as actionTypes from '../actions/actionTypes';

const initialState={
    addressId:null,
    cartDetails:[],
    orders:[]

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

      case actionTypes.SET_CART_DETAILS:
            return{

                ...state,
                cartDetails:action.cartDetails


            };
            case actionTypes.SET_ORDERS:
                return{
    
                    ...state,
                    orders:action.orders
    
    
                };

        

        default:return state;


    }

};

export default reducer;
