import * as actionTypes from '../actions/actionTypes';

const initialState={
    message: '',
    isSuccess:false

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

        case actionTypes.SET_MESSAGE:
            return{
                ...state,
                message:action.data,
                isSuccess:true
            }
        case actionTypes.SET_SUCCESS_FAIL:
            return{
                ...state,
                message:null,
                isSuccess:false
            }

        

        default:return state;


    }

};

export default reducer;
