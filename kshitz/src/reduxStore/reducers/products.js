import * as actionTypes from '../actions/actionTypes';

const initialState={
    productData:[],
    productVariation:[],
    productId:0,
    variationId:0

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

        case actionTypes.SET_PRODUCTDATA:
            return{
                ...state,
                productData:action.data
            };
        case actionTypes.SET_PRODUCTVARIATION:
            return{
                ...state,
                productVariation:action.data
            };
        case actionTypes.SET_PRODUCTID:
            return{
                ...state,
                productId:action.productId,
                variationId:action.variationId

            };
            default:return state;
    }
};

export default reducer;