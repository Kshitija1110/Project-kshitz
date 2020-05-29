import * as actionTypes from '../actions/actionTypes';

const initialState={
    cartData:[],
    redirectPath:'/login'

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

        case actionTypes.SET_CART:
            return{

                ...state,
                cartData:action.data


            };

        

        default:return state;


    }

};

export default reducer;
