import * as actionTypes from '../actions/actionTypes';

const initialState={
    error: null,
    isError:false

}

const reducer =(state=initialState,action)=>{

    switch(action.type){

        case actionTypes.SET_ERROR:
            return{
                ...state,
                error:action.data,
                isError:true
            }
        case actionTypes.SET_ERROR_NULL:
            return{
                ...state,
                error:null,
                isError:false
            }

        

        default:return state;


    }

};

export default reducer;
