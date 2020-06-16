import * as actionTypes from '../actions/actionTypes';

const initialState={
   productData:[],
   productVariation:[],
   metadataCategory:[]

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

        case actionTypes.SET_SELLER_PRODUCT:
            return{

                ...state,
                productData:action.data


            };

        case actionTypes.SET_SELLER_PRODUCT_VARIATION:
            return{
                ...state,
                productVariation:action.data
            };
        case actionTypes.SET_METADATA_CATEGORY:
            return{
                ...state,
                metadataCategory:action.data
            }

        

        default:return state;


    }

};

export default reducer;
