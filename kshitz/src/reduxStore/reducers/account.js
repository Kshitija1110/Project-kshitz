import * as actionTypes from '../actions/actionTypes';

const initialState={
    userData:[],
    customerAddress:[],
    editAddressData:[],
    sellerAddress:[]

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

        case actionTypes.SET_CUSTOMER_ACCOUNT:
            return{

                ...state,
                userData:action.data


            };
        case actionTypes.SET_CUSTOMER_ADDRESS:
            return{
                ...state,
                customerAddress:action.address

            };
        case actionTypes.SET_SELLER_ADDRESS:
                return{
                    ...state,
                    sellerAddress:action.address
    
                };
        case actionTypes.SET_EDIT_ADDRESS_DATA:
            return{
                ...state,
                editAddressData:action.address
            }

        

        default:return state;


    }

};

export default reducer;
