import * as actionTypes from '../actions/actionTypes';

const initialState={
    customerData:[],
    customerAddress:[]

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

        case actionTypes.SET_CUSTOMER_ACCOUNT:
            return{

                ...state,
                customerData:action.data


            };
        case actionTypes.SET_CUSTOMER_ADDRESS:
            return{
                ...state,
                customerAddress:action.address

            }

        

        default:return state;


    }

};

export default reducer;
