import * as actionTypes from '../actions/actionTypes';

const initialState={

    sellerData:[],
    customerData:[],
    productData:[],
    categoryData:[],
    metadataField:[],
    categoryFieldValue:[]
   

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

        case actionTypes.ADMIN_VIEW_SELLER:
            return{
                ...state,
                sellerData:action.data
            };
        case actionTypes.ADMIN_VIEW_CUSTOMER:
            return{
                ...state,
                customerData:action.data
            };
        case actionTypes.ADMIN_VIEW_PRODUCT:
            return{
                ...state,
                productData:action.data

            }

        case actionTypes.SET_ADMIN_CATEGORY_DATA:
            return{
                ...state,
                categoryData:action.data
            }

        case actionTypes.SET_ADMIN_METADATA:
            return{
                ...state,
                metadataField:action.data
            }
        

        

        default:return state;


    }

};

export default reducer;
