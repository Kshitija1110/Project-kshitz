import * as actionTypes from '../actions/actionTypes';

const initialState={
    message:null,
    error:null,
    isRegistered:false

}

const reducer =(state=initialState,action)=>{

    switch(action.type){
        case actionTypes.REGISTER_SUCCESS:
            return{
                ...state,
                message:action.message,
                error:null,
                isRegistered:true

            };
            case actionTypes.REGISTER_FAIL:
                return{
                    ...state,
                    error:action.error,
                    isRegistered:false
                };

            default:return state;
    }
}

export default reducer;